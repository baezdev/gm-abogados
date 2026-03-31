import type { APIRoute } from "astro";
import { validateContactForm, sendContactEmail, type ContactFormData } from "@lib/emailService";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body: ContactFormData = await request.json();

    const validation = validateContactForm(body);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ message: "Datos inválidos", errors: validation.errors }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const result = await sendContactEmail(body);

    if (!result.success) {
      return new Response(
        JSON.stringify({ message: result.error }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ message: "Correo enviado exitosamente" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("API Error:", err);
    return new Response(
      JSON.stringify({ message: "Error al procesar la solicitud" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
