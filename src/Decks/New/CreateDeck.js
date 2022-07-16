import React from "react";
import NavBar from "../NavBar";
import DeckForm from "../../Forms/DeckForm";

/**
 * Component renders the Create Deck page on route "/decks/new".
 * It loads a blank deck form.
 */
const CreateDeck = () => {

  
  return (
    <div>
      <div>
        <NavBar />
        <h1>Create Deck</h1>
      </div>
      <div>
        <DeckForm />
      </div>
    </div>
  );
};

export default CreateDeck;
