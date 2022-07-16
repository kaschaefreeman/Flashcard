import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import CardForm from "../../Forms/CardForm";
import { readDeck } from "../../utils/api";
import { useParams } from "react-router-dom";

/**
 * Component renders the Add card page.
 * It loads a blank card form
 */
const AddCard = () => {
  const [currentDeck, setCurrentDeck] = useState([]);
  const { deckId } = useParams();

  //on mount load the deck where the card is to be added
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
    loadDeck();
    return () => {
      console.info("aborting");
      abortController.abort();
    };
  }, []);

  return (
    <>
      <div>
        <NavBar deck={currentDeck} />
      </div>
      <h2>{currentDeck.name}: Add Card</h2>
      <CardForm />
    </>
  );
};

export default AddCard;
