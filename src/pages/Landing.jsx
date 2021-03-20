import React from "react";
import JumboTron from "../components/JumboTron";
import {LANDING_CAROUSELS} from "../helpers/constants";
import MovieSection from "../components/MovieSection";
import Navbar from "../components/Navbar";


class Landing extends React.Component {
    render() {
        return (
            <div className="landing" style={{paddingBottom: 50}}>
                <Navbar/>
                <JumboTron headline="PopRocks"
                           subLine={"For when you run out of popcorn"} imgSrc={'/images/jumbo-movie.jpg'} />
                {LANDING_CAROUSELS.map((section, index) => (
                    <MovieSection isDisableRotate={section.isDisableRotate} interval={section.interval} type={section.type}
                                  delay={section.delay}
                                  category={section.category} key={index} title={section.header} subTitle={section.text}
                                  apiUrl={section.apiUrl} cardSize={section.tileSize} />
                ))}
            </div>
        )
    }
}

export default Landing;