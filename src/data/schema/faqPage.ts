/** Preguntas y respuestas del FAQ global (home) para JSON-LD FAQPage. */
export const homeFaqForSchema = [
  {
    question: "¿Me despidieron sin liquidación, qué hago?",
    answer:
      "No firmes ningún documento antes de hablar con un abogado. Tienes derecho a reclamar 3 meses de salario (indemnización constitucional), 20 días por año trabajado, aguinaldo y vacaciones proporcionales. Solo tienes 2 meses para demandar.",
  },
  {
    question: "¿Puedo demandar si ya firmé mi renuncia?",
    answer:
      "Sí, en muchos casos puedes. Si firmaste bajo presión, amenazas o sin información clara, la firma no elimina tu derecho a demandar. La Suprema Corte ha establecido que firmar bajo coacción no es válido.",
  },
  {
    question: "¿Cuánto dinero me corresponde por despido injustificado?",
    answer:
      "Depende de tu salario y antigüedad. La fórmula incluye 3 meses de salario más 20 días por año trabajado más prestaciones proporcionales. Usa la calculadora gratuita para un estimado.",
  },
  {
    question: "¿Cuánto cobra un abogado laboralista en CDMX?",
    answer:
      "Con nosotros: $0 pesos por adelantado. Consulta inicial 100% gratis. Honorarios solo si ganamos. Si no recuperas dinero, no pagas nada.",
  },
  {
    question: "¿Qué documentos necesito para demandar?",
    answer:
      "Solo tu identificación oficial. Si no tienes contrato, recibos de nómina ni carta de despido, no hay problema — nosotros los solicitamos a la autoridad. No tener papeles no impide que demandes.",
  },
] as const;

export function faqPageJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqForSchema.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
