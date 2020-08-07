import produce from 'immer';

const INITIAL_STATE = {
    plan: [],
    loading: false,
};

export default function plan(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@plan/STORE_IN_REQUEST':
                draft.loading = true;
                break;
            case '@plan/STORE_IN_SUCCESS':
                draft.data = action.payload;
                draft.loading = false;
                break;
            case '@plan/STORE_FAILURE':
                draft.loading = false;
                break;
            case '@plan/UPDATE_IN_REQUEST':
                draft.loading = true;
                draft.plan = action.payload;
                break;
            case '@plan/UPDATE_IN_SUCCESS':
                draft.loading = false;
                draft.plan = action.payload;
                break;
            case '@plan/UPDATE_FAILURE':
                draft.loading = false;
                break;
            case '@plan/DELETE_IN_REQUEST':
                draft.loading = true;
                draft.plan = action.payload;
                break;
            case '@plan/DELETE_IN_SUCCESS':
                draft.loading = false;
                draft.plan = action.payload;
                break;
            case '@plan/DELETE_FAILURE':
                draft.loading = false;
                break;
            default:
        }
    });
}
