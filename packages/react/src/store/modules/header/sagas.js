import { takeLatest, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { breadcrumbsInRequest } from './actions';

export function* index({ payload }) {
    try {
        yield put(breadcrumbsInRequest(payload));
    } catch (err) {
        toast.error(`erro`);
        // yield put(storeInFailure(err));
    }
}

export default all([takeLatest('@header/BREADCRUMBS_IN_REQUEST', index)]);
