import React from "react";

const AskAI = () => {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 1000 }}>
      <iframe
        src="http://127.0.0.1:7860"
        title="AI Doctor"
        style={{ width: "100%", height: "100%", border: "none" }}
        allow="microphone"
      />
    </div>
  );
};

export default AskAI;
