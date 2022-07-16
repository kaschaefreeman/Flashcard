import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { deleteCard, deleteDeck } from "../utils/api";

/**
 * Component renders a delete button.
 * Can be used to delete a card or deck instance.
 */
const DeleteButton = ({ objectToDelete = {} }) => {
  const history = useHistory();
  const abortController = new AbortController();
  const { path } = useRouteMatch();

  /**
   * Deletes the card or deck from the api.
   * checks if theres is a key of deckId which is only in the card instance.
   * if it is a card instance, will run deleteCard function, else will run the deleteDeck function from api.index file
   * @param id
   * the id destructured from the instance to be deleted.  should be a card or deck object
   * @param deckId
   * the id destructured from the instance to be deleted.  should be a card or deck object
   * @returns {Promise<Error|*>}
   *  a promise that resolves to an empty object.
   */
  const handleDelete = async ({ id, deckId }) => {
    const deleteObject = deckId ? "card" : "deck";
    if (
      window.confirm(
        `Delete this ${deleteObject}?\n\nYou will not be able to recover it.`
      )
    ) {
      try {
        const deleteFunction = deckId
          ? deleteCard(id, abortController.signal)
          : deleteDeck(id, abortController.signal);
        const response = await deleteFunction;
        path === "/decks/:deckId" ? history.replace("/") : history.go("/");
        return await response;
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
  };

  return (
    <button
      className="btn btn-danger m-1"
      onClick={() => {
        handleDelete(objectToDelete);
      }}
    >
      <span className="material-icons">delete</span>
    </button>
  );
};

export default DeleteButton;
