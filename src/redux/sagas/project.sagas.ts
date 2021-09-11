import { put, takeLatest } from 'redux-saga/effects'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser() {
   try {
      yield put({type: "USER_FETCH_SUCCEEDED"});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED"});
   }
}

function* projectSaga() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
}

export default projectSaga;