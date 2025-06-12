import { useState } from "react";
import flashcards from "./FlashCardData";

import "./App.css";

function App() {
    const [count, setCount] = useState(0);
    const [cardData, setCardData] = useState(flashcards);
    const [currentCard, setCurrentCard] = useState(0);

    function onClickNextBtn() {
        if (currentCard >= cardData.length - 1) return;
        setCurrentCard(currentCard + 1);
    }

    function onClickPrevBtn() {
        if (currentCard <= 0) return;
        console.log(currentCard);
        setCurrentCard(currentCard - 1);
    }

    function handleCardClick(currentCard) {
        if (cardData[currentCard].flip) {
            setCardData((prev) =>
                prev.map((card, index) =>
                    currentCard === index ? { ...card, flip: false } : card
                )
            );
        }

        if (!cardData[currentCard].flip) {
            setCardData((prev) =>
                prev.map((card, index) =>
                    currentCard === index ? { ...card, flip: true } : card
                )
            );
        }
    }

    function resetFlipStatus(currentCard) {
        console.log(cardData[currentCard - 1]);
        console.log(cardData[currentCard]);

        console.log(cardData[currentCard - 1].flip === false);

        // if (cardData[currentCard - 1].flip === false) {
        //     setCardData((prev) =>
        //         prev.map((card, index) =>
        //             currentCard - 1 === index - 1
        //                 ? { ...card, flip: true }
        //                 : card
        //         )
        //     );
        // }
    }

    return (
        <>
            <div className="app-container">
                <Card
                    cardData={cardData}
                    currentCard={currentCard}
                    handleCardClick={handleCardClick}
                />
                <NavigationBtns
                    onClickPrevBtn={onClickPrevBtn}
                    onClickNextBtn={onClickNextBtn}
                    resetFlipStatus={resetFlipStatus}
                    currentCard={currentCard}
                />
            </div>
        </>
    );
}

function Card({ cardData, currentCard, handleCardClick }) {
    return (
        <div className="flip-card" onClick={() => handleCardClick(currentCard)}>
            <div
                className={`flip-card-inner ${
                    cardData[currentCard].flip ? "" : "rotate"
                }`}
            >
                <div className="flip-card-front">
                    {cardData[currentCard].name}
                </div>
                <div className="flip-card-back">
                    {cardData[currentCard].facts[0]}
                </div>
            </div>
        </div>
    );
}

function NavigationBtns({
    onClickPrevBtn,
    onClickNextBtn,
    resetFlipStatus,
    currentCard,
}) {
    return (
        <div className="navigation-btn">
            <button
                className="previous-btn"
                onClick={() => {
                    onClickPrevBtn();
                    resetFlipStatus(currentCard);
                }}
            >
                Previous
            </button>
            <button className="next-btn" onClick={onClickNextBtn}>
                Next
            </button>
        </div>
    );
}

export default App;
