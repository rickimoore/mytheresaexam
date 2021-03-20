import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class CartSection extends React.Component {
    render() {
        const {data, title, imgSrc, deleteActionFn} = this.props;
        return (
            <div>
                <div className="cart-section">
                    <p>{title}</p>
                </div>
                <ul className="cart-list">
                    {
                        data.map((item, index) => (
                            <li key={index}>
                                <div className="flex-row justify-apart">
                                    <div className="flex-row">
                                        {imgSrc && (<img className="cart-icon" src={imgSrc} alt=""/>)}
                                        <span>{item.name}</span>
                                    </div>
                                    <img onClick={() => deleteActionFn(item.id)} className="cart-delete" src="/images/remove.svg" alt=""/>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}

CartSection.prototypes = {
    data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    title: PropTypes.string.isRequired,
    imgSrc: PropTypes.string,
    deleteActionFn: PropTypes.func.isRequired,
}

export default connect()(CartSection);
