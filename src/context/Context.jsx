import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState(""); // storing the recent prompts data
  const [prevPrompts, setPrevPrompts] = useState([]); // storing the history of prompts data
  const [showResult, setShowResult] = useState(false); // displaying the result
  const [loading, setLoading] = useState(false); // for loading
  const [messages, setMessages] = useState([]); // for chat messages

  const onSent = async () => {
    if (input.trim() === "") return;

    setLoading(true);

    // Add user's message to the chat
    setMessages((prevMessages) => [...prevMessages, { type: "user", text: input }]);

    let response;
    response = await runChat(input);

    // Format response and add bot's reply to the chat
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponseWithLineBreak = newResponse.split("*").join("</br>");

    // Add bot's reply to the chat
    setMessages((prevMessages) => [...prevMessages, { type: "bot", text: newResponseWithLineBreak }]);

    setLoading(false);
    setInput("");
  };

  const contextValue = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompts,
    setPrevPrompts,
    showResult,
    loading,
    messages,
    onSent,
  };
  

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
