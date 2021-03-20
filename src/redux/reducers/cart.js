import { ActionTypes as types } from '../actions/types';

const initialState = {
    bucket: [],
};


const shoppingCart = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_TO_CART:
            return { ...state, bucket: [...[action.item], ...state.bucket]};
        case types.REMOVE_FROM_CART:
            return { ...state, bucket: state.bucket.filter(item => item.id !== action.id)}
        case types.PERSIST_CART_DATA:
            return { ...state, bucket: action.data}
        default:
            return state;
    }
};

export default shoppingCart;
