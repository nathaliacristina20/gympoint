import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { storeInSuccess, storeInFailure, updateInSuccess, updateInFailure, deleteInSuccess, deleteInFailure } from './actions';
import history from '~/services/history';

export function* store({ payload }) {
    try {
        const response = yield call(api.post, 'plans', payload);
        if (response) {
            yield put(storeInSuccess(payload));
            toast.success('Registro salvo!');
            history.push('/planos');
        }
    } catch (err) {
        toast.error(err.response.data.error);
        yield put(storeInFailure());
    }
}

export function* update({ payload }) {

    try {
        const response = yield call(api.put, `plans/${payload.id}`, payload);
        if (response) {
            yield put(updateInSuccess(payload));
            toast.success('Registro atualizado!')
            history.push('/planos');
        }
    } catch (err) {
        toast.error(err.response.data.error);
        yield put(updateInFailure());
    }
}

export function* remove({ payload }) {

    try {

        const response = yield call(api.delete, `plans/${payload.id}`, payload);

        if (response) {
            yield put(deleteInSuccess(payload));
            toast.success('Registro deletado!')
            history.push('/planos');
        }

    } catch (err) {
        toast.error(err.response.data.error);
    }

}
export default all([
    takeLatest('@plan/STORE_IN_REQUEST', store),
    takeLatest('@plan/UPDATE_IN_REQUEST', update),
    takeLatest('@plan/DELETE_IN_REQUEST', remove),
]);
