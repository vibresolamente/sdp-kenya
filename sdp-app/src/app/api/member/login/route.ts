import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const { id_number, password } = await request.json();

    if (!id_number || !password) {
      return NextResponse.json(
        { error: "National ID / Passport number and password are required." },
        { status: 400 }
      );
    }

    // Look up member by ID number
    const { data: member, error } = await supabaseServer
      .from('members')
      .select('id, name, id_number, email, county, constituency, ward, category, password')
      .eq('id_number', id_number.trim())
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      console.error("Database error during login:", error);
      return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }

    if (!member) {
      return NextResponse.json(
        { error: "No account found with that National ID / Passport number." },
        { status: 401 }
      );
    }

    if (member.password !== password) {
      return NextResponse.json(
        { error: "Incorrect password. Please try again." },
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
        name:         member.name,
        id_number:    member.id_number,
        email:        member.email,
        county:       member.county,
        constituency: member.constituency,
        ward:         member.ward,
        category:     member.category,
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
