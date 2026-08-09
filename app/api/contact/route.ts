import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const escapeHtml = (value: string) =>
  value.replace(/[&<>"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[character] ?? character);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const empresa = typeof body.empresa === "string" ? body.empresa.trim().slice(0, 120) : "";
    const email = typeof body.email === "string" ? body.email.trim().slice(0, 254) : "";
    const message = typeof body.message === "string" ? body.message.trim().slice(0, 5000) : "";

    if (!empresa || !emailPattern.test(email) || !message) {
      return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
    }
    if (!process.env.RESEND_API_KEY || !process.env.EMAIL_TO) {
      return NextResponse.json({ error: "Contact service is not configured." }, { status: 503 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: "BootsDev-X <onboarding@resend.dev>",
      to: [process.env.EMAIL_TO],
      replyTo: email,
      subject: `New portfolio message from ${empresa}`,
      html: `<div style="font-family:Arial,sans-serif;padding:24px;max-width:600px;background:#f8fafc;border:1px solid #e2e8f0"><h2 style="color:#0f172a">New portfolio message</h2><p><strong>From:</strong> ${escapeHtml(empresa)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p style="white-space:pre-wrap"><strong>Message:</strong><br>${escapeHtml(message)}</p></div>`,
    });

    if (error) return NextResponse.json({ error: "Unable to send message." }, { status: 502 });
    return NextResponse.json({ message: "Message sent successfully.", data });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
