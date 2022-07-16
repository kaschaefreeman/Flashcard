import React, { useState } from "react";
import { useHistory } from "react-router-dom";

/**
 * Component renders the flash cards in study view.
 * Allows card to be flipped over. Will then show button to go to the next card.
 */

const StudyCard = ({ cards = [] }) => {
  const [cardIndex, setCardIndex] = useState(0);
  const [cardSide, setCardSide] = useState("front");
  const history = useHistory();
  const card = cards[cardIndex] || {};

  //onClick of Flip button set side to be front or back
  const handleFlip = () =>
    setCardSide((currentSide) => (currentSide === "front" ? "back" : "front"));

  //onClick of Next, if not at last card, go to the next card
  const handleNext = () => {
    if (cardIndex !== cards.length - 1) {
      setCardIndex((currentIndex) => (currentIndex += 1));
      handleFlip();
    } else {
      //if on last card, confirm if want to restart deck or go back to Home page
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

  //Variable that renders flash card body with buttons
  //Next button visible if card side is set to back
  const fillCard = (
    <>
      <h3 className="card-title">
        Card {cardIndex + 1} of {cards.length}
      </h3>
      <p className="card-text">{card[cardSide]}</p>
      <button className="btn btn-secondary m-2" onClick={handleFlip}>
        Flip
      </button>
      { cardSide !== "front" ? <button
        className="btn btn-primary m-2"
        onClick={handleNext}
      >
        Next
      </button> : null   }
    </>
  );

  return (
    <div className="card m-3">
      <div className="card-body">{fillCard}</div>
    </div>
  );
};

export default StudyCard;
