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
        expect(screen.getByText('Login')).toBeTruthy();
    });

    it('navigates to login page on click',() =>{
        const navigate = jest.fn();
        const { getByText } = render(<LandingPage navigation={{ navigate }} />);
        fireEvent.press(screen.getByText('Login'));
        expect(screen.getByText('Login')).toBeTruthy();

    });

    it('navigate to signup page on click',() =>{
        const navigate = jest.fn();
        const { getByText } = render(<LandingPage navigation={{ navigate }} />);
        fireEvent.press(screen.getByText('Signup'));
        expect(screen.getByText('Signup')).toBeTruthy();


    });






});