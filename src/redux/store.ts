import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/index";
import { composeWithDevTools } from 'redux-devtools-extension';
import "regenerator-runtime/runtime";
import rootSaga from './sagas/rootSagas'

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);


sagaMiddleware.run(rootSaga);

export default store;
