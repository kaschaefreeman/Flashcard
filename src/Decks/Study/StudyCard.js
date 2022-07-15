import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// component renders the flash cards in study view
//allows card to be flipped over and then view button to select next card.
const StudyCard = ({ cards = [] }) => {
  const [cardIndex, setCardIndex] = useState(0);
  const [cardSide, setCardSide] = useState("front");
  const history = useHistory();
  const card = cards[cardIndex] || {};


  //onClick of Flip button set side to be front or back
  const handleFlip = () =>
    setCardSide((currentSide) => (currentSide === "front" ? "back" : "front"));

  //on Next click if not at last card go to next card
  const handleNext = () => {
    if (cardIndex !== cards.length - 1) {
      setCardIndex((currentIndex) => (currentIndex += 1));
      handleFlip();
    } else {
     //if on last card confirm if want to restart deck or go back to Home
      if (
        window.confirm(
          "Restart cards?\n\n Click 'cancel' to return to the home page"
        ) === true
      ) {
        setCardIndex(0);
        handleFlip();
      } else {
        history.push("/");
      }
    }
  };

  //variable that renders flash card body with buttons
  //next button visible if card side is set to back
  const fillCard = (
    <>
      <h3 className="card-title">
        Card {cardIndex + 1} of {cards.length}
      </h3>
      <p className="card-text">{card[cardSide]}</p>
      <button className="btn btn-secondary m-2" onClick={handleFlip}>
        Flip
      </button>
      <button
        className="btn btn-primary m-2"
        onClick={handleNext}
        style={{ visibility: cardSide === "front" ? "hidden" : "visible" }}
      >
        Next
      </button>
    </>
  );

  return (
    <div className="card m-3">
      <div className="card-body">{fillCard}</div>
    </div>
  );
};

export default StudyCard;
