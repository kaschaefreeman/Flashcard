import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import DeleteButton from "../Forms/DeleteButton";

/**
 * Component renders the cards in a list of cards.
 * Will be displayed below the deck information on "/decks/:deckId" route
 */
const CardList = ({ cards = [] }) => {
  const { url } = useRouteMatch();

  /**
   * Function renders the buttons displayed for each card
   * @param card
   * the card instance
   * @param {id}
   * the id destructured from the card instance
   * @returns
   * Edit button (link to edit card component) and Delete button for each card
   */
  const cardButtons = (card, { id } = card) => {
    return (
      <>
        <div className="row justify-content-end m-3">
          <Link
            to={`${url}/cards/${id}/edit`}
            className="btn btn-secondary m-1"
          >
            <span className="material-icons">edit</span>
            <span> Edit</span>
          </Link>
          <DeleteButton objectToDelete={card} />
        </div>
      </>
    );
  };

  /**
   * function renders the card layout
   * @param card
   * the card instance
   * @param {id, front, back}
   * keys destructured from the card instance
   * @returns
   * A card formatted with the card information from given prop
   */
  const formatCard = (card, { id, front, back } = card) => {
    return (
      <div className="card" key={id}>
        <div className="card-body">
          <div className="container">
            <div className="row">
              <div className="col">{front}</div>
              <div className="col">{back}</div>
            </div>
            {cardButtons(card)}
          </div>
        </div>
      </div>
    );
  };

  const list = cards.map((card) => {
    return formatCard(card);
  });

  return (
    <>
      <h1>Cards</h1>
      <div>{list}</div>
    </>
  );
};

export default CardList;
