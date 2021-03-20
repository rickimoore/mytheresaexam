import React from 'react';
import PropTypes from 'prop-types';

class CarouselControl extends React.Component {
    render() {
        const {actionFn, classes, imgSrc} = this.props;
        return (
            <div onClick={() => actionFn()} className={`carousel-control ${classes}`}>
                <div className="control-content flex-center">
                    <div className="control-backdrop"/>
                    <img className="carousel-arrow" src={imgSrc} alt=""/>
                </div>
            </div>
        )
    }
}

CarouselControl.propTypes = {
    actionFn: PropTypes.func.isRequired,
    classes: PropTypes.string,
    imgSrc: PropTypes.string.isRequired
}

export default CarouselControl;