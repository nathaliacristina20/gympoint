import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import header from './header/sagas';
import student from './student/sagas';
import plan from './plan/sagas';
import helpOrders from './helpOrders/sagas';

export default function* rootSaga() {
    return yield all([auth, header, user, student, plan, helpOrders, ]);
}
