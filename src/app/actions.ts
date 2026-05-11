"use server";

import type { FormState } from "@/lib/contact-form-schema";
import { contactSchema } from "@/lib/contact-form-schema";

export async function handleContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const data = Object.fromEntries(formData);
  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(data)) {
      fields[key] = data[key].toString();
    }
    return {
      message: "Invalid form data. Please check the fields and try again.",
      fields,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  // In a real application, you would send an email here.
  // For example, using a service like Nodemailer or Resend.
  console.log("New contact form submission:");
  console.log("Name:", parsed.data.name);
  console.log("Email:", parsed.data.email);
  console.log("Phone:", parsed.data.phone);
  console.log("Subject:", parsed.data.subject);
  console.log("Message:", parsed.data.message);
  console.log(`(This would be sent to info@raquadrantenergy.com)`);

  return { message: "Thank you for your inquiry! We will get back to you shortly." };
}
