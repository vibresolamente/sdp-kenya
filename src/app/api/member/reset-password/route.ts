import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const { id_number, email, new_password } = await request.json();

    if (!id_number || !email || !new_password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Verify member exists with matching ID number AND Email
    const { data: member, error } = await supabaseServer
      .from('members')
      .select('id')
      .eq('id_number', id_number)
      .eq('email', email)
      .maybeSingle();

    if (error || !member) {
      if (error) {
        console.error("Database query error during password reset lookup:", error);
      }
      return NextResponse.json({ error: "Verification details do not match our records." }, { status: 401 });
    }

    // Update password in members table
    const { error: updateError } = await supabaseServer
      .from('members')
      .update({ password: new_password })
      .eq('id', member.id);

    if (updateError) {
      console.error("Database update error during password reset:", updateError);
      return NextResponse.json({ error: "Failed to update password." }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Password reset successfully. You can now log in." });
  } catch (e) {
    console.error("Password reset error:", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
