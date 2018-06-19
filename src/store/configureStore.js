import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers";

/**
 * A function to configure and create the Redux Store used by the application.
 * Pulls together all the reducers as well as the applies thunk middle ware for
 * asynchronous calls to Redux dispatched functions and Redux dev tools so that
 * we can debug the Redux store.
 * @return {Redux Store}
 */
export default function configureStore() {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
}
