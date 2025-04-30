import React from "react";
import { useNavigate } from "react-router-dom";

const Historial = ({ chatMode, activeConversation, conversations, handleSetActiveConversation, selectConversation, handleBotId}) => {
  const navigate = useNavigate();
  const conversationList = conversations.slice().reverse().map((conversation, index) => (
      <li
        key={index}
        onClick={() => selectConversation(conversation.uuid)}
        className={`p-5 rounded-2xl text-sm cursor-pointer truncate overflow-hidden max-w-60 ${
          activeConversation === conversation.uuid
            ? "bg-primary"
            : "bg-neutral hover:bg-base-100"
        }`}
      >
        <a className={`rounded-3xl`}>{conversation.title}</a>
      </li>
    ));
  return (
    <div className="p-5 flex flex-col gap-4 ">
      <button
        className={`btn btn-secondary rounded-full ${
          chatMode === 1 ? "btn-disabled" : ""
        } w-full flex justify-center`}
        onClick={() => {
          navigate("/"), handleSetActiveConversation(null), handleBotId(1);
        }}
      >
        <span className="material-symbols-rounded">add</span>
        <span className="hidden xl:flex">Nueva conversación</span>
      </button>
      <ul className="grow h-full flex flex-col gap-3 select-none">{conversationList}</ul>
    </div>
  );
};

export default Historial;
