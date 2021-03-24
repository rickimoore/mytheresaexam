import React from 'react';
import PropTypes from 'prop-types';
import CarouselControl from "./CarouselControl";

class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.carouselSlide = React.createRef();
        this.state = {
            isPaused: false,
            position: 0,
            translateX: 0,
            timeout: null,
            interval: null,
            increment: null,
            slideCount: props.children.length,
            maxRotation: props.children.length - props.offset
        }
    }

    componentDidMount() {
        const {delay, disabled} = this.props;
        const {slideCount} = this.state;
        const carouselWidth = this.carouselSlide.current ? this.carouselSlide.current.offsetWidth : 0;
        const increment = (carouselWidth / slideCount) ;

        this.setState({increment});

        if(!disabled) {
            this.setState({timeout: setTimeout(() => {
                    const{isPaused} = this.state;
                    if(!isPaused) {
                        this.setInterval();
                    }
                }, delay)});
        }
    }

    setInterval = () => {
        this.setState({
            interval: this.createInterval()
        })
    }

    createInterval = () => {
        const {interval} = this.props;

        return setInterval(() => {
            const {position, maxRotation} = this.state;
            if(position < maxRotation) {
                this.incrementCarousel(1);
                return;
            }
            this.resetInterval();
        }, interval)
    }

    pauseCarousel = () => {
        this.setState({isPaused: true});
        this.clearIntervalState();
    }

    resumeCarousel = () => {
        this.setState({isPaused: false});
        this.resumeInterval();
    }

    clearIntervalState = () => {
        const {interval, timeout} = this.state;
        clearInterval(interval);
        clearTimeout(timeout)
        this.setState({interval: null, timeout: null})
    }

    resetInterval = () => {
        this.clearIntervalState();
        this.setState({position: 0, translateX: 0});
        this.resumeInterval();
    }

    resumeInterval = () => {
        const {disabled} = this.props;
        if(!disabled) {
            this.setState({timeout: setTimeout(() => this.setInterval(), 2000)})
        }
    }

    incrementCarousel = (pos) => {
        const {increment} = this.state;
        this.setState(prevState => {
            const nextPos = prevState.position + pos;
            return {position: nextPos, translateX: -(increment * nextPos)}
        })
    }

    manualIncrement = () => {
        const {position, maxRotation} = this.state;
        if(position < maxRotation) {
            this.incrementCarousel(1);
            return;
        }

        this.setState({position: 0, translateX: 0});
    }

    manualDecrement = () => {
        const {position, maxRotation, increment} = this.state;
        const nextPos = position - 1;
        if(nextPos > -1) {
            this.incrementCarousel(-1);
            return;
        }

        const lastPosition = maxRotation - 1;

        this.setState({position: lastPosition, translateX: -(lastPosition * increment)});
    }

    render() {
        const {children} = this.props;
        const {translateX} = this.state;

        return (
            <div className="carousel" onMouseEnter={() => this.pauseCarousel()} onMouseLeave={() => this.resumeCarousel()}>
                <CarouselControl classes={"control-left"}
                                 actionFn={() => this.manualDecrement()} imgSrc={"/images/left-arrow.svg"} />
                <div ref={this.carouselSlide} style={{transform: `translate(${translateX}px)`}} className="carousel-slide">
                    {children}
                </div>
                <CarouselControl classes={"control-right"}
                     actionFn={() => this.manualIncrement()} imgSrc={"/images/right-arrow.svg"} />
            </div>
        )
    }
}

Carousel.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    delay: PropTypes.number,
    interval: PropTypes.number,
    disabled: PropTypes.bool,
    offset: PropTypes.number,
}

Carousel.defaultProps = {
    delay: 0,
    interval: 5000,
    disabled: false,
    offset: 0,
}

export default Carousel;