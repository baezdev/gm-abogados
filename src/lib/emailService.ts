import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

const FROM_EMAIL = import.meta.env.EMAIL_FROM || "gm@correo.gm-abogados.com.mx";
const TO_EMAIL = import.meta.env.EMAIL_TO || "baezdev@gmail.com";

export interface ContactFormData {
  name: string;
  phone: string;
  problem: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export function validateContactForm(
  data: Partial<ContactFormData>,
): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 3) {
    errors.name = "El nombre es requerido (mínimo 3 caracteres)";
  }

  if (!data.phone) {
    errors.phone = "El teléfono es requerido";
  } else {
    const digits = data.phone.replace(/\D/g, "");
    if (digits.length < 10) {
      errors.phone = "El teléfono debe tener al menos 10 dígitos";
    }
  }

  if (!data.problem) {
    errors.problem = "Selecciona el tipo de problema";
  }

  if (data.message && data.message.length > 1000) {
    errors.message = "El mensaje no puede exceder 1000 caracteres";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

export function sanitizeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export function generateEmailHtml(data: ContactFormData): string {
  const problemLabels: Record<string, string> = {
    despido: "Despido injustificado",
    acoso: "Acoso o discriminación laboral",
    horas: "Horas extras no pagadas",
    accidente: "Accidente o enfermedad laboral",
    contrato: "Contrato irregular o salario incorrecto",
    otro: "Otro",
  };

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #1a2332; padding: 30px; border-radius: 8px;">
        <h2 style="color: #c9a84c; margin: 0 0 20px;">Nuevo mensaje de contacto</h2>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #2a3a52; color: #8897b3; font-size: 14px;">Nombre</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #2a3a52; color: #ffffff; font-size: 14px; font-weight: bold;">${sanitizeHtml(data.name)}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #2a3a52; color: #8897b3; font-size: 14px;">Teléfono</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #2a3a52; color: #ffffff; font-size: 14px;">
              <a href="tel:${data.phone}" style="color: #c9a84c; text-decoration: none;">${sanitizeHtml(data.phone)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #2a3a52; color: #8897b3; font-size: 14px;">Tipo de problema</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #2a3a52; color: #ffffff; font-size: 14px;">${problemLabels[data.problem] || data.problem}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; color: #8897b3; font-size: 14px; vertical-align: top;">Mensaje</td>
            <td style="padding: 12px 0; color: #ffffff; font-size: 14px; line-height: 1.6;">${data.message ? sanitizeHtml(data.message).replace(/\n/g, "<br>") : "Sin mensaje"}</td>
          </tr>
        </table>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #2a3a52;">
          <a href="https://wa.me/${data.phone}" 
             style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; border-radius: 4px; text-decoration: none; font-weight: bold;">
            Responder por WhatsApp
          </a>
        </div>
      </div>
    </div>
  `;
}

export interface SendEmailResult {
  success: boolean;
  error?: string;
}

export async function sendContactEmail(
  data: ContactFormData,
): Promise<SendEmailResult> {
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: `GM Abogados <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      subject: `Nuevo mensaje de ${data.name} - ${data.problem}`,
      html: generateEmailHtml(data),
    });

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
