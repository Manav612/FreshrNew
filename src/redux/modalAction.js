import { HIDE_MODAL, SHOW_MODAL } from "./Constant";

export const showModal = (orderData) => ({
    type: SHOW_MODAL,
    payload: orderData,
});

export const hideModal = () => ({
    type: HIDE_MODAL,
});