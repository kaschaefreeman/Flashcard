import React, { useEffect, useState } from "react";
import { createCard, updateCard } from "../utils/api/index";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";

const CardForm = ({ card }) => {
  const initialFormData = { front: "", back: "" };
  const [formData, setFormData] = useState({ ...initialFormData });
  const history = useHistory();
  const { path} = useRouteMatch();
  const {deckId} = useParams()
  const abortController = new AbortController();
 
  console.log(deckId)
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = card
        ? updateCard(formData, abortController.signal)
        : createCard(deckId,formData, abortController.signal);
        history.push(`/decks/${deckId}`);
      return await response
    } catch (error) {
      throw error;
    }
  };

  const handleCancel = (event) => {
    console.log(event)
    event.preventDefault();
   history.push(`/decks/${deckId}`)
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
