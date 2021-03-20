import { ActionTypes as types } from './types';

//Movie Data
export const addItemToCart = payload => ({ type: types.ADD_TO_CART, ...payload });
export const removeItemFromCart = payload => ({type: types.REMOVE_FROM_CART, ...payload});
export const persistCartData = payload => ({type: types.PERSIST_CART_DATA, ...payload});