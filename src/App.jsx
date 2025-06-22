import { useState } from "react";
import flashcards from "./FlashCardData";

import "./App.css";

function App() {
    const [cardData, setCardData] = useState(flashcards);
    const [currentCard, setCurrentCard] = useState(0);

    const [currentStreak, setCurrentStreak] = useState(0);
    const [longestStreak, setLongestStreak] = useState(null);
    const [answerInput, setAnswerInput] = useState("");
    const [isCorrect, setIsCorrect] = useState(null);
    const [markCard, setMarkCards] = useState(0);

    function markACard() {
        if (currentCard <= 0) return;
        if (cardData.length === 2) return;

        const card = cardData[currentCard];
        const updatedData = cardData.filter((item) => item.id !== card.id);

        setCardData(updatedData);
        setMarkCards(markCard + 1);
        setIsCorrect(null);
        setAnswerInput("");

        if (currentCard >= updatedData.length) {
            setCurrentCard(updatedData.length - 1);
        }
    }

    function randomizeCards(array, fixedIndex) {
        for (let i = array.length - 1; i > 1; i--) {
            if (i === fixedIndex) continue;

            let j;

            do {
                j = Math.floor(Math.random() * i) + 1;
            } while (j === fixedIndex);

            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function shuffleCards() {
        const randomizeCardsArray = randomizeCards(
            cardData.slice(),
            currentCard
        );

        setCardData(randomizeCardsArray);

        setIsCorrect(null);
        setAnswerInput("");
    }

    function onClickNextBtn() {
        if (currentCard >= cardData.length - 1) return;

        setCurrentCard(currentCard + 1);
        setIsCorrect(null);
        setAnswerInput("");
        grayOutBtn();
    }

    function onClickPrevBtn() {
        if (currentCard <= 0) return;

        setCurrentCard(currentCard - 1);
        setIsCorrect(null);
        setAnswerInput("");
        grayOutBtn();
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

    function resetFlipStatus() {
        setCardData((prev) =>
            prev.map((card) => (!card.flip ? { ...card, flip: true } : card))
        );
    }

    function onSubmit() {
        if (currentCard === 0) return;

        // answer input needs to be greater than 3 for it to count
        if (answerInput.length < 3) {
            setIsCorrect(null);
            return;
        }

        const currentObject = cardData[currentCard];
        if (!currentObject.flip) return;

        const arrayForIfValueExist = currentObject.facts
            .flatMap((item) => item.split(" "))
            .filter((item) => item.length > 3);

        const isValueExist = arrayForIfValueExist.some((item) =>
            item.includes(answerInput)
        );

        setIsCorrect(isValueExist);

        if (isValueExist === true) {
            setCurrentStreak(currentStreak + 1);
        }

        if (isValueExist === false) {
            if (currentStreak > longestStreak) {
                setLongestStreak(currentStreak);
                setCurrentStreak(0);
            }
        }
    }

    return (
        <div>
            <div
                style={{
                    textAlign: "center",
                    color: "indigo",
                    backgroundColor: "white",
                    width: "500px",
                }}
            >
                <h1 style={{ fontSize: "28px" }}>
                    Guess if Fruit or Vegetable
                </h1>
                <p>Let's test your knowledge on Fruits and Vegetables</p>
                <p style={{ padding: "0 0 0.4rem 0" }}>
                    Number of cards: {cardData.length - 1}
                </p>
                <p>
                    Current Streak: {currentStreak}, longestStreak:{" "}
                    {longestStreak}
                </p>
            </div>

            <div className="mark-cards-div">
                <button className="mark-card-btn" onClick={markACard}>
                    Mark Card
                </button>
                <p className="number-of-mark-cards">Mark cards: {markCard}</p>
            </div>

            <div className="app-container">
                <Card
                    cardData={cardData}
                    currentCard={currentCard}
                    handleCardClick={handleCardClick}
                />
                <AnswerForm
                    answerInput={answerInput}
                    setAnswerInput={setAnswerInput}
                    onSubmit={onSubmit}
                    isCorrect={isCorrect}
                />
                <NavigationBtns
                    onClickPrevBtn={onClickPrevBtn}
                    onClickNextBtn={onClickNextBtn}
                    resetFlipStatus={resetFlipStatus}
                    currentCard={currentCard}
                    shuffleCards={shuffleCards}
                    cardData={cardData}
                />
            </div>
        </div>
    );
}

function AnswerForm({ answerInput, setAnswerInput, onSubmit, isCorrect }) {
    let correctClass = "";
    if (isCorrect === true) {
        correctClass = "correct-answer";
    }

    if (isCorrect === false) {
        correctClass = "incorrect-answer";
    }

    return (
        <div className="answer-form">
            <label htmlFor="answer">
                Guess the answer here:{" "}
                <input
                    placeholder="Place your answer here"
                    className={`input-answer ${correctClass}`}
                    type="text"
                    value={answerInput}
                    onChange={(e) => setAnswerInput(e.target.value)}
                />
                <input
                    className="submit-answer"
                    type="button"
                    value="Submit Guess"
                    onClick={onSubmit}
                />
            </label>
        </div>
    );
}

function Card({ cardData, currentCard, handleCardClick }) {
    function pickCardColor() {
        if (cardData[currentCard].difficulty === "easy") return "green";
        if (cardData[currentCard].difficulty === "medium") return "orange";
        if (cardData[currentCard].difficulty === "hard") return "#c43a73";
    }

    return (
        <div className="flip-card" onClick={() => handleCardClick(currentCard)}>
            <div
                className={`flip-card-inner ${
                    cardData[currentCard].flip ? "" : "rotate"
                }`}
            >
                <div
                    className="flip-card-front"
                    style={{
                        backgroundColor: cardData[currentCard].difficulty
                            ? pickCardColor()
                            : "white",
                    }}
                >
                    <p>
                        {cardData[currentCard].difficulty &&
                            `Difficulty: ${cardData[currentCard].difficulty}`}
                    </p>
                    <p>
                        {cardData[currentCard].difficulty
                            ? `Q ${cardData[currentCard].id}: Is the
                        ${cardData[currentCard].name} a fruit or a vegetable?`
                            : `${cardData[currentCard].name}`}
                    </p>
                </div>
                <div
                    className="flip-card-back"
                    style={{
                        backgroundColor: cardData[currentCard].difficulty
                            ? pickCardColor()
                            : "white",
                        color: cardData[currentCard].difficulty
                            ? "white"
                            : "black",
                    }}
                >
                    <h2 style={{ fontSize: "20px" }}>
                        {cardData[currentCard].type &&
                            `${cardData[currentCard].name} is a type of`}{" "}
                        {cardData[currentCard].type &&
                            `${cardData[currentCard].type}s`}
                    </h2>
                    {cardData[currentCard].facts.map((item, index) => (
                        <p key={index}>{item}</p>
                    ))}
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
    shuffleCards,
    cardData,
}) {
    return (
        <div className="navigation-btn">
            <button
                className={`previous-btn ${
                    currentCard === 0 ? "gray-out" : ""
                }`}
                onClick={() => {
                    resetFlipStatus(currentCard);
                    onClickPrevBtn();
                }}
            >
                ⬅
            </button>

            <button
                className={`next-btn ${
                    currentCard === cardData.length - 1 ? "gray-out" : ""
                }`}
                onClick={onClickNextBtn}
            >
                ➡
            </button>
            <button className="shuffle-btn" onClick={shuffleCards}>
                Shuffle Cards
            </button>
        </div>
    );
}

export default App;
