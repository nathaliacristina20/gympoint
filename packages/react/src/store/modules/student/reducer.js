import produce from 'immer';

const INITIAL_STATE = {
    data: [],
    loading: false,
};

export default function student(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@student/SHOW_IN_REQUEST':
                draft.loading = true;
                break;
            case '@student/SHOW_IN_SUCCESS':
                draft.data = action.response;
                draft.loading = false;
                break;
            case '@student/SHOW_FAILURE':
                draft.loading = false;
                break;
            default:
        }
    });
}
