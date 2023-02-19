import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const iFrameRef = useRef(null);
  const [recievedMessage, setRecievedMessage] = useState([]);
  const [message, setMessage] = useState([]);

  const sendMessage = () => {
    if (!iFrameRef.current) return;
    iFrameRef.current.contentWindow.postMessage(
      message,
      "http://127.0.0.1:5173"
    );
  };

  useEffect(() => {
    window.addEventListener("message", function (e) {
      if (e.origin !== "http://127.0.0.1:5173") return;
      setRecievedMessage(e.data);
    });
  }, []);

  return (
    <div className="container">
      <h1>Parent</h1>
      <div onSubmit={sendMessage} className="form">
        <input
          type="text"
          name="messsage"
          onBlur={(e) => setMessage([...message, e.target.value])}
        />
        <button
          onClick={() => {
            sendMessage();
          }}
        >
          Send message to child
        </button>
      </div>

      <br />
      <br />

      <div className="iframe-div">
        <iframe
          ref={iFrameRef}
          src="http://127.0.0.1:5173"
          width="600"
          height="300"
          title="Child iframe"
        ></iframe>
        <div>
          {recievedMessage?.map((msg, i) => (
            <p key={i}>{msg}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
