export function updateInRequest(data) {
    return {
        type: '@helpOrders/STORE_IN_REQUEST',
        payload: data,
    };
}

export function updateInSuccess(data) {
    return {
        type: '@helpOrders/STORE_IN_SUCCESS',
        payload: data,
    };
}

export function updateInFailure() {
    return {
        type: '@helpOrders/STORE_IN_FAILURE',
    };
}