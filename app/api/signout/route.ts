import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  try {
    const res = NextResponse.json(
      { success: true, message: "Signed out successfully" },
      { status: 200 }
    );
    res.cookies.set("token", "", { httpOnly: true, path: "/" });
    console.log(res.cookies);
    return res;
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { success: false, message: "Sign out unsuccessful" },
      { status: 500 }
    );
  }
}
