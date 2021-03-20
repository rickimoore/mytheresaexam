import React from 'react';
import PropTypes from 'prop-types';

class CarouselItem extends React.Component {
    render() {
        const {children} = this.props;
        return (
            <div className="carousel-item">
                {children}
            </div>
        )
    }
}

CarouselItem.prototypes = {
    children: PropTypes.element.isRequired
}

export default CarouselItem;