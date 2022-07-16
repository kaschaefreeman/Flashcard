import React, { useEffect, useState } from "react";
import { createCard, updateCard } from "../utils/api/index";
import { useHistory, useParams } from "react-router-dom";

/**
 * Component renders the form to edit and add a card
 */
const CardForm = ({ card }) => {
  const initialFormData = { front: "", back: "" };
  const [formData, setFormData] = useState({ ...initialFormData });
  const history = useHistory();
  const { deckId } = useParams();
  const abortController = new AbortController();

  //If card given update the form data to include card's info
  if (card)
    useEffect(() => {
      setFormData({ ...initialFormData, ...card });
    }, [card]);

  const handleFormChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  //On submit, check if card was given as prop.
  //If so, update the given card, else create the new card
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = card
        ? updateCard(formData, abortController.signal)
        : createCard(deckId, formData, abortController.signal);
      history.push(`/decks/${deckId}`);
      return await response;
    } catch (error) {
      throw error;
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.push(`/decks/${deckId}`);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label for="front">Front</label>
      <br />
      <textarea
        rows="3"
        type="text"
        id="front"
        name="front"
        className="form-control"
        value={formData.front}
        onChange={handleFormChange}
      />
      <br />
      <label for="back">Back</label>
      <br />
      <textarea
        rows="3"
        type="text"
        id="back"
        name="back"
        className="form-control"
        value={formData.back}
        onChange={handleFormChange}
      />
      <br />
      <button className="btn btn-secondary" onClick={(e) => handleCancel(e)}>
        Cancel
      </button>
      <button className="btn btn-primary m-2" type="Submit">
        Submit
      </button>
    </form>
  );
};

export default CardForm;
