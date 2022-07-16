import React from "react";
import { useRouteMatch, Link } from "react-router-dom";

/**
 * component renders the navigation bar when on all routes under "/deck/"
 * Navigation bar items are updated based on the path to fit page needs
 */
const NavBar = ({ deck = {}, card = {} }) => {
  const { id, name } = deck;
  let navItems;
  const { path } = useRouteMatch();

  switch (path) {
    //when viewing a deck,  render navbar to have Home/*DeckName* prop passed from props
    case "/decks/:deckId":
      navItems = (
        <>
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="material-symbols-outlined">home</span>
              <span>Home</span>
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <span>{name}</span>
          </li>
        </>
      );
      break;
    //when studying a deck, render nav to have Home/*DeckName* from props/Study
    case "/decks/:deckId/study":
      navItems = (
        <>
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="material-symbols-outlined">home</span>
              <span>Home</span>
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${id}`}>
              <span>{name}</span>
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <span>Study</span>
          </li>
        </>
      );
      break;
    //when editing a deck, render nav to have Home/*DeckName* from props/Edit
    case "/decks/:deckId/edit":
      navItems = (
        <>
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="material-symbols-outlined">home</span>
              <span>Home</span>
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${id}`}>
              <span>{name}</span>
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <span>Edit</span>
          </li>
        </>
      );
      break;
    //when adding a card to a deck, render nav to have Home/*DeckName* from props/Add Card
    case "/decks/:deckId/cards/new":
      navItems = (
        <>
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="material-symbols-outlined">home</span>
              <span>Home</span>
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${id}`}>
              <span>{name}</span>
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <span>Add Card</span>
          </li>
        </>
      );
      break;
    //when editing a card, render nav to have Home/*DeckName* from props/Edit Card *CardId* from props
    case "/decks/:deckId/cards/:cardId/edit":
      navItems = (
        <>
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="material-symbols-outlined">home</span>
              <span>Home</span>
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${id}`}>
              <span>{name}</span>
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <span>Edit Card {card.id}</span>
          </li>
        </>
      );
      break;
    default:
      //default set for call on create deck path.
      //render navbar to have Home/Decks/New
      navItems = (
        <>
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="material-symbols-outlined">home</span>
              <span>Home</span>
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create
          </li>
        </>
      );
      break;
  }
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">{navItems}</ol>
    </nav>
  );
};

export default NavBar;
