import React from "react";
import {connect} from "react-redux";
import getCookie from "../helpers/getCookie";
import {persistCartData} from "../redux/actions";

class PersistCart extends React.Component {
    componentDidMount() {
        const cookie = getCookie("shop-cart");

        if(!cookie) return;
        const {dispatch} = this.props;
        const data = JSON.parse(cookie);

        dispatch(persistCartData({data}))
    }
    render() {
        return null;
    }
}

export default connect()(PersistCart);