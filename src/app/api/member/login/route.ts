import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    // Assuming the user ID is available in data.user?.id
    const userId = data.user?.id;
    const response = NextResponse.json({ success: true, message: "Logged in successfully", userId });
    // Set secure HTTP‑only cookie for session (you may replace with JWT in production)
    if (userId) {
      response.cookies.set("sdp_member_session", userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
      });
    }
    return response;
  } catch (e) {
    console.error("Supabase login error:", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

