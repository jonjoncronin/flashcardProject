import uuidv1 from "uuid";
import * as DecksAPI from "../utils/dbApi";
import { AsyncStorage } from "react-native";

/**
 * Reducer for the decks state variable.
 * @param  {Array}  [state=[]]
 * @param  {[type]} action
 * @return {Array}  the updated decks state variable
 */
function decks(state = [], action) {
  switch (action.type) {
    case "RECEIVE_DECKS": {
      return action.decks;
    }

    case "ADD_DECK": {
      let newDecks = [...state];
      let { title, description } = action.userInputs;
      let deck = {
        id: uuidv1(),
        title: title,
        description: description,
        cards: [],
        scores: []
      };

      newDecks.push(deck);
      // Update the backend DB while you're at it.
      DecksAPI.updateDecks(newDecks);

      return newDecks;
    }

    case "DELETE_DECK": {
      let newDecks = state.filter(entry => {
        return entry.id !== action.deckID;
      });
      // Update the backend DB while you're at it.
      DecksAPI.updateDecks(newDecks);

      return newDecks;
    }

    case "EDIT_DECK": {
      let newDecks = [...state];
      let { title, description } = action.userInputs;
      let deckToEdit = newDecks.findIndex(entry => {
        return entry.id === action.deckID;
      });

      newDecks[deckToEdit].title = title;
      newDecks[deckToEdit].description = description;
      // Update the backend DB while you're at it.
      DecksAPI.updateDecks(newDecks);
      return newDecks;
    }

    case "ADD_CARD": {
      let newDecks = JSON.parse(JSON.stringify(state));
      let deckToEdit = newDecks.find(deck => {
        return deck.id === action.deckID;
      });

      if (deckToEdit) {
        let { question, answer } = action.userInputs;
        let newCard = {
          id: uuidv1(),
          question: question,
          answer: answer
        };
        deckToEdit.cards.push(newCard);
        // Update the backend DB while you're at it.
        DecksAPI.updateDecks(newDecks);
        return newDecks;
      } else {
        return state;
      }
    }

    case "DELETE_CARD": {
      let newDecks = JSON.parse(JSON.stringify(state));
      let deckToEdit = newDecks.find(deck => {
        return deck.id === action.deckID;
      });

      if (deckToEdit) {
        deckToEdit.cards = deckToEdit.cards.filter(entry => {
          return entry.id !== action.cardID;
        });
        // Update the backend DB while you're at it.
        DecksAPI.updateDecks(newDecks);
        return newDecks;
      } else {
        return state;
      }
    }

    case "EDIT_CARD": {
      let newDecks = JSON.parse(JSON.stringify(state));
      let deckToEdit = newDecks.find(deck => {
        return deck.id === action.deckID;
      });

      if (deckToEdit) {
        let cardToEdit = deckToEdit.cards.find(card => {
          return card.id === action.cardID;
        });
        if (cardToEdit) {
          cardToEdit.question = action.userInputs.question;
          cardToEdit.answer = action.userInputs.answer;
          // Update the backend DB while you're at it.
          DecksAPI.updateDecks(newDecks);
          return newDecks;
        } else {
          return state;
        }
      } else {
        return state;
      }
    }

    case "ADD_QUIZ_SCORE": {
      let newDecks = JSON.parse(JSON.stringify(state));
      let deckToEdit = newDecks.find(deck => {
        return deck.id === action.deckID;
      });

      if (deckToEdit) {
        let { correct, total } = action.score;
        let newScore = {
          id: uuidv1(),
          correct: correct,
          total: total
        };
        deckToEdit.scores.unshift(newScore);
        if (deckToEdit.scores.length > 3) {
          deckToEdit.scores.pop();
        }
        // Update the backend DB while you're at it.
        DecksAPI.updateDecks(newDecks);
        return newDecks;
      } else {
        return state;
      }
    }

    default:
      return state;
  }
}

export default decks;
