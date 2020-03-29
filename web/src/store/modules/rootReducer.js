import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import header from './header/reducer';
import student from './student/reducer';
import plan from './student/reducer';
import helpOrders from './helpOrders/reducer';

export default combineReducers({
    auth,
    user,
    header,
    student,
    plan,
    helpOrders
});
