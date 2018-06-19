import * as DecksAPI from "../utils/dbApi";

export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const receiveDecks = decks => ({
  type: "RECEIVE_DECKS",
  decks
});

export const fetchDecks = () => dispatch =>
  DecksAPI.getAllDecks().then(decks => dispatch(receiveDecks(decks)));

export const ADD_DECK = "ADD_DECK";
export const addDeck = userInputs => ({
  type: "ADD_DECK",
  userInputs
});

export const handleDeckAdd = userInputs => dispatch => {
  dispatch(addDeck(userInputs));
};

export const DELETE_DECK = "DELETE_DECK";
export const deleteDeck = deckID => ({
  type: "DELETE_DECK",
  deckID
});

export const handleDeckDelete = deckID => dispatch => {
  dispatch(deleteDeck(deckID));
};

export const EDIT_DECK = "EDIT_DECK";
export const editDeck = (deckID, userInputs) => ({
  type: "EDIT_DECK",
  deckID,
  userInputs
});

export const handleDeckEdit = (deckID, userInputs) => dispatch => {
  dispatch(editDeck(deckID, userInputs));
};

export const ADD_CARD = "ADD_CARD";
export const addCard = (deckID, userInputs) => ({
  type: "ADD_CARD",
  deckID,
  userInputs
});

export const handleCardAdd = (deckID, userInputs) => dispatch => {
  dispatch(addCard(deckID, userInputs));
};

export const DELETE_CARD = "DELETE_CARD";
export const deleteCard = (deckID, cardID) => ({
  type: "DELETE_CARD",
  deckID,
  cardID
});

export const handleCardDelete = (deckID, cardID) => dispatch => {
  dispatch(deleteCard(deckID, cardID));
};

export const EDIT_CARD = "EDIT_CARD";
export const editCard = (deckID, cardID, userInputs) => ({
  type: "EDIT_CARD",
  deckID,
  cardID,
  userInputs
});

export const handleCardEdit = (deckID, cardID, userInputs) => dispatch => {
  dispatch(editCard(deckID, cardID, userInputs));
};

export const ADD_QUIZ_SCORE = "ADD_QUIZ_SCORE";
export const addQuizScore = (deckID, score) => ({
  type: "ADD_QUIZ_SCORE",
  deckID,
  score
});

export const handleQuizScoreAdd = (deckID, score) => dispatch => {
  dispatch(addQuizScore(deckID, score));
};
