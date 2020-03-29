export function showInRequest() {
    return {
        type: '@student/SHOW_IN_REQUEST'
    };
}

export function showInSuccess(data) {
    return {
        type: '@student/SHOW_IN_SUCCESS',
        response: data,
    };
}

export function showInFailure() {
    return {
        type: '@student/SHOW_IN_FAILURE',
    };
}
