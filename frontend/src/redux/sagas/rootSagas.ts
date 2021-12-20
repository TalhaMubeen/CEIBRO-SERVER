import { all } from "@redux-saga/core/effects";
import projectSaga from './project.sagas'

export default function* rootSaga() {
    yield all([
        projectSaga()
    ])
    // code after all-effect
  }