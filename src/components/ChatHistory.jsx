import { React, useRef, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import finn from "../assets/finn.png";
import brianna from "../assets/brianna.png";
import mark from "../assets/mark.png";
import maya from "../assets/maya.png";
import riley from "../assets/riley.png";

const ChatHistory = ({
  messages,
  botId,
  handleSetActiveConversation,
  handleSetCurrentMessage,
}) => {
  const endOfListRef = useRef(null);
  const spanRefs = useRef({});
  const [recommendation, setRecommendation] = useState([]);
  const [userBot, setUserBot] = useState({});
  const navigate = useNavigate();

  

  const copyToClipboard = (index) => {
    const textToCopy = spanRefs.current[index]?.textContent;
    if (textToCopy) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          console.log("Text copied to clipboard");
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    }
  };

  useEffect(() => {
    endOfListRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const recommendationHandler = (msg) => {
    setRecommendation([]);
    setRecommendation((prevRecommendation) => {
      const newRecommendation = [...prevRecommendation];
      if (msg.includes("Finn") && botId != 1) {
        newRecommendation.push({ name: "Finn", id: 1 });
      }
      if (msg.includes("Marcus") && botId != 2) {
        newRecommendation.push({ name: "Marcus", id: 2 });
      }
      if (msg.includes("Brianna") && botId != 3) {
        newRecommendation.push({ name: "Brianna", id: 3 });
      }
      if (msg.includes("Maya") && botId != 4) {
        newRecommendation.push({ name: "Maya", id: 4 });
      }
      if (msg.includes("Riley") && botId != 5) {
        newRecommendation.push({ name: "Riley", id: 5 });
      }
      return newRecommendation;
    });
  };

  useEffect(() => {
    const lastMessage = messages.at(-1)?.parts[0]?.text;
    if (lastMessage) {
      recommendationHandler(lastMessage);
      console.log(recommendation);
    }
  }, [messages]);

  const goRecommendation = (id) => {
    return () => {
      navigate(`/${id}`);
      handleSetActiveConversation(null);
    };
  };

  let img =
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg";

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

  useEffect(() => {
    if (botId == 1) {
      setUserBot(personality[0]);
    } else if (botId == 2) {
      setUserBot(personality[1]);
    } else if (botId == 3) {
      setUserBot(personality[2]);
    } else if (botId == 4) {
      setUserBot(personality[3]);
    } else if (botId == 5) {
      setUserBot(personality[4]);
    }
  }, [botId]);

  return (
    <>
      <div className="text-xl font-medium flex gap-5 mx-auto w-full pb-3">
        <div className="avatar">
          <div className="h-14 rounded-full">
            <img src={userBot.img} />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {userBot.name}
          <p className="text-slate-400 group-hover:text-white text-sm">
            {userBot.role}
          </p>
        </div>
      </div>
      <div className="divider my-0"></div>
      <div className="flex-grow px-1 overflow-auto">
        <div key={2} >
          {messages.map((msg, index) =>
            msg.role === "user" ? (
              <div
                key={index}
                className={`flex gap-5 py-2 chat-end justify-end`}
              >
                <div
                  className={`rounded-l-3xl rounded-tr-3xl rounded-br-sm bg-primary p-6`}
                >
                  <ReactMarkdown>{msg.parts[0].text}</ReactMarkdown>
                </div>
              </div>
            ) : msg.role === "bot" || msg.role === "model" ? (
              <>
                <div
                  key={index}
                  className={`flex gap-5 py-5 pr-3 w-3/4 chat-start justify-start`}
                >
                  <div
                    className={`rounded-r-3xl rounded-tl-3xl rounded-bl-sm bg-base-100 p-6 flex flex-col gap-5 relative`}
                  >
                    {!msg.loading ? (
                      <div
                        className="btn border-0 absolute -bottom-4 right-2 bg-primary cursor-pointer p-2 rounded-xl flex items-center gap-2 select-none"
                        onClick={() => copyToClipboard(index)}
                      >
                        <span className="material-symbols-rounded-outlined text-lg ">
                          content_copy
                        </span>
                        <span className="text-sm p-0 m-0">Copiar</span>
                      </div>
                    ) : null}
                    <div>
                      {msg.loading ? (
                        <span className="loading loading-dots loading-sm"></span>
                      ) : null}
                      <span ref={(el) => (spanRefs.current[index] = el)}>
                        <ReactMarkdown>{msg.parts[0].text}</ReactMarkdown>
                        {recommendation != null ? (
                          <div className="flex justify-center gap-3">
                            {recommendation.map((recomendation, index) => (
                              <div
                                key={index}
                                className="pt-4 pb-2 flex justify-center"
                              >
                                <div
                                  className="p-3 rounded-lg border border-white text-white max-w-52 h-full cursor-pointer hover:bg-white/10 text-sm select-none"
                                  onClick={goRecommendation(recomendation.id)}
                                >
                                  Chatear con {recomendation.name}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="py-3 flex justify-center"></div>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : null
          )}
          <div ref={endOfListRef}></div>
        </div>
      </div>
    </>
  );
};

export default ChatHistory;
