import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardForm from "../../../Forms/CardForm";
import NavBar from "../../NavBar";
import { readDeck, readCard } from "../../../utils/api";

/**
 * Component renders the Edit Card page.
 *  It Loads the card form with the current cards information
 */
const EditCard = () => {
  const [currentDeck, setCurrentDeck] = useState([]);
  const [currentCard, setCurrentCard] = useState({});
  const { deckId, cardId } = useParams();

  //On mount load current deck and card to edit
  useEffect(() => {
    const abortController = new AbortController();
    const loadDeck = async () => {
      try {
        const response = await readDeck(deckId, abortController.signal);
        setCurrentDeck(response);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    };
    const loadCard = async () => {
      try {
        const response = await readCard(cardId, abortController.signal);
        setCurrentCard(response);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    };
    loadCard();
    loadDeck();
    return () => {
      console.info("aborting");
      abortController.abort();
    };
  }, []);

  return (
    <>
      <div>
        <NavBar deck={currentDeck} card={currentCard} />
      </div>
      <h2>Edit Card</h2>
      <CardForm card={currentCard} />
    </>
  );
};

export default EditCard;
