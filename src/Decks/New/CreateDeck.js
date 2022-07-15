import React from "react";
import NavBar from "../NavBar"
import DeckForm from "../../Forms/DeckForm"

const CreateDeck = () => {

 
  return (
    <div>
     <div>
     <NavBar />
      <h1>Create new deck here</h1>
     </div>
     <div>
      <DeckForm />
     </div>
    </div>
  );
};

export default CreateDeck;
