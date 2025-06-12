import { useState } from "react";
import flashcards from "./FlashCardData";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [cardData, setCardData] = useState(flashcards);

  return (
    <>
      <div className="app-container">
        <Card cardData={cardData} />
      </div>
    </>
  );
}

function Card({ cardData }) {
  const [flip, setFlip] = useState(true);

  function handleCardClick() {
    if (flip) setFlip(false);

    if (!flip) setFlip(true);
  }

  return (
    <div className={`flip-card`} onClick={handleCardClick}>
      <div className={`flip-card-inner ${flip ? "" : "rotate"}`}>
        <div className="flip-card-front">{cardData[0].name}</div>
        <div className="flip-card-back">{cardData[0].facts[0]}</div>
      </div>
    </div>
    // <div
    //   className={`card ${flip ? "" : "flip-card"} `}
    //   onClick={handleCardClick}
    // >
    //   {flip ? (
    //     <div className="card-front">{cardData[0].name}</div>
    //   ) : (
    //     <div className="card-back">{cardData[0].facts[0]}</div>
    //   )}
    // </div>
  );
}

export default App;
