import React from 'react';
import PropTypes from "prop-types";

class JumboTron extends React.Component {
    render() {
        const {imgSrc, headline, subLine} = this.props;
        return (
            <div className="jumbo-container flex-column-center" style={{ backgroundImage: `url(${imgSrc})`}}>
                <div className="jumbo-backdrop"/>
                <div className="jumbo-text">
                    {headline && <h1 className="jumbo-headline">{headline}</h1>}
                    {subLine && <p>{subLine}</p>}
                </div>
            </div>
        )
    }
}

JumboTron.prototypes = {
    imgSrc: PropTypes.string.isRequired,
    headline: PropTypes.string,
    subLine: PropTypes.string
}

export default JumboTron;