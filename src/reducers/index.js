import uuidv1 from "uuid";

const initialDecks = [
  {
    id: uuidv1(),
    shortName: "Deck 1",
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
    ]
  },
  {
    id: uuidv1(),
    shortName: "Deck 2",
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
    ]
  },
  {
    id: uuidv1(),
    shortName: "1234567890123456...",
    description: "LongLongDescription",
    cards: []
  }
];

function decks(state = initialDecks, action) {
  switch (action.type) {
    case "ADD_DECK": {
      let newDecks = [...state];
      let { shortName, description } = action.userInputs;
      let deck = {
        id: uuidv1(),
        shortName: shortName,
        description: description,
        cards: []
      }

      newDecks.push(deck);
      // Update the backend DB while you're at it.

      return newDecks;
    }

    case "DELETE_DECK": {
      let newDecks = state.filter(entry => {
        return entry.id !== action.deckID;
      });
      // Update the backend DB while you're at it.

      return newDecks;
    }

    case "ADD_CARD": {
      let newDecks = JSON.parse(JSON.stringify(state));
      let deckToEdit = newDecks.find(deck => {
        return deck.id === action.deckID;
      });

      if(deckToEdit) {
        let { question, answer } = action.userInputs;
        let newCard = {
          id: uuidv1(),
          question: question,
          answer: answer
        }
        deckToEdit.cards.push(newCard);
      // Update the backend DB while you're at it.
      return newDecks;
      }
      else {
        return state;
      }
    }

    default:
      return state;
  }
}

export default decks;
