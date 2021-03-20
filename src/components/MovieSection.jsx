import React from 'react';
import {connect} from "react-redux";
import { withRouter, Link } from "react-router-dom";
import fetchApi from "../helpers/fetchApi";
import Carousel from "./carousel/Carousel";
import CarouselItem from "./carousel/CarouselItem";
import MovieCard from "./MovieCard";
import PropTypes from "prop-types";
import {CAROUSEL_TYPES} from "../helpers/constants";

class MovieSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: null,
            isError: false
        }
    }

    componentDidMount() {
        const {apiUrl, filterOutId} = this.props;
        fetchApi(apiUrl)
            .then(data => {
                this.setState({movies: data.results.filter(result => result.id !== filterOutId)})
            }).catch(error => {
            this.setState({isError: true})
        });
    }

    renderMovieItem = (movie, index) => {
        const {category, cardSize, type} = this.props;

        const background = `https://image.tmdb.org/t/p/original${cardSize === 'big' ? movie.backdrop_path : movie.poster_path}`;
        const title = category === CAROUSEL_TYPES.TV ? movie.original_name : movie.original_title;
        const release = category === CAROUSEL_TYPES.TV ? movie.first_air_date : movie.release_date;
        return (
            <CarouselItem key={index}>
                <Link to={{
                    pathname: `/view/${type.toLowerCase()}/${category.toLowerCase()}/${movie.id}`,
                }} className="section-movie">
                    <MovieCard voteAverage={movie.vote_average} title={title}  voteCount={movie.vote_count}
                               release={release} backgroundImage={background} size={cardSize} data={movie} />
                </Link>
            </CarouselItem>
        )
    }

    render() {
        const {movies, isError} = this.state;
        const { title, subTitle, isDisableRotate, interval, delay} = this.props;
        return (
            <div className="section-container">
                <div className="section-info">
                    <h2>{title}</h2>
                    <p>{subTitle}</p>
                </div>
                {movies && !isError ? (
                    <Carousel disabled={isDisableRotate} offset={2} interval={interval} delay={delay}>
                        {movies.map(this.renderMovieItem)}
                    </Carousel>
                ) : (
                    <div className="flex-column-center">
                        <img className="error-image" src="/images/error.svg" alt=""/>
                        <p>Opps. Something went wrong.</p>
                    </div>
                )}
            </div>
        )
    }
}

MovieSection.prototypes = {
    type: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    apiUrl: PropTypes.string.isRequired,
    cardSize: PropTypes.string.isRequired,
    imageType: PropTypes.string.isRequired,
    filterOutId: PropTypes.string,
    isDisableRotate: PropTypes.bool,
    delay: PropTypes.number
}

MovieSection.defaultProps = {
    isDisableRotate: false,
    interval: 5000,
    delay: 2000
}

export default connect()(withRouter(MovieSection));
