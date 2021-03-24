import React from 'react';
import CarouselControl from "./CarouselControl";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })

describe('Carousel Control', () => {
    it ('calls correct function when clicked', () => {
        const onButtonClickMock = jest.fn();
        const wrapper = shallow(
            <CarouselControl
                imgSrc={''}
                actionFn={onButtonClickMock}
            />,
        );
        const buttonElement = wrapper.find('.carousel-control');
        buttonElement.simulate('click');

        expect(onButtonClickMock).toHaveBeenCalledTimes(1);
    });
});