import React from 'react';
import PropTypes from "prop-types";

class MovieCard extends React.Component {
    render() {
        const {voteAverage, voteCount, size, backgroundImage, title, release} = this.props;

        return (
            <div className="movie-card">
                <div className={`mc-image ${size}`}
                     style={{ backgroundImage: `url(${backgroundImage})`}} />
                <div className="mc-content">
                    <div className="mc-title-info flex-row">
                        <h2 className={`mc-title ${size}`}>{title.substr(0, 20)} {title.length > 20 && '...'}</h2>
                        <p className="mc-publish">{release.substr(0, 4)}</p>
                    </div>
                    <div className="mc-vote-info flex-row">
                        <div className="flex-row">
                            <img className="mc-rate-svg" src="/images/star.svg" alt=""/>
                            <p>{voteAverage}</p>
                        </div>
                        <p>( {voteCount} )</p>
                    </div>
                </div>
            </div>
        )
    }
}

MovieCard.prototypes = {
    data: PropTypes.shape({}).isRequired,
    backdropClasses: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    release: PropTypes.string.isRequired,
    voteAverage: PropTypes.number.isRequired,
    voteCount: PropTypes.number.isRequired
}

MovieCard.defaultProps = {
    backdropClasses: '',
    ds: ''
}

export default MovieCard;