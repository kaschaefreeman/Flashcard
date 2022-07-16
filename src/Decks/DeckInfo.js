import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import NavBar from "./NavBar";
import DeleteButton from "../Forms/DeleteButton";
import CardList from "./CardList";

/**
 * Component renders the decks information on route "/decks/:deckId".
 * Displays the deck info with list of cards below
 */
const DeckInfo = () => {
  const [currentDeck, setCurrentDeck] = useState({});
  const { deckId } = useParams();

  const { name, description, id } = currentDeck;

  //On Mount load deck
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

  //Format deck buttons
  const deckButtons = (
    <>
      <div className="row">
        <div className="col-11">
          <Link to={`/decks/${id}/edit`} className="btn btn-secondary m-1">
            <span className="material-icons">edit</span>
            <span> Edit</span>
          </Link>

          <Link to={`/decks/${id}/study`} className="btn btn-primary m-1">
            <span className="material-icons">school</span>
            <span> Study</span>
          </Link>
          <Link to={`/decks/${id}/cards/new`} className="btn btn-primary m-1">
            <span className="material-icons">add</span>
            <span> Add</span>
          </Link>
        </div>
        <div className="col">
          <DeleteButton objectToDelete={currentDeck} />
        </div>
      </div>
    </>
  );

  //Render page with Nav bar, deck info, and list of cards
  return (
    <>
      <div>
        <NavBar deck={currentDeck} />
      </div>
      <div className="container">
        <article>
          <section>
            <h4>{name}</h4>
            <p>{description}</p>
            <div>{deckButtons}</div>
          </section>
          <section>
            <CardList cards={currentDeck.cards} />
          </section>
        </article>
      </div>
    </>
  );
};

export default DeckInfo;
