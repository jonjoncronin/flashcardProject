export const ADD_DECK = "ADD_DECK";
export const addDeck = userInputs => ({
  type: "ADD_DECK",
  userInputs
});

export const handleDeckAdd = userInputs => dispatch => {
  dispatch(addDeck(userInputs));
};
