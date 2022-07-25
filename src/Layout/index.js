import React from "react";
import { Route, Switch } from "react-router-dom";

import "./index.css";
import Header from "./Header";
import HomeView from "./HomeView";
import CreateDeck from "../Decks/New/CreateDeck";
import DeckInfo from "../Decks/DeckInfo";
import StudyDeck from "../Decks/Study/StudyDeck";
import EditDeck from "../Decks/Edit/EditDeck";
import NotFound from "./NotFound";
import EditCard from "../Decks/Cards/Card/EditCard";
import AddCard from "../Decks/Cards/AddCard";

function Layout() {
  return (
    <>
      <Header />

      <div className="container">
        <Switch>
          <Route exact={true} path="/flashcard-app">
            <HomeView />
          </Route>

          <Route exact={true} path="/decks/new">
            <CreateDeck />
          </Route>

          <Route exact={true} path="/decks/:deckId">
            <DeckInfo />
          </Route>

          <Route exact={true} path="/decks/:deckId/study">
            <StudyDeck />
          </Route>

          <Route exact={true} path="/decks/:deckId/edit">
            <EditDeck />
          </Route>

          <Route exact={true} path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>

          <Route exact={true} path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
