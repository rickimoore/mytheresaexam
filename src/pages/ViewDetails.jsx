import React from 'react';
import {connect} from "react-redux";
import Navbar from "../components/Navbar";
import JumboTron from "../components/JumboTron";
import {CAROUSEL_TYPES, LANDING_CAROUSELS, BASE_API_URL, API_KEY} from "../helpers/constants";
import MovieSection from "../components/MovieSection";
import fetchApi from "../helpers/fetchApi";
import setCookie from "../helpers/setCookie";
import {addItemToCart} from "../redux/actions";

class ViewDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            data: null,
            category: null,
            type: null
        }
    }
    componentDidMount() {
        this.fetchMovieData();
    }

    fetchMovieData = () => {
        const {type, category, id} = this.props.match.params;
        fetchApi(`${BASE_API_URL}/${type}/${id}?api_key=${API_KEY}&language=en-US`).then(data => {
            this.setState({data, category: category.toUpperCase(), type: type.toUpperCase()});
        })
    }

    componentDidUpdate(prevProps) {
        if(prevProps.match.params.id !== this.props.match.params.id) {
            this.fetchMovieData()
            window.scrollTo(0, 0);
        }
    }

    addToCart = () => new Promise((resolve) => {
        const {dispatch} = this.props;
        const {type, data, category} = this.state;
        const name = category === CAROUSEL_TYPES.TV ? data.original_name : data.original_title;

        const item = {category, id: data.id , name , url: `/view/${type.toLowerCase()}/${category.toLowerCase()}/${data.id}`};
        dispatch(addItemToCart({item}));
        resolve();
    })

    saveMovieItem = () => {
        this.addToCart().then(() => {
            setCookie(document,"shop-cart", JSON.stringify(this.props.cart), 60);
        })
    }

    render() {
        const {data, category, type} = this.state;
        const {cart} = this.props;
        const carouselData = LANDING_CAROUSELS.find(data => data.category === category);
        const isItemInCart = cart.find(item => data && item.id === data.id);

        return !data ? '' : (
            <div className="detail-page">
                <Navbar/>
                <div className="flex-center">
                    <div className="detail-jumbo">
                        <JumboTron imgSrc={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}/>
                    </div>
                </div>
                <div className="detail-section">
                    <div className="detail-poster-card"
                         style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${data.poster_path})`}}/>
                    <div className="detail-info">
                        <div className="detail-overview">
                            <h1>{type === CAROUSEL_TYPES.TV  ? data.original_name : data.original_title}</h1>
                            <p>{data.overview}</p>
                            <div className="flex-row justify-apart">
                                <div className="detail-rate flex-row">
                                    <img className="detail-rate-svg" src="/images/star.svg" alt=""/>
                                    <p className="detail-rate-average">{data.vote_average}</p>
                                    <p>( {data.vote_count} )</p>
                                </div>
                                <div className="detail-action">
                                    <div onClick={() => this.saveMovieItem()}
                                         className={`call-to-action ${isItemInCart ? 'disabled-action' : ''}`}>
                                        {category === CAROUSEL_TYPES.UPCOMING ? 'Add To Wishlist' : 'Buy Now'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{marginTop: 150, marginBottom: 50}}>
                    <MovieSection filterOutId={data.id} category={carouselData.category} type={carouselData.type} title={carouselData.header} subTitle={carouselData.text}
                                  apiUrl={carouselData.apiUrl} cardSize={carouselData.tileSize} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    cart: state.shoppingCart.bucket,
});

export default connect(mapStateToProps)(ViewDetails);
