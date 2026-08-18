import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const identifier = (body.id_number || body.email || body.username || "").trim();
    const password = (body.password || "").trim();

    if (!identifier || !password) {
      return NextResponse.json(
        { error: "National ID / Passport number (or Email) and password are required." },
        { status: 400 }
      );
    }

    // Look up member by ID number or email
    let query = supabaseServer
      .from('members')
      .select('id, name, id_number, dob, sex, ethnicity, religion, disability_status, phone, email, physical_address, county, constituency, ward, category, password, created_at');

    let member: any = null;
    let error: any = null;

    // Try matching id_number first
    const resId = await query.eq('id_number', identifier).maybeSingle();
    if (resId.data) {
      member = resId.data;
    } else {
      // Try matching email
      const resEmail = await supabaseServer
        .from('members')
        .select('id, name, id_number, dob, sex, ethnicity, religion, disability_status, phone, email, physical_address, county, constituency, ward, category, password, created_at')
        .eq('email', identifier)
        .maybeSingle();
      if (resEmail.data) {
        member = resEmail.data;
      }
      error = resEmail.error;
    }

    if (error && error.code !== 'PGRST116') {
      console.error("Database error during login:", error);
      return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }

    if (!member) {
      return NextResponse.json(
        { error: "No member account found with those credentials. Please check your National ID / Email or register." },
        { status: 401 }
      );
    }

    if (member.password !== password) {
      return NextResponse.json(
        { error: "Incorrect password. Please verify and try again." },
        { status: 401 }
      );
    }

    // Create session cookie
    const userId   = member.id.toString();
    const response = NextResponse.json({
      success:  true,
      message:  "Logged in successfully.",
      userId,
      member: {
        id:                member.id,
        name:              member.name,
        id_number:         member.id_number,
        dob:               member.dob,
        sex:               member.sex,
        ethnicity:         member.ethnicity,
        religion:          member.religion,
        disability_status: member.disability_status,
        phone:             member.phone,
        email:             member.email,
        physical_address:  member.physical_address,
        county:            member.county,
        constituency:      member.constituency,
        ward:              member.ward,
        category:          member.category,
        created_at:        member.created_at,
      },
    });

    response.cookies.set("sdp_member_session", userId, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === "production",
      sameSite: "lax",
      path:     "/",
      maxAge:   60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (e) {
    console.error("Member login error:", e);
    return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
  }
}
