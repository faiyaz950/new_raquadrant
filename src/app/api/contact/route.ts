import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-form-schema";

/** Resend API key (server-only). Rotate in Resend if this file is ever exposed. */
const RESEND_API_KEY = "re_XnibdfEp_NBPNioX7cDsgL6XgKk6a2tqQ";

const RESEND_API_URL = "https://api.resend.com/emails";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }

    const { name, email, phone, subject, message } = parsed.data;

    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #f97316 0%, #f59e0b 100%); padding: 32px 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold;">New Contact Form Submission</h1>
            <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0; font-size: 14px;">RaQuadrant Energy — Website Inquiry</p>
          </div>

          <!-- Body -->
          <div style="padding: 32px 24px; background: #f9fafb; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; width: 140px; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 15px; font-weight: 500;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                  <a href="mailto:${email}" style="color: #f97316; font-size: 15px; font-weight: 500; text-decoration: none;">${email}</a>
                </td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Phone</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                  <a href="tel:${phone}" style="color: #f97316; font-size: 15px; font-weight: 500; text-decoration: none;">${phone}</a>
                </td>
              </tr>
              ` : ""}
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Subject</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 15px; font-weight: 500;">${subject}</td>
              </tr>
              <tr>
                <td style="padding: 16px 0; vertical-align: top; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Message</td>
                <td style="padding: 16px 0; color: #374151; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>
              </tr>
            </table>

            <!-- Reply CTA -->
            <div style="margin-top: 28px; padding: 20px; background: #fff7ed; border: 1px solid #fed7aa; border-radius: 8px;">
              <p style="margin: 0 0 12px; color: #92400e; font-size: 13px; font-weight: 600;">Reply directly to this enquiry:</p>
              <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}"
                 style="display: inline-block; background: linear-gradient(135deg, #f97316, #f59e0b); color: #ffffff; text-decoration: none; padding: 10px 24px; border-radius: 6px; font-size: 14px; font-weight: 600;">
                Reply to ${name}
              </a>
            </div>

            <p style="margin-top: 28px; font-size: 12px; color: #9ca3af; text-align: center;">
              This message was submitted via the contact form at raquadrantenergy.com
            </p>
          </div>
        </div>
      `;

    const res = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY.trim()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "RaQuadrant Contact Form <onboarding@resend.dev>",
        to: ["faiyazmujtaba587@gmail.com"],
        reply_to: email,
        subject: `New Contact Inquiry: ${subject}`,
        html,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend API error:", res.status, errText);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
