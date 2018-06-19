import { AsyncStorage } from "react-native";
import uuidv1 from "uuid";

export const DECKS_STORAGE_KEY = "flashCard:decks";

//==============================================================================
/**
 * A dummy set of decks to be used for debugging and development
 * @type {Array}
 */
const storeDecks = [
  {
    id: uuidv1(),
    title: "Store Deck 1",
    description: "Deck of random cards",
    cards: [
      {
        id: uuidv1(),
        question: "What is your favorite color?",
        answer: "Blue"
      },
      {
        id: uuidv1(),
        question: "What is your quest?",
        answer: "To seek the Holy Grail"
      }
    ],
    scores: []
  },
  {
    id: uuidv1(),
    title: "Store Deck 2",
    description: "Deck of more random cards",
    cards: [
      {
        id: uuidv1(),
        question: "What is your favorite sport?",
        answer: "Basketball"
      },
      {
        id: uuidv1(),
        question: "What is Michael Jordans jersey number?",
        answer: "23"
      }
    ],
    scores: []
  }
];

// Setup the AsyncStorage data/file with the decks data
AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(storeDecks));
// AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify([]));
//==============================================================================

/**
 * Simple API to get the data from the decks AsyncStorage data/file.
 * @return {Array} an array of decks stored in AsyncStorage
 */
export const getAllDecks = () =>
  AsyncStorage.getItem(DECKS_STORAGE_KEY).then(res => JSON.parse(res));

/**
 * Simple API to store data in the decks AsyncStorage data/file.
 * @param  {Array} newDecks an array of decks to store
 */
export const updateDecks = newDecks => {
  console.log("DecksAPI updateDecks: ", newDecks);
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(newDecks));
};
