import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';

//component renders the navigation bar and viewed when you study, create, or view a deck. 
//navigation items change depending on the path to fit the pages needs
const NavBar = ({deck={}}) => {
  console.log(deck)
  const {id, name} = deck

  let navItems 
  const {path} = useRouteMatch()

  switch (path) {
    //when viewing a deck,  render navbar to have Home/*DeckName* prop
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
    //when studying a deck, render nav to have Home/*DeckName* prop/Study
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
      <ol className ="breadcrumb">
        {navItems}
      </ol>
    </nav>
  );
}
 
export default NavBar;
