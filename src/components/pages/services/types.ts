export interface ServiceDerecho {
  art: string;
  concepto: string;
  desc: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  title: string;
  description: string;
  heroLabel: string;
  heroHeading: string;
  heroBadge?: { num: string; text: string };
  intro: string;
  derechos: ServiceDerecho[];
  urgencia: string;
  faqs: ServiceFaq[];
  relacionados: string[];
}

export const slugToTitle: Record<string, string> = {
  "despido-injustificado": "Despido Injustificado",
  "acoso-laboral": "Acoso Laboral",
  "horas-extras": "Horas Extras",
  "falta-contrato": "Sin Contrato o Salario Incorrecto",
  "accidente-laboral": "Accidente Laboral",
};
