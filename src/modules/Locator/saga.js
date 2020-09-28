import {put, call, takeEvery, select} from 'redux-saga/effects';
import * as Actions from './constants';

import {getLocation} from './service';

/**
 * Fetch data saga
 * @returns {IterableIterator<*>}
 */
function* fetchLocationSaga() {
  try {
    // const query = {
    //   lang: lang,
    // };
    console.log('Saga')
     const data = yield call(getLocation);
     console.log('data of location', data )
     yield put({type: Actions.GET_LOCATION_SUCCESS, payload: data});
  } catch (e) {
    yield put({type: Actions.GET_LOCATION_ERROR, error: e});
  }
}

// function* callLocationSaga(action) {
//     try {
//         const data = yield call(action.payload);
//       console.log('callSetLocation Saga',data)
//        yield put({type: Actions.SET_LOCATION, payload: data});
//     } catch (e) {
//       yield put({type: Actions.SET_LOCATION_ERROR, error: e});
//     }
//   }


function* LocationSaga() {
  yield takeEvery(Actions.GET_LOCATION, fetchLocationSaga);
//   yield takeEvery(Actions.SET_LOCATION, callLocationSaga );
}

export default LocationSaga