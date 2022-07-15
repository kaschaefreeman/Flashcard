import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import CardForm from "../../Forms/CardForm";
import { readDeck } from "../../utils/api";
import { useParams } from "react-router-dom";

const AddCard = () => {
  const [currentDeck, setCurrentDeck] = useState([]);
  const { deckId} = useParams();

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
    loadDeck()
    return () => {
      console.info("aborting");
      abortController.abort();
    };
  }, []);
  
  return (
     <>
     <h2>{currentDeck.name}: Add Card</h2>
     <CardForm />
     </>
  ) 
};

export default AddCard;
