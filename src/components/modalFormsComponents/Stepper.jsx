import React, { useEffect } from "react";
import { useState } from "react";

const Stepper = ({ index }) => {
  // Estado para mantener el índice del paso actual
  const [currentStep, setCurrentStep] = useState(index);

  // Array con los nombres de los pasos
  const steps = [
    "General",
    "Operación",
    "Objetivos",
    "Competencia",
    "Fortalezas",
  ];

  useEffect(() => {
    setCurrentStep(index);
  }, [index]);

  return (
    <div className="h-full flex items-center">
      <ul className="font-semibold steps gap-3 tablet:steps-vertical tablet:h-4/5">
        {steps.map((step, index) => (
          <li
            key={index}
            className={`step text-xs tablet:text-md ${index <= currentStep ? "step-secondary" : ""}`}
          >
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stepper;
