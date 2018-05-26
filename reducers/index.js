const initialDecks = [
  {id: 1,
    shortName: "Deck 1",
    description: "Deck of random cards",
    cards: [
      {id:11,
        question: "What is your favorite color?",
        answer: "Blue"},
      {id:12,
        question: "What is your quest?",
        answer: "To seek the Holy Grail"}
    ]
  },
  {id: 2,
    shortName: "Deck 2",
    description: "Deck of more random cards",
    cards: [
      {id:21,
        question: "What is your favorite sport?",
        answer: "Basketball"},
      {id:22,
        question: "What is Michael Jordans jersey number?",
        answer: "23"}
    ]
  },
  {id: 3,
    shortName: "1234567890123456...",
    description: "LongLongDescription",
    cards: []
  }
]

function decks (state = initialDecks, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default decks;
