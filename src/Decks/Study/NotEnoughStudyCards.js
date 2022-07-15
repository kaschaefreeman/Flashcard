import React from 'react';
import { Link, useParams } from 'react-router-dom';

const NotEnoughCards = ({cards=[]}) => {
     const { deckId } = useParams();
     
     return (
       <section>
         <h4>Not enough cards.</h4>
         <p>
           You need at least 3 cards to study. There are {cards.length} in this
           deck.
         </p>
         <Link to={`/decks/${deckId}/cards/New`} className="btn btn-primary">
           <span class="material-symbols-outlined">add</span>
           <span>Add Cards</span>
         </Link>
       </section>
     );
}
 
export default NotEnoughCards;