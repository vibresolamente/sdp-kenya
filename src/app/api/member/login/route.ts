import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const { data: member, error } = await supabaseServer
      .from('members')
      .select('id, id_number, email, password')
      .eq('email', email)
      .maybeSingle();

    if (error || !member) {
      if (error && error.code !== 'PGRST116') {
        console.error("Database query error during login:", error);
      }
      return NextResponse.json({ error: "Invalid ID number or password" }, { status: 401 });
    }

    if (member.password !== password) {
      return NextResponse.json({ error: "Invalid ID number or password" }, { status: 401 });
    }

    const userId = member.id.toString();
    const response = NextResponse.json({ success: true, message: "Logged in successfully", userId });
    
    response.cookies.set("sdp_member_session", userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (e) {
    console.error("Member login error:", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

