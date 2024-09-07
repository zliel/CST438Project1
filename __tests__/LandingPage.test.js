/**
 * @format
 */

import 'react-native';
import React from 'react';
import LandingPage from '../Screens/LandingPage';
import { render, screen, fireEvent } from '@testing-library/react-native';


// Note: import explicitly to use the types shipped with jest.
import {it, describe, expect} from '@jest/globals';

describe ('LandingPage', () => {
    it('renders without errors', () => {
        render (< LandingPage />);
        expect(screen).toBeTruthy();
    });

    it('has a Log in button', () => {
        render(<LandingPage />);
        expect(screen.getByText('Log in')).toBeTruthy();
    });

    it('navigates to landing page on click',() =>{
        const navigate = jest.fn();
        const { getByText } = render(<LandingPage navigation={{ navigate }} />);
        fireEvent.press(screen.getByText('Log in'));
        expect(screen.getByText('Log In')).toBeOnTheScreen();

    });




});