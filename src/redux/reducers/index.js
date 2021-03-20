import { combineReducers } from "redux";
import shoppingCart from "./cart";

const rootReducer = combineReducers({
    shoppingCart,
});

export default rootReducer;
