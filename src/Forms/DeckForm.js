import React, { useEffect, useState } from "react";
import { createDeck, updateDeck } from "../utils/api/index";
import { useHistory, useRouteMatch } from "react-router-dom";

/**
 * Component renders the form to add and edit a deck.
 *
 */
const DeckForm = ({ deck }) => {
  const initialFormData = { name: "", description: "" };
  const [formData, setFormData] = useState({ ...initialFormData });
  const history = useHistory();
  const { path } = useRouteMatch();
  const abortController = new AbortController();

  //If deck received from props, update form data with deck info.
  if (deck)
    useEffect(() => {
      setFormData({ ...initialFormData, ...deck });
    }, [deck]);

  const handleFormChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  //On submit, check if deck received from props.
  //If so, update the given deck, else, create new deck
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const apiCall = deck
        ? updateDeck(formData, abortController.signal)
        : createDeck(formData, abortController.signal);
      const response = await apiCall;
      (await deck)
        ? history.push(`/decks/${response.id}`)
        : history.push(`${response.id}`);
    } catch (error) {
      throw error;
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    path === "/decks/:deckId/edit" ? history.goBack() : history.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <br />
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Deck name"
        className="form-control"
        value={formData.name}
        onChange={handleFormChange}
      />
      <br />
      <label htmlFor="description">Description</label>
      <br />
      <textarea
        rows="3"
        type="text"
        id="description"
        name="description"
        placeholder="Brief description of deck"
        className="form-control"
        value={formData.description}
        onChange={handleFormChange}
      />
      <br />
      <button className="btn btn-secondary" onClick={() => handleCancel}>
        Cancel
      </button>
      <button className="btn btn-primary m-2" type="Submit">
        Submit
      </button>
    </form>
  );
};

export default DeckForm;
