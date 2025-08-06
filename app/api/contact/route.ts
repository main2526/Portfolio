import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { empresa, email, message } = await req.json();

    if (!empresa || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "BootsDev-X <onboarding@resend.dev>",
      to: [process.env.EMAIL_TO ?? ""],
      subject: `New Message from ${empresa}`,
      html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
        <h2 style="color: #111827; font-size: 24px; margin-bottom: 20px;">📩 New message from your portfolio</h2>

        <table style="width: 100%; font-size: 16px; color: #374151;">
        <tr>
          <td style="font-weight: bold; padding: 8px 0;">Business:</td>
          <td>${empresa}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 8px 0;">Email:</td>
          <td>${email}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 8px 0; vertical-align: top;">Message:</td>
          <td style="white-space: pre-line;">${message}</td>
        </tr>
        </table>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #d1d5db;" />

        <p style="font-size: 14px; color: #6b7280;">This message was sent from the contact form on your website.</p>
      </div>
      `,
    });

    if (error) {
      console.error("❌ Error sending:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({
      message: "✅ Message sent successfully",
      data,
    });
  } catch (err: any) {
    console.error("❌ Unexpected error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
