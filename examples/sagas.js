import { put, call, takeEvery } from 'redux-saga/effects'
// import { ACTION_TYPE } from './constants';
import request from './request';

const FETCH_URL = 'http://localhost:3000/people';

function* getFilesSuccess(action) {
    try {
        const requesturl = `${FETCH_URL}`;
        const response = yield call(request, requesturl);
        // yield put({
        //     type: ACTION_TYPE.FILES_ACTIONS.ADD_FETCH,
        //     response: response
        // });
    }
    catch(e){
        console.log("error");
    }
}

function* watchSaga() {
    // yield takeEvery(ACTION_TYPE.FILES_ACTIONS.FETCH_FILES, getFilesSuccess)
}


export default function* rootSaga() {
    yield [
        watchSaga(),
    ]
}