import React from 'react';
import { Link } from 'react-router-dom';
import DeckList from './DeckList';

/**
 * Component renders the view on the home page route "/".
 * Displays the create deck button and all decks in a bootstrap card format
 */
const HomeView = () => {
     return (
       <>
         <article>
           <Link to="/decks/new" className="btn btn-secondary">
             <span className="material-icons">add</span>
             <span>Create Deck</span>
           </Link>
         </article>
         <article>
           <DeckList  />
         </article>
       </>
     );
}
 
export default HomeView;