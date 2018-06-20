<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Summary](#summary)
- [Requirements](#requirements)
	- [Application Setup](#application-setup)
	- [Application Functionality](#application-functionality)
	- [Code Quality](#code-quality)
- [High Level Design](#high-level-design)
	- [Design Decisions vs Requirements](#design-decisions-vs-requirements)
		- [Quiz View](#quiz-view)
		- [New Deck Input](#new-deck-input)
- [Non React-Native packages](#non-react-native-packages)
	- [react-redux/Redux](#react-reduxredux)
	- [react-native-base/NativeBase](#react-native-basenativebase)
	- [react-navigation/React Navigation](#react-navigationreact-navigation)
	- [uuid](#uuid)
- [Screens](#screens)
	- [DecksView - /src/screens/DecksView.js](#decksview-srcscreensdecksviewjs)
	- [DeckDetails - /src/screens/DeckDetails.js](#deckdetails-srcscreensdeckdetailsjs)
	- [DeckInput - /src/screens/DeckInput.js](#deckinput-srcscreensdeckinputjs)
	- [DeckEdit - /src/screens/DeckEdit.js](#deckedit-srcscreensdeckeditjs)
	- [CardDetails - /src/screens/CardDetails.js](#carddetails-srcscreenscarddetailsjs)
	- [CardInput - /src/screens/CardInput.js](#cardinput-srcscreenscardinputjs)
	- [CardEdit - /src/screens/CardEdit.js](#cardedit-srcscreenscardeditjs)
	- [QuizView - /src/screens/QuizView.js](#quizview-srcscreensquizviewjs)
- [Components](#components)
	- [App - /App.js](#app-appjs)
	- [Setup - /src/boot/Setup.js](#setup-srcbootsetupjs)
	- [FlashQuizApp - /src/FlashQuizApp.js](#flashquizapp-srcflashquizappjs)
- [Reducers and Actions](#reducers-and-actions)
	- [Store - /src/store/configureStore.js](#store-srcstoreconfigurestorejs)
	- [Decks Actions - /src/actions/index.js](#decks-actions-srcactionsindexjs)
		- [fetchDecks()](#fetchdecks)
	- [Decks Reducers - /src/reducers/index.js](#decks-reducers-srcreducersindexjs)
- [Utils](#utils)
	- [DecksAPI - /src/utils/dbAPI.js](#decksapi-srcutilsdbapijs)
	- [Notifications Helpers - /src/utils/notificationsHelpers.js](#notifications-helpers-srcutilsnotificationshelpersjs)
- [Usage](#usage)

<!-- /TOC -->
# Summary
The Flashcard project is a React Native mobile application that allows users to
study a collection of "flashcards". This application will allow users to create
different categories of flashcards called "decks", add "cards" to those decks,
then take quizzes on those decks.

This project encompasses the fundamental aspects of building a native
application including handling infinite lists, routing, and user input. It is
the 3rd project laid out in the curriculum for the Udacity React Nanodegree.

# Requirements
## Application Setup
* Installation and Setup
  - The application requires only yarn install and yarn start to install and
    launch. npm can be used in place of yarn.
* Documentation
  - A README is included with the project. The README includes clear
    instructions for installing and launching the project.

## Application Functionality
* Deck List View as initial view
  - The primary view, seen when the app loads, is a list of created decks which
    includes the name of each deck and the number of cards.
* Deck List View routes to Deck details
  - Pressing on a deck in the list should generate an animation, and the app
    should route to an individual deck view.
* Deck Details are correct
  - view includes the deck title
  - view includes number of cards in the deck
  - view includes option to start a quiz for that deck
  - view includes option to add a new question to the deck
* Deck Details routes to Card Input and Quiz View
  - Pressing the 'Start a Quiz' or 'Add Card' button properly routes to the
    correct views for those activities.
* New Card Input
  - The New Question view includes a form with fields for a question and answer,
    and a submit button.
  - Submitting the form correctly adds the question to the deck.
* Quiz View
  - The Quiz view starts with a question from the selected deck.
  - The question is displayed, along with a button to show the answer.
  - Pressing the 'Show Answer' button displays the answer.
  - Buttons are included to allow the student to mark their guess as 'Correct'
    or 'Incorrect'
  - The view displays the number of questions remaining.
  - When the last question is answered, a score is displayed. This can be
    displayed as a percentage of correct answers or just the number of questions
    answered correctly.
  - When the score is displayed, buttons are displayed to either start the quiz
    over or go back to the Individual Deck view.
  - Both the 'Restart Quiz' and 'Back to Deck' buttons route correctly to their
    respective views.
* New Deck Input
  - The view includes a form for creating a new deck - which should just be an
    input for the title and a 'Create Deck' button.
  - Pressing the button correctly creates the deck and routes the user to the
    Individual Deck view for the new deck.
* Local Notifications
  - Logic for notification has been implemented. Notifications are generated at
    a specific time if the user hasn't completed at least one quiz for that day.
* iOS and Android support
  - The app works correctly in either Android OR iOS devices (or emulator).
  - Project README identifies which platform(s) have been tested.

## Code Quality
* Application Structure
  - The app works correctly in either Android OR iOS devices (or emulator).
* Compiles and runs
  - Project README identifies which platform(s) have been tested.

# High Level Design
The FlashQuiz Application is a mobile application that allows users to create
different decks along with cards for those decks. Cards contain a question and
answer. The user can initiate a Quiz on a deck that will allow them to swipe
through the cards in a deck, marking them with a 'correct' or 'incorrect' score.
The application will maintain a list of the last 3 quiz scores per deck as well
as persist decks, their cards and quiz results on storage local to the device.
Lastly the application will remind the user everyday (if they haven't already)
to take a FlashQuiz via local notifications.

The application uses the React Native Javascript framework to allow a mostly
platform independent implementation. Further it uses Redux to manage and
maintain application state information that can be referenced independently by
the various components that make up the application.

## Design Decisions vs Requirements
### Quiz View
With the QuizView using a FlatList component I was able to add a swipeable
control to the quiz so that the user could swipe between the current card, the
previous card, or the next card. The scoring controls to mark their guess as
'correct' or 'incorrect' are included in the card component being rendered. With
the usability/capability for the user to go back to previous cards and change
their score, it seemed easier to include a 'finished' button that the user could
touch to indicate the were done with the quiz rather than deal with the
complicated logic of determining a quiz was complete when all cards had a score
marked.

### New Deck Input
With the way that I implemented my reducers I felt it was better to
route the user back to the Decks view after a new deck was added. The design
of the reducer for adding new deck includes setting a UUID field of a 'deck'
object. I felt it was a better design to keep all of the 'deck' object
fields that weren't related to user input - the title and description - out
of the frontend code and more in the middleware or backend.

# Non React-Native packages
## react-redux/Redux
The Redux package allows for application state management in a centralized
architecture. All application state is maintained in a store as well as reducers
to modify that state. Application components can register to listen for changes
to that state as well as gain access to the modification functions from the
central store. This reduces the complexity of embedding state information and
functions as props from parent to child components throughout the application.

## react-native-base/NativeBase
The NativeBase package is a UI component kit for React Native applications.
It allows for quicker prototyping of a react native application as the
developer doesn't have to worry about building out components that are fairly
common across all mobile applications.

## react-navigation/React Navigation
The React Navigation package is a routing and navigation component package that
allows a developer to quickly add screen navigation and routing to their
application. It is the suggested Navigation component by the React Native
documentation.

## uuid
The uuid package simply provides an API to generate RFC 4122 compliant UUIDs.

# Screens
The FlashQuiz application uses a React Navigation StackNavigator component to
route or navigate between screens. From an implementation organizational
perspective, components that define screens were placed in the /src/screens/
directory and are responsible for pulling all the components together needed
for that specific screen.
## DecksView - /src/screens/DecksView.js
The DecksView Screen is the initial screen that appears when the application
is opened. This screen lists all the decks that the application is currently
aware. From this screen a user can select a specific Deck to drill down for
more details or they can add a new deck.

## DeckDetails - /src/screens/DeckDetails.js
The DeckDetails Screen is reachable from the DecksView screen and displays the
details of a specific deck for the user. Details include -
* Deck title
* Deck description
* Upto the last 3 quiz scores
* the number of questions and the questions themselves

Additionally from this screen the user can select a question to drill down for
more details on that question, can edit the deck (title and description), delete
a deck, add a question/card to a deck, and start a quiz on the deck.

## DeckInput - /src/screens/DeckInput.js
The DeckInput Screen is reachable from the DecksView screen and displays the
input form to add a new deck. The user can input a Deck title and Deck
description.  
**NOTE: Currently there is no input validation. A deck can be added without a
title or a description.**

## DeckEdit - /src/screens/DeckEdit.js
The DeckEdit Screen is reachable from the DeckDetails screen and displays the
input form to edit an existing deck. The user can change the Deck title and
Deck description.

## CardDetails - /src/screens/CardDetails.js
The CardDetails Screen is reachable from the DeckDetails screen and displays the
details of a specific card for the user. Details include simply the question and
answer.

Additionally from this screen the user can edit the card or delete it from the
deck.

## CardInput - /src/screens/CardInput.js
The CardInput Screen is reachable from the DeckDetails screen and displays the
input for to add a new card/question. The user can input a Card question and a
Card answer.  
**Note: Currently there is no input validation. A card can be added without a
question or an answer.**

## CardEdit - /src/screens/CardEdit.js
The CardEdit Screen is reachable from the CardDetails screen and displays the
input form to edit an existing card. The user can change the Card question and
Card answer.

## QuizView - /src/screens/QuizView.js
The QuizView Screen is reachable from the DeckDetails screen and displays a
swipeable list of the cards in the deck. Further it maintains the user inputed
scores as state that will get updated to the application state keeping track of
'decks' when a quiz is 'finished'.

The QuizView is using a FlatList component for the swipeable control of cards.
The FlatList requires a list of items to 'list' and a renderItem function
implementing how those list items will be rendered. The renderItem function is
using a QuizCard component which is described in the sections below.

The QuizView additionally has a 'finish' button that the user can touch to
indicate they are done with the quiz. Upon touching the 'finish' button an Alert
will pop up to the user. If all of the cards have been marked with a score, the
Alert will indicate to the user that they finished the quiz and display the
marked score. The score will be updated on the application state keeping track
of 'decks' upon the user acknowledging the Alert. If there are cards missing a
score in the quiz, the Alert will warn the user that they haven't finished
marking the quiz. If acknowledge and ignored the scores will not be updated in
the application state. If acknowledged and addressed, the user will simply
cancel the Alert and be returned to the QuizView they were currently working
with.

# Components
## App - /App.js
The App is the top level component representing the application. Following the
pattern demonstrated by the NativeBase.io team, the implementation allows a
'setup' of the application before getting React Native to actually start working
on the underlying components that make up the application. The top level App
component simply wraps a Setup component which itself wraps some application
preloading and then the actual FlashQuizApp component.

## Setup - /src/boot/Setup.js
The Setup is a component which handles some application preloading that is
required to use NativeBase UI kit components. In this case it preloads some
fonts that are required.

## FlashQuizApp - /src/FlashQuizApp.js
The FlashQuizApp is a component that really represents the application. It is
within this file that the Redux store is created, as well as the StackNavigator
is created which maintains the application navigation capabilities.

# Reducers and Actions
## Store - /src/store/configureStore.js
The Redux store is created and used in the FlashQuizApp. The configureStore()
function defined in this file is what pulls all the reducers and required
middleware together that makes up the Redux Store.

The Store is basically maintaining an array of decks for the entire application.

## Decks Actions - /src/actions/index.js
The decks state variable is an array of decks. A 'deck' object keeps track of
a title, a description, a list of cards, and a small list of quiz scores. Decks
can be added, deleted, modified. Cards can be added to, delete from, modified
on a deck. Quiz scores can be added to a deck.

### fetchDecks()
Upon index.js being loaded by the application, this fetchDecks API will be
invoked. In turn the local file system will be queried via an AsyncStorage API
to get all the decks. The resultant list of decks will be stored in the
application state being maintained in the Redux Store.

## Decks Reducers - /src/reducers/index.js
As most of the actions fall under the umbrella of create, update, delete (CRUD)
and the local file system maintaining persistent storage needs to be updated in
addition to the decks state array being updated, there is a common pattern for
the actions being processed by the decks reducer. For each action the reducer
will copy the existing state, update it, call the decksAPI to update the local
storage, then return the updated copy of the decks array as state to the caller.
Below is the list of actions that are defined as action creators in index.js and
for which the reducer will process.
* RECEIVE_DECKS
* ADD_DECK
* DELETE_DECK
* EDIT_DECK
* ADD_CARD
* DELETE_CARD
* EDIT_CARD
* ADD_QUIZ_SCORE

# Utils
## DecksAPI - /src/utils/dbAPI.js
The DecksAPI is a very simply wrapper for the AsyncStorage calls needed to
store application state on the local filesystem. This allows the application
to be closed and reopened without losing deck information.

## Notifications Helpers - /src/utils/notificationsHelpers.js
The NotificationHelpers set of functions is similar to the DecksAPI in that it
is a very simple wrapper for the Expo notifications package API that allows
local notification support for both Android and iOS applications. The local
notifications for the FlashQuiz app a similarly stored persistently in local
storage.

# Usage
This project assumes that you've got npm installed.

As React Native applications are applications targeted for mobile iOS and
Android devices, ultimately you will need a target specific image that can
be run on the specific target platform. Luckily there is a toolchain and
development environment that exists in the React Native community to handle
creating those images for you. This project was originally created via the
create-react-native-app tool/script. This tool/script stands up a skeleton
project via npm that incorporates a toolchain called Expo that builds iOS and
Android specific application images after each saved change you make. With that
skeleton in place I added and modified until I had a workable application.

**This project has been tested on both iOS and Android emulators as well as
physical devices.**

Again, since the target platforms are iOS and Android you will an emulator that
can run the image and allow you to play. I will assume that you've also got
Xcode (if you're on a Mac) and Android Studio installed as well as npm. See
create-react-native-app [documentation][1] and Expo [documentation][2] for more
details.

In order to build and run the application locally you can follow the steps
below.

1. Pull the entirety of the repo and the directory structure to your local
   machine.
2. Navigate to that directory via terminal or the command line.
3. Execute npm install
4. Execute npm start
5. Press 'a' to open Android device or emulator
6. Press 'i' to open iOS emulator

The application should automatically open in the emulator of your choosing.  
**NOTE: You may find that you will need to open the Android emulator before
attempting to actually run the app on the emulator.**

[1]: https://github.com/react-community/create-react-native-app
[2]: https://docs.expo.io/versions/v28.0.0/guides/up-and-running.html
