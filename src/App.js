import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const iFrameRef = useRef(null);
  const [recievedMessage, setRecievedMessage] = useState([]);
  const [message, setMessage] = useState("");

  console.log(recievedMessage);

  const sendMessage = () => {
    if (!iFrameRef.current) return;
    iFrameRef.current.contentWindow.postMessage(
      message,
      // "https://majestic-boba-6644c7.netlify.app/"
      "http://localhost:3001"
    );
  };

  useEffect(() => {
    window.addEventListener("message", function (e) {
      if (e.origin !== "http://localhost:3001") return;
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
          onBlur={(e) => setMessage(e.target.value)}
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
          src="http://localhost:3001"
          width="400"
          height="490"
          title="Child iframe"
          style={{ borderRadius: "10px" }}
        ></iframe>
        <div>
          <p>{recievedMessage[0]}</p>
          {recievedMessage[1] && <p>You have clicked : {recievedMessage[1]}</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
