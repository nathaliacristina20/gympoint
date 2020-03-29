import produce from 'immer';

const INITIAL_STATE = [
    { route: '/alunos', label: 'Alunos', active: true },
    { route: '/planos', label: 'Planos', active: false },
    { route: '/matriculas', label: 'Matriculas', active: false },
    { route: '/auxilio', label: 'Pedidos de Auxilio', active: false },
];

export default function breadcrumbs(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@header/BREADCRUMBS_IN_REQUEST':
                break;
            case '@header/BREADCRUMBS_IN_SUCCESS':
                draft.data = action.payload;
                draft.signed = true;
                draft.loading = false;
                break;
            case '@header/BREADCRUMBS_IN_FAILURE':
                draft.loading = false;
                break;
            default:
        }
    });
}
