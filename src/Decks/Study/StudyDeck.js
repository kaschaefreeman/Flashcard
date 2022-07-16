import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotEnoughCards from "./NotEnoughStudyCards";
import StudyCard from "./StudyCard";
import { readDeck } from "../../utils/api";
import NavBar from "../NavBar";

/**
 * Component renders the view on decks/:deckId/study route.
 * Adds navigation bar on top passing prop of deck name for title in bar.
 */
const StudyDeck = () => {
  const [currentDeck, setCurrentDeck] = useState([]);
  const { deckId } = useParams();

  //On mount, load the current deck
  useEffect(() => {
    const abortController = new AbortController();
    setCurrentDeck([]);
    const loadDeck = async () => {
      try {
        const deck = await readDeck(deckId, abortController.signal);
        setCurrentDeck(deck);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    };
    loadDeck();
    return () => {
      console.info("aborting");
      abortController.abort();
    };
  }, []);

  const cards = currentDeck.cards || {};

  //Render the NavBar and check if deck has more than 3 cards
  //If true, study cards.
  //If false, display "Not Enough Cards" prompt
  return (
    <div>
      <NavBar deck={currentDeck} />
      <h2>Study: {currentDeck.name}</h2>
      {cards.length > 2 ? (
        <StudyCard cards={cards} />
      ) : (
        <NotEnoughCards cards={cards} />
      )}
    </div>
  );
};

export default StudyDeck;
