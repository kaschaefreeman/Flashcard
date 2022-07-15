import React from "react";
import { Link, Route, useRouteMatch} from "react-router-dom";
import DeleteButton from "../Forms/DeleteButton";

const CardList = ({ cards = [] }) => {
const {url} = useRouteMatch()
console.log(url)
  const cardButtons = (card, { id } = card) => {
     console.log(card)
    return (
      <>
        <div className="row justify-content-end m-3">
            <Link to={`${url}/cards/${id}/edit`} className="btn btn-secondary m-1">
              <span className="material-icons">edit</span>
              <span> Edit</span>
            </Link>
          <DeleteButton objectToDelete={card}/>
          </div>
      </>
    );
  };

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
      {list}
      <Route exact={true} path={`${url}/cards/:cardId/edit`}>
          
      </Route>
    </>
  );
};

export default CardList;
