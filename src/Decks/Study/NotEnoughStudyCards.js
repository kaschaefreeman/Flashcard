import React from "react";
import { Link, useParams } from "react-router-dom";

/**
 * Component renders the page that prompts a deck does not have enough cards to study when a deck with less than 3 cards is requested to be studied.
 */
const NotEnoughCards = ({ cards = [] }) => {
  const { deckId } = useParams();

  return (
    <section>
      <h4>Not enough cards.</h4>
      <p>
        You need at least 3 cards to study. There are {cards.length} in this
        deck.
      </p>
      <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
        <span className="material-symbols-outlined">add</span>
        <span>Add Cards</span>
      </Link>
    </section>
  );
};

export default NotEnoughCards;
