import { FormInput } from "./FormInput";
import { SendButton } from "./SendButton";
import { useContactForm } from "@/hooks/useContactForm";

import "./ContactForm.css";

export function ContactForm() {
  const { handleSubmit } = useContactForm();

  return (
    <form className="gm_contact-form reveal" onSubmit={handleSubmit}>
      <FormInput
        name="name"
        label="Nombre Completo"
        placeholder="¿Cuál es tu nombre?"
        type="text"
      />
      <FormInput
        name="email"
        label="Correo Electrónico"
        placeholder="tucorreo@ejemplo.com"
        type="email"
      />
      <FormInput
        name="phone"
        label="Teléfono o WhatsApp"
        placeholder="55 1234 5678"
        type="tel"
      />
      <FormInput name="message" label="Cuéntanos Tu Caso" placeholder="Describe brevemente tu situación laboral y cuándo fuiste despedido" type="textarea" />

      <div className="gm_contact-button">
        <SendButton />
      </div>
    </form>
  );
}
