import React from "react";
import {connect} from "react-redux";
import {CAROUSEL_TYPES} from "../../helpers/constants";
import CartSection from "./CartSection";
import {removeItemFromCart} from "../../redux/actions";
import setCookie from "../../helpers/setCookie";


class NavBarCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModal: false
        }
    }

    openModal = () => {
        this.setState({isOpenModal: true})
    }
    closeModal = () => {
        this.setState({isOpenModal: false})
    }
    renderModal = () => {
        const {cart} = this.props;
        const wishList  = cart.filter(item => item.category === CAROUSEL_TYPES.UPCOMING);
        const movieList = cart.filter(item => item.category === CAROUSEL_TYPES.POPULAR)
        const tvList = cart.filter(item => item.category === CAROUSEL_TYPES.TV);
        return (
            <div className="cart-box">
                {
                    cart.length > 0 ? (
                        <div>
                            {wishList.length > 0 && <CartSection  deleteActionFn={this.removeItem} title={"Wish List"} imgSrc="/images/schedule.svg" data={wishList}/>}
                            {movieList.length > 0 && <CartSection  deleteActionFn={this.removeItem} title={"Movies"} data={movieList}/>}
                            {tvList.length > 0 && <CartSection deleteActionFn={this.removeItem} data={tvList}/>}
                        </div>

                    ) : (
                        <div className="empty-cart flex-column-center">
                            <img className="cart-logo" src="/images/cart.svg" alt=""/>
                            <span>Empty Cart</span>
                        </div>
                    )
                }
                <div onClick={this.closeModal} className="close-cart">close</div>
            </div>
        )
    }
    removeItem = id => {
        this.removeFromCart(id).then(() => {
            setCookie(document,"shop-cart", JSON.stringify(this.props.cart), 60);
        })
    }
    removeFromCart = id => new Promise(resolve => {
        const {dispatch} = this.props;
        dispatch(removeItemFromCart({id}));
        resolve();
    })
    render() {
        const {isOpenModal} = this.state;
        const {cart} = this.props;
        return (
            <div className="cart-container">
                <div onClick={this.openModal} className="cart-btn flex-center">
                    <img className="cart-logo" src="/images/cart.svg" alt=""/>
                    <div>
                        <span>({cart.length}) Items </span>
                    </div>
                </div>
                {
                    isOpenModal && this.renderModal()
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    cart: state.shoppingCart.bucket,
});

export default connect(mapStateToProps)(NavBarCart);