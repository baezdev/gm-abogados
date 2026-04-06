import type { APIRoute } from "astro";
import { RESEND_API_KEY } from "astro:env/server";
import { EMAIL_FROM, EMAIL_TO } from "astro:env/client";

import {
  generateEmailHtml,
  validateContactForm,
  type ContactFormData,
  type SendEmailResult,
} from "@lib/emailService";
import { Resend } from "resend";

export async function sendContactEmail(
  data: ContactFormData,
): Promise<SendEmailResult> {
  const FROM_EMAIL = EMAIL_FROM;
  const TO_EMAIL = EMAIL_TO;
  const resend = new Resend(RESEND_API_KEY);

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: `GM Abogados <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      subject: `Nuevo mensaje de ${data.name} - ${data.problem}`,
      html: generateEmailHtml(data),
    });

    console.log(error);

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: "Error al enviar el correo" };
    }

    return { success: true };
  } catch (err) {
    console.error("Email service error:", err);
    return { success: false, error: "Error al procesar la solicitud" };
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body: ContactFormData = await request.json();

    const validation = validateContactForm(body);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({
          message: "Datos inválidos",
          errors: validation.errors,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const result = await sendContactEmail(body);

    if (!result.success) {
      return new Response(JSON.stringify({ message: result.error }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ message: "Correo enviado exitosamente" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    console.error("API Error:", err);
    return new Response(
      JSON.stringify({ message: "Error al procesar la solicitud" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
