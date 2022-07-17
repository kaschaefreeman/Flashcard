import React, { useEffect, useState } from "react";
import { listDecks } from "../utils/api/index";
import { Link } from "react-router-dom";
import DeleteButton from "../Forms/DeleteButton";

/**
 * Component that renders a list of decks in card format
 */
function DeckCards() {
  const [decks, setDecks] = useState([]);

  //fetch decks array when component mounts making call to api
  useEffect(() => {
    const abortController = new AbortController();

    const loadDecks = async () => {
      setDecks([]);
      try {
        const response = await listDecks(abortController.signal);
        setDecks(response);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    };

    loadDecks();
    return () => {
      abortController.abort();
    };
  }, []);

  //helper function renders the view, study, and delete Link buttons at bottom of deck's info card
  const cardButtons = (deck, { id } = deck) => {
    return (
      <React.Fragment>
        <div className="container ">
          <div className="row">
            <div className="col-10">
              <Link to={`/decks/${id}`} className="btn btn-secondary m-1">
                <span className="material-icons">visibility</span>
                <span> View</span>
              </Link>

              <Link to={`/decks/${id}/study`} className="btn btn-primary m-1">
                <span className="material-icons">school</span>
                <span> Study</span>
              </Link>
            </div>
            <div className="col">
              <DeleteButton objectToDelete={deck} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  // render decks into card format with buttons attached
  return decks.map((deck, index) => {
    const count = deck.cards.length;
    return (
      <section id={deck.name} key={index}>
        <div className="card card-bg m-3">
          <div className="card-body">
            <div className="row">
              <h2 className="col-10">{deck.name}</h2>
              <small className="text-muted col">{count} cards</small>
            </div>
            <p className="card-text">{deck.description}</p>
            <div>{cardButtons(deck)}</div>
          </div>
        </div>
      </section>
    );
  });
}

export default DeckCards;
