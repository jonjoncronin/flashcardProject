import { AsyncStorage } from 'react-native';
import uuidv1 from "uuid";

export const DECKS_STORAGE_KEY = 'flashCard:decks';

//==============================================================================
// Setup LocalStorage of flashCard:decks data - prepopulate with dummy data for
// debugging and development
const storeDecks = [
  {
    id: uuidv1(),
    shortName: "Store Deck 1",
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
    shortName: "Store Deck 2",
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

AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(storeDecks));

//==============================================================================
export const getAllDecks = () =>
  AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(res => JSON.parse(res));

export const updateDecks = (newDecks) => {
  console.log("DecksAPI updateDecks: ", newDecks);
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(newDecks));
}

// export const getDeck = (deckID) => {
//   let storePromise = AsyncStorage.getItem(DECKS_STORAGE_KEY)
//     .then((results) => {
//       const data = JSON.parse(results);
//       deck = JSON.stringify(data[deckID]);
//       return deck;
//     });
//   return storePromise;
// }
