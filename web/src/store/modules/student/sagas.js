import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { showInSuccess, showInFailure } from './actions';
import history from '~/services/history';

export function* show() {
    try {
        const response = yield call(api.get, 'students');

        if (response) {
            yield put(showInSuccess(response.data));
        }
    } catch (err) {
        toast.error(err.response.data.error);
        yield put(showInFailure());
    }
}

export default all([
    takeLatest('@student/SHOW_IN_REQUEST', show),
]);
