export function storeInRequest(data) {
    return {
        type: '@plan/STORE_IN_REQUEST',
        payload: data,
    };
}

export function storeInSuccess(data) {
    return {
        type: '@plan/STORE_IN_SUCCESS',
        payload: data,
    };
}

export function storeInFailure() {
    return {
        type: '@plan/STORE_IN_FAILURE',
    };
}

export function updateInRequest(data) {
    return {
        type: '@plan/UPDATE_IN_REQUEST',
        payload: data,
    };
}

export function updateInSuccess(data) {
    return {
        type: '@plan/UPDATE_IN_SUCCESS',
        payload: data,
    };
}

export function updateInFailure() {
    return {
        type: '@plan/UPDATE_IN_FAILURE',
    };
}

export function deleteInRequest(data) {
    return {
        type: '@plan/DELETE_IN_REQUEST',
        payload: data,
    };
}

export function deleteInSuccess(data) {
    return {
        type: '@plan/DELETE_IN_SUCCESS',
        payload: data,
    };
}

export function deleteInFailure() {
    return {
        type: '@plan/DELETE_IN_FAILURE',
    };
}
