import React from 'react';
import Carousel from "./Carousel";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })

describe('Carousel', () => {
    it ('does not increment if disabled', () => {
        const carousel = shallow(
            <Carousel disabled>
                <div>test1</div>
                <div>test2</div>
            </Carousel>
        );
        expect(carousel.state('timeout')).toEqual(null);
        expect(carousel.state('interval')).toEqual(null);
    });
    it ('is paused when mouse enters', () => {
        const carousel = shallow(
            <Carousel>
                <div>test1</div>
                <div>test2</div>
            </Carousel>
        );

        const container = carousel.find('.carousel');
        container.simulate('mouseEnter');

        expect(carousel.state('isPaused')).toEqual(true);
    });
    it ('is resumed when mouse leaves', () => {
        const carousel = shallow(
            <Carousel>
                <div>test1</div>
                <div>test2</div>
            </Carousel>
        );

        const container = carousel.find('.carousel');
        container.simulate('mouseLeave');

        expect(carousel.state('isPaused')).toEqual(false);
        expect(carousel.state('timeout')).not.toEqual(null);
    });
    it ('is not resumed after mouse leaves when disabled', () => {
        const carousel = shallow(
            <Carousel disabled>
                <div>test1</div>
                <div>test2</div>
            </Carousel>
        );

        const container = carousel.find('.carousel');
        container.simulate('mouseLeave');

        expect(carousel.state('isPaused')).toEqual(false);
        expect(carousel.state('timeout')).toEqual(null);
    });
});