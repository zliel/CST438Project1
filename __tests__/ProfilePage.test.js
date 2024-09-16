import 'react-native';
import React from 'react';
import ProfilePage from '../Screens/ProfilePage';
import { render, screen, fireEvent } from '@testing-library/react-native';

import {it, describe, expect} from '@jest/globals';

describe ('ProfilePage' , () => {
    it('renders without errors', () => {
        render (<ProfilePage/>);
        expect(screen).toBeTruthy();
    });

    it('has a update profile button', () => {
        render(<ProfilePage/>);
        expect(screen.getByText('Update Profile')).toBeTruthy();
    });

    it('has a My Events button', () => {
        render(<ProfilePage/>);
        expect(screen.getByText('My Events')).toBeTruthy();
    });

    it('navigates to the Update Profile page on button click', () => {
        const navigate = jest.fn();
        render(<ProfilePage navigation={{ navigate }} />);
        fireEvent.press(screen.getByText('Update Profile'));
        expect(navigate).toHaveBeenCalledWith('Update Profile');
    });

    it('navigates to the My Events page on button click', () => {
        const navigate = jest.fn();
        render(<ProfilePage navigation={{ navigate }} />);
        fireEvent.press(screen.getByText('My Events'));
        expect(navigate).toHaveBeenCalledWith('My Events');
    });

    


    
    





});