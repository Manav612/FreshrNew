// src/redux/modalReducer.js
const initialState = {
    isVisible: false,
    orderData: null,
};

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_MODAL':
            return {
                ...state,
                isVisible: true,
                orderData: action.payload,
            };
        case 'HIDE_MODAL':
            return {
                ...state,
                isVisible: false,
                orderData: null,
            };
        default:
            return state;
    }
};

export default modalReducer;