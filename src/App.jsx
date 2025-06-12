import { useState } from "react";
import flashcards from "./FlashCardData";

import "./App.css";

function App() {
    const [count, setCount] = useState(0);
    const [cardData, setCardData] = useState(flashcards);
    const [flip, setFlip] = useState(true);

    function handleCardClick() {
        if (flip) setFlip(false);

        if (!flip) setFlip(true);
    }

    return (
        <>
            <div className="app-container">
                <Card
                    cardData={cardData}
                    flip={flip}
                    handleCardClick={handleCardClick}
                />
            </div>
        </>
    );
}

function Card({ cardData, flip, handleCardClick }) {
    return (
        <div className={`card flip-card `} onClick={handleCardClick}>
            {flip ? (
                <div className="card-front">{cardData[0].name}</div>
            ) : (
                <div className="card-back">{cardData[0].facts[0]}</div>
            )}
        </div>
    );
}

export default App;
