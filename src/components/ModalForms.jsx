import React, { useEffect, useState } from "react";
import {
  Stepper,
  StepOne,
  StepTwo,
  StepThree,
  StepFour,
  StepFive,
} from "./modalFormsComponents";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const apiUrl = import.meta.env.VITE_API_URL;

const ModalForms = ({ show, handleClose }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const userId = jwtDecode(token).user.id;

  const [formValues, setFormValues] = useState({
    id: userId,
    startupName: "",
    description: "",
    industry: "",
    developmentStage: "",
    numberOfEmployees: "",
    location: "",
    mainGoals: "",
    neededResources: "",
    mainCompetitors: "",
    strengths: "",
    challenges: "",
  });

  const handleInputChange = (field, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  useEffect(() => {
    const prevButton = document.getElementById("prevButton");
    if (prevButton === null) return;
    if (activeStep === 0) {
      prevButton.classList.add("invisible");
      prevButton.classList.remove("visible");
    } else {
      prevButton.classList.add("visible");
      prevButton.classList.remove("invisible");
    }
  }, [activeStep]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formValues.startupName ||
      !formValues.description ||
      !formValues.industry ||
      !formValues.developmentStage ||
      !formValues.numberOfEmployees ||
      !formValues.location ||
      !formValues.mainGoals ||
      !formValues.neededResources ||
      !formValues.mainCompetitors ||
      !formValues.strengths ||
      !formValues.challenges
    ) {
      alert("Por favor, completa todos los campos");
      return;
    } else {
      axios
        .post(`${apiUrl}/api/profile/`, formValues, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      handleClose();
    }
  };

  if (!show) return null;
  return (
    <div>
      <input
        type="checkbox"
        checked
        readOnly
        id="my_modal_7"
        className="modal-toggle"
      />
      <div className="modal" role="dialog">
        <div className="modal-box tablet:w-3/5 h-4/5 tablet:h-5/6 max-w-full p-0 flex flex-col tablet:flex-row gap-7">
          <div className="tablet:w-1/3 flex items-center justify-center p-5">
            <Stepper index={activeStep} />
          </div>
          <div className="tablet:w-2/3 flex-1 flex flex-col justify-between bg-base-300 px-12 py-10">
            {activeStep === 0 ? (
              <StepOne
                values={formValues}
                handleInputChange={handleInputChange}
              />
            ) : activeStep === 1 ? (
              <StepTwo
                values={formValues}
                handleInputChange={handleInputChange}
              />
            ) : activeStep === 2 ? (
              <StepThree
                values={formValues}
                handleInputChange={handleInputChange}
              />
            ) : activeStep === 3 ? (
              <StepFour
                values={formValues}
                handleInputChange={handleInputChange}
              />
            ) : activeStep === 4 ? (
              <StepFive
                values={formValues}
                handleInputChange={handleInputChange}
              />
            ) : null}
            <div id="sec-buttons" className="flex justify-between pt-4">
              <button
                id="prevButton"
                className="btn btn-secondary btn-circle invisible"
                onClick={prevStep}
              >
                <span className="material-symbols-rounded">chevron_left</span>
              </button>
              <button
                id="nextButton"
                className={`btn btn-secondary ${
                  activeStep === 4 ? "rounded-full" : "btn-circle"
                }`}
                onClick={activeStep === 4 ? handleSubmit : nextStep}
              >
                {activeStep === 4 ? (
                  <span>Finalizar</span>
                ) : (
                  <span className="material-symbols-rounded">
                    chevron_right
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalForms;
