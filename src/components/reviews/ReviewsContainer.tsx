import { useRef } from "react";
import { getInitialLettersName } from "@/utils";
import { Review } from "./Review";
import { ReviewExperence } from "./ReviewExperence";
import "./Reviews.css";

const REVIEWS = [
  {
    id: 1,
    name: "Raúl P. Ramírez",
    location: "Iztapalapa, CDMX",
    case: "Despido Injustificado",
    rating: 5,
    date: "2024-09",
    recovered: "$127,000",
    yearsWorked: 3,
    content:
      "Después de que me despidieran sin justificación alguna, pensé que perdería todo lo que había trabajado durante 3 años. El Lic. González Mora me explicó claramente mis derechos bajo la Ley Federal del Trabajo y me guió en todo el proceso. Gracias a su profesionalismo y dedicación, recuperé más de $127,000 que me correspondían por ley. Su experiencia en derecho laboral marca la diferencia.",
    avatar: "/images/avatar-male-1.jpg",
    verified: true,
    platform: "Google",
  },
  {
    id: 2,
    name: "Carmen G. López",
    location: "Benito Juárez, CDMX",
    case: "Acoso Laboral y Discriminación",
    rating: 5,
    date: "2024-08",
    recovered: "$95,000",
    yearsWorked: 2,
    content:
      "Cuando empecé a sufrir discriminación y acoso en mi trabajo, sentí que no había salida y que nadie me apoyaría. El Lic. González me escuchó con empatía y me explicó que tenía derechos protegidos por la ley. Gracias a su representación legal, pude salir de esa situación intolerable y recibir una compensación justa por el daño sufrido. Un abogado que realmente defiende a los trabajadores.",
    avatar: "/images/avatar-female-1.jpg",
    verified: true,
    platform: "Google",
  },
  {
    id: 3,
    name: "Sergio D. Martínez",
    location: "Gustavo A. Madero, CDMX",
    case: "Horas Extras y Vacaciones No Pagadas",
    rating: 5,
    date: "2024-10",
    recovered: "$68,500",
    yearsWorked: 4,
    content:
      "Mi empleador se negaba a pagarme las horas extras trabajadas y las vacaciones que me correspondían. Ya había perdido la esperanza de recuperar lo que era mío. El Lic. González manejó mi caso con eficiencia y lo resolvimos vía conciliación en tiempo récord. Recuperé más de 2 años de prestaciones que me debían. Definitivamente recomendaría sus servicios a cualquier trabajador.",
    avatar: "/images/avatar-male-2.jpg",
    verified: true,
    platform: "Google",
  },
  {
    id: 4,
    name: "Mariela S. Hernández",
    location: "Coyoacán, CDMX",
    case: "Accidente Laboral con Negligencia Patronal",
    rating: 5,
    date: "2024-07",
    recovered: "$215,000",
    yearsWorked: 6,
    content:
      "Cuando sufrí mi accidente laboral, enfrenté una situación muy difícil sin saber qué hacer con el IMSS ni cómo reclamar mis derechos. El Lic. González me explicó todo paso a paso con una claridad notable. Además de la atención del IMSS, recuperé indemnización adicional por la negligencia de la empresa. Su compromiso con sus clientes es genuino y siempre estuvo disponible para responder mis dudas.",
    avatar: "/images/avatar-female-2.jpg",
    verified: true,
    platform: "Google",
  },
  {
    id: 5,
    name: "Fernando V. Castillo",
    location: "Miguel Hidalgo, CDMX",
    case: "Contrato Irregular y Salario Menor al Mínimo",
    rating: 5,
    date: "2024-09",
    recovered: "$82,000",
    yearsWorked: 3,
    content:
      "Descubrí que mi patrón me pagaba menos de lo que marca la ley y sin las prestaciones completas. Pensé que no tenía cómo comprobarlo y que siempre perdería. El Lic. González demostró un conocimiento profundo de la Ley Federal del Trabajo y defendió mis derechos como trabajador. El resultado superó mis expectativas. Excelente profesional y mejor persona.",
    avatar: "/images/avatar-male-3.jpg",
    verified: true,
    platform: "Google",
  },
  {
    id: 6,
    name: "Patricia R. Mendoza",
    location: "Tlalpan, CDMX",
    case: "Despido por Embarazo (Discriminación)",
    rating: 5,
    date: "2024-06",
    recovered: "$185,000",
    yearsWorked: 4,
    content:
      "Me despidieron injustamente cuando mi patrón se enteró de mi embarazo. Creí que por haber firmado algunos documentos bajo presión había perdido todo derecho. El Lic. González me demostró que estaba equivocada y que la ley protege a las mujeres en esta situación. Gracias a su conocimiento y determinación, ganamos el caso y recuperé mi liquidación más indemnización por discriminación. Hoy puedo criar a mi bebé con tranquilidad.",
    avatar: "/images/avatar-female-3.jpg",
    verified: true,
    platform: "Google",
    featured: true,
  },
];

const EXPERENCE_INITIAL = REVIEWS.map(({ name }) =>
  getInitialLettersName(name)
);

export function ReviewsContainer() {
  const carruselRef = useRef<HTMLDivElement>(null);

  const nextCarrusel = () => {
    carruselRef.current?.scrollBy({
      left: 21,
      behavior: "smooth",
    });
  };

  const prevCarrusel = () => {
    carruselRef.current?.scrollBy({
      left: -21,
      behavior: "smooth",
    });
  };

  return (
    <div className="gm_review-container">
      <div className="gm_review-list reveal" ref={carruselRef}>
        {REVIEWS.map(({ id, content, name }) => (
          <Review content={content} name={name} key={id} />
        ))}
      </div>
      <div className="gm_reviews-buttons reveal">
        <button
          className="gm_reviews-button"
          onClick={prevCarrusel}
          name="Botón para navegar hacia atras"
        >
          <Arrow />
        </button>
        <button
          className="gm_reviews-button"
          onClick={nextCarrusel}
          name="Botón para navegar hacia delante"
        >
          <Arrow />
        </button>
      </div>
      <ReviewExperence experenceInitial={EXPERENCE_INITIAL} />
    </div>
  );
}

function Arrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l14 0" />
      <path d="M5 12l6 6" />
      <path d="M5 12l6 -6" />
    </svg>
  );
}
