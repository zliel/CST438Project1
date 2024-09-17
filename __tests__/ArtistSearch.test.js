/**
 * @format
 */

import 'react-native';
import React from 'react';
import ArtistSearch from '../Screens/ArtistSearch';
import { render, screen } from '@testing-library/react-native';

// Note: import explicitly to use the types shipped with jest.
import {it, describe, expect} from '@jest/globals';

describe('Artist Search', () => {
    it('renders without errors', () => {
        render(<ArtistSearch />);
        expect(screen).toBeTruthy();
    });

    it('renders search bar correctly', () => {
        render(<ArtistSearch />);
        expect(screen.getByTestId("searchBar")).toBeTruthy();
    })

    it('renders search button correctly', () => {
        render(<ArtistSearch />);
        expect(screen.getByTestId("searchButton")).toBeTruthy();
    })

    it('renders search results correctly', () => {
        render(<ArtistSearch />);
        // Click the search button
        // Enter a search term
        // Expect search results to be displayed

        expect(screen.getByText()).toBeTruthy();
    })
});

