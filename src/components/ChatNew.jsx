import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import finn from "../assets/finn.png";
import brianna from "../assets/brianna.png";
import mark from "../assets/mark.png";
import maya from "../assets/maya.png";
import riley from "../assets/riley.png";

const ChatNew = ({ handleSetCurrentMessage, handleBotId, idRecomendation }) => {
  const navigate = useNavigate();
  const personality = [
    {
      name: "Finn",
      role: "Asesor general de startups",
      id: 1,
      img: finn,
      theme: "night",
      description:
        "Experto en estrategias de lanzamiento de startups, desarrollo de productos y crecimiento empresarial.",
      questions: [
        "¿Cómo puedo validar mi idea de negocio antes de lanzarla al mercado?",
        "¿Qué pasos debo seguir para construir un producto mínimo viable (MVP)?",
        "¿Qué estrategias puedo usar para crecer mi base de clientes de manera efectiva?",
        "¿Cómo puedo mejorar la visibilidad de mi startup en línea?",
      ],
    },
    {
      name: "Marcus",
      role: "Asesor de Mercado",
      id: 2,
      img: mark,
      theme: "dracula",
      description:
        "Especialista en investigación de mercado, análisis de competencia y tendencias de la industria.",
      questions: [
        "¿Cómo puedo analizar a mis competidores directos e indirectos en el mercado?",
        "¿Qué tendencias emergentes debo considerar en mi industria?",
        "¿Cómo puedo identificar mi mercado objetivo de manera más efectiva?",
        "¿Qué estrategias de entrada al mercado me recomendarías para mi producto?",
      ],
    },
    {
      name: "Brianna",
      role: "Generadora de Planes de Negocio",
      id: 3,
      img: brianna,
      theme: "dark",
      description:
        "Experta en estructuración y redacción de planes de negocio completos, incluyendo proyecciones financieras y análisis de mercado.",
      questions: [
        "¿Cómo estructuro un plan de negocio sólido para mi startup?",
        "¿Qué información necesito para hacer proyecciones financieras precisas?",
        "¿Cómo realizo un análisis de mercado detallado para mi plan de negocio?",
        "¿Qué estrategias de crecimiento debería incluir en mi plan de negocio?",
      ],
    },
    {
      name: "Maya",
      role: "Asesora de Marketing",
      id: 4,
      img: maya,
      theme: "sunset",
      description:
        "Especialista en estrategias de marketing digital, campañas en redes sociales, SEO y análisis de rendimiento.",
      questions: [
        "¿Cómo creo una estrategia de marketing digital efectiva para mi startup?",
        "¿Qué técnicas de SEO debo utilizar para mejorar la visibilidad de mi sitio web?",
        "¿Cómo puedo diseñar una campaña en redes sociales que genere engagement?",
        "¿Qué herramientas de análisis de rendimiento recomendarías para mis campañas de marketing?",
      ],
    },
    {
      name: "Riley",
      role: "Asesor Financiero",
      id: 5,
      img: riley,
      theme: "forest",
      description:
        "Experto en gestión financiera, presupuestos, búsqueda de fondos y optimización de recursos para startups.",
      questions: [
        "¿Cómo puedo crear un presupuesto inicial para mi startup?",
        "¿Cuáles son las mejores estrategias para buscar financiación para mi negocio?",
        "¿Qué métodos puedo usar para optimizar el uso de mis recursos financieros?",
        "¿Cómo interpreto y utilizo mis estados financieros para tomar decisiones estratégicas?",
      ],
    },
  ];

  const [selectedPersonality, setSelectedPersonality] = useState(
    personality[0]
  );

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (idRecomendation) {
      if (idRecomendation > 5) {
        setSelectedPersonality(null);
        navigate("/");
      } else {
        setSelectedPersonality(personality[idRecomendation - 1]);
      }
    }
  }, [idRecomendation]);

  return (
    <div className="flex-grow flex flex-col justify-between overflow-auto">
      <div className="collapse collapse-arrow border-base-200 bg-base-300 overflow-visible">
        <input
          id="collapse-input"
          type="checkbox"
          checked={isChecked}
          onClick={() => {
            setIsChecked(!isChecked);
          }}
        />
        <div className="collapse-title text-xl font-medium flex gap-5 overflow-visible">
          <div className="avatar">
            <div className="h-14 rounded-full">
              <img src={selectedPersonality.img} />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            {selectedPersonality.name}
            <p className="text-slate-400 group-hover:text-white text-sm">
              {selectedPersonality.role}
            </p>
          </div>
        </div>
        <div className="collapse-content flex flex-col">
          {personality
            .filter((person) => person.name != selectedPersonality.name)
            .map((person, index) => (
              <>
                <div className="divider m-0"></div>
                <div
                  key={index}
                  className="tooltip tooltip-secondary tooltip-bottomb"
                  data-tip={person.description}
                >
                  <div
                    className="flex gap-5 items-center justify-left py-2 rounded cursor-pointer hover:bg-base-100"
                    onClick={() => {
                      setSelectedPersonality(person);
                      handleBotId(person.id);
                      navigate(`/${person.id}`);
                      setIsChecked(false);
                    }}
                  >
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img src={person.img} />
                      </div>
                    </div>
                    <div className="font-semibold text-left">
                      <h2 className="text-md">{person.name}</h2>
                      <p className="text-slate-400 group-hover:text-white text-xs">
                        {person.role}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
      <div className="tablet:flex gap-5 tablet:justify-center tablet:flex-row tablet:pb-10 pb-5 tablet:items-center grid grid-cols-2">
        {selectedPersonality.questions.map((question, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border border-white text-white max-w-52 h-full cursor-pointer hover:bg-white/10 text-sm select-none"
            onClick={() => {
              handleSetCurrentMessage(question);
            }}
          >
            {question}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatNew;
