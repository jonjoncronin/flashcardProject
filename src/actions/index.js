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

export const ADD_CARD = "ADD_CARD";
export const addCard = (deckID, userInputs) => ({
  type: "ADD_CARD",
  deckID,
  userInputs
});

export const handleCardAdd = (deckID, userInputs) => dispatch => {
  dispatch(addCard(deckID, userInputs));
};
