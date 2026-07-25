import { useState } from "react";

function Home() {

  const [showMessage, setShowMessage] = useState(false);

  const [name, setName] = useState("");

  return (

    <div className="card">

      <h2>🏠 Home Page</h2>

      <button onClick={() => setShowMessage(!showMessage)}>
        {showMessage ? "Hide Message" : "Show Message"}
      </button>

      {showMessage &&
        <p className="message">
          🎉 Welcome to React Practical!
        </p>
      }

      <input
        type="text"
        placeholder="Enter your name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {name && (
        <h3>Hello, {name} </h3>
      )}

    </div>

  );
}

export default Home;