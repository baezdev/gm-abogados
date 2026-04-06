import { absoluteUrl, site, whatsappUrl } from "@/config/site";

export const gmBrand = {
  name: site.name,
  url: site.origin,
};

export const getInitialLettersName = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");
};

export const gmLinks = {
  whatsapp: whatsappUrl(),
  instagram: site.instagram,
  facebook: site.facebook,
  phone: site.phoneDigits,
  phoneDisplay: site.phoneDisplay,
  email: site.email,
};

export const generateContactEmail = (
  name: string,
  email: string,
  message: string,
  phone: string,
) => {
  const defaultMessage =
    "Necesito asesoría legal laboral. Por favor, contácteme.";

  return `<!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Nuevo mensaje</title>
      </head>
      <body
        style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 30px;"
      >
        <main
          style="background-color: #ffffff; max-width: 450px; margin: 0 auto; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05);"
        >
          <div>
            <img
              src="${absoluteUrl(site.logoPath)}"
              alt="Logo GM Abogados"
              style="max-width: 150px; margin-bottom: 20px;"
            />
          </div>

          <h2 style="color: #333; font-size: 24px;">
            Hola Lic. Tiene un nuevo mensaje desde su formulario de contacto
          </h2>

          <p
            style="margin-top: 1rem; font-size: 18px; color: #444; font-weight: bold; text-transform: capitalize;"
          >
            De: ${name}
          </p>
          <p
            style="margin-top: .5rem; font-size: 18px; color: #444; font-weight: bold;"
          >
            Correo: <span style="text-transform: lowercase;">${email}</span>
 
          </p>
          <p
            style="margin-top: .5rem; font-size: 18px; color: #444; font-weight: bold; text-transform: capitalize;"
          >
            Teléfono: ${phone}
          </p>

          <p
            style="margin-top: 1rem; font-size: 18px; color: #444; background-color: #efefef; padding: 15px; border-radius: 8px; white-space: pre-wrap; "
          >
            ${message || defaultMessage}
          </p>

          <p style="margin-top: 1.2rem; font-size: 16px; color: #000; font-weight: semibold;">Responder por:</p>
          <div
            style="display: flex; gap: 15px; margin-top: 2rem;"
          >
            <a
              href="mailto:${email}"
              style="padding: 12px 24px; border-radius: 9999px; background: linear-gradient(to right, #2b4d6e, #35597c); box-shadow: 0 0.4em 1em rgba(0,0,0,0.1); color: #ffffff; font-size: 1.125rem; font-weight: 500; text-align: center; text-decoration: none; display: inline-block; margin-right: 10px;"
            >
              Correo
            </a>

            <a
              href="https://wa.me/52${phone}?text=Hola%20${name},%20gracias%20por%20contactar%20a%20GM%20Abogados%20Laboralistas."
              style="padding: 12px 24px; border-radius: 9999px; background: linear-gradient(to right, #2b4d6e, #35597c); box-shadow: 0 0.4em 1em rgba(0,0,0,0.1); color: #ffffff; font-size: 1.125rem; font-weight: 500; text-align: center; text-decoration: none; display: inline-block;"
            >
              WhatsApp
            </a>
          </div>
        </main>
      </body>
    </html>`;
};
