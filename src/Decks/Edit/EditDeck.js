import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DeckForm from "../../Forms/DeckForm";
import NavBar from "../NavBar";
import { readDeck } from "../../utils/api";

/**
 * Component renders Edit Deck Page.
 * It loads the deck form with the selected deck's information
 */
const EditDeck = () => {
  const [currentDeck, setCurrentDeck] = useState({});
  const { deckId } = useParams();

  //On mount, load current deck
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

  return (
    <div>
      <NavBar deck={currentDeck} />
      <div>
        <h2>Edit Deck</h2>
        <DeckForm deck={currentDeck} />
      </div>
    </div>
  );
};

export default EditDeck;
