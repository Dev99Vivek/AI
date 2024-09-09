import "./Main.css";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { CiSomeIcon } from 'react-icons/ci';

const Main = () => {
  const { input, setInput, onSent, messages, loading } = useContext(Context);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  const startListening = () => {
    recognition.start();
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setInput(transcript);
    onSent();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && input) {
      onSent();
    }
  };

  return (
    <div className="main">
      <header className="header">
        {/* <p className="logo">Chat Bot</p> */}
        <a href="#" target="_blank" className="animated-button">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Chat Bot
        </a>
      </header>
      <main className="content">
        <div className="chat-container">
          {messages.map((message, index) => (
            <div key={index} className={`chat-message ${message.type}`}>
              <img
                src={message.type === "user" ? "/src/assets/user_icon.png" : "/src/assets/images.png"}
                alt={message.type}
                className="chat-icon"
              />
              <div className="chat-text" dangerouslySetInnerHTML={{ __html: message.text }}></div>
            </div>
          ))}
          {loading && <div className="loading-spinner"></div>}
        </div>
        <div className="search-container">
          <input
            onChange={(event) => setInput(event.target.value)}
            value={input}
            type="text"
            placeholder="Type your message..."
            className="search-input"
            onKeyDown={handleKeyPress}
          />
          <button
            onClick={startListening}
            className="mic-button button-animation"
          >
            <CiMicrophoneOn size={30} />
          </button>

          <a
            href="#"
            onClick={onSent}
            className={`send-button ${input ? 'active' : ''} button-animation`}
          >
            Send
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </a>
        </div>
      </main>
    </div>
  );
};

export default Main;
