/**
 * @format
 */

import 'react-native';
import React from 'react';
import ArtistSearch from '../Screens/ArtistSearch';
import {fireEvent, render, screen, waitFor} from '@testing-library/react-native';

// Note: import explicitly to use the types shipped with jest.
import {afterEach, describe, expect, it, jest} from '@jest/globals';
import {Alert} from "react-native";


describe('Artist Search', () => {
    afterEach(() => {
        jest.restoreAllMocks()
    })

    it('renders without errors', () => {
        render(<ArtistSearch/>);
        expect(screen).toBeTruthy();
    });

    it('renders search bar correctly', () => {
        render(<ArtistSearch/>);
        expect(screen.getByTestId("searchBar")).toBeTruthy();
    })

    it('renders search button correctly', () => {
        render(<ArtistSearch/>);
        expect(screen.getByTestId("searchButton")).toBeTruthy();
    })

    it('handles API errors correctly', async () => {
        // Mock the fetch function to always throw an error
        global.fetch = jest.fn(() => Promise.reject(new Error("An error occurred while searching for artists")))

        const spyForAlert = jest.spyOn(Alert, 'alert');

        render(<ArtistSearch/>);

        // Change the search bar text and press the search button
        fireEvent.changeText(screen.getByTestId("searchBar"), "testing");
        fireEvent.press(screen.getByTestId("searchButton"));

        // Check that no artists were found
        await waitFor(() => {
            expect(spyForAlert).toHaveBeenCalledWith("Error", "An error occurred while searching for artists");
        })
    })

    it('handles no artists found correctly', async () => {
        // Mock the data, the API will return things like "_links" and "page" but no "_embedded"
        const mockData = {}

        // Mock the fetch function to return the mock data
        const mockedFetch = jest.fn(() => Promise.resolve({
            ok: true,
            json: () => mockData
        }));
        global.fetch = mockedFetch;

        const spyForAlert = jest.spyOn(Alert, 'alert');

        render(<ArtistSearch/>);

        // Change the search bar text and press the search button
        fireEvent.changeText(screen.getByTestId("searchBar"), "Test Artist");
        fireEvent.press(screen.getByTestId("searchButton"));

        // Check that no artists were found
        await waitFor(() => {
            expect(spyForAlert).toHaveBeenCalledWith("Error", "No artists found");
        })
    })

    it('renders single artist found correctly', async () => {
        // Mock the data
        const mockData = {
            _embedded: {
                attractions: [
                    {
                        id: "1",
                        name: "Test Artist",
                        url: "https://www.test.com",
                        images: [{url: "https://www.test.com/image.jpg"}]
                    }
                ]
            }
        }

        // Mock the fetch function to return the mock data
        const mockedFetch = jest.fn(() => Promise.resolve({
            ok: true,
            json: () => mockData
        }));

        global.fetch = mockedFetch;

        render(<ArtistSearch/>);

        // Change the search bar text and press the search button
        fireEvent.changeText(screen.getByTestId("searchBar"), "Test Artist");
        fireEvent.press(screen.getByTestId("searchButton"));

        // Check that the artist was found
        await waitFor(() => {
            expect(screen.getByText("Test Artist")).toBeTruthy();
        })
    })

    it('handles multiple artists found correctly', async () => {
        // Mock the data
        const mockData = {
            _embedded: {
                attractions: [
                    {
                        id: "1",
                        name: "Test Artist",
                        url: "https://www.test.com",
                        images: [{url: "https://www.test.com/image.jpg"}]
                    },
                    {
                        id: "2",
                        name: "Test Artist 2",
                        url: "https://www.test.com",
                        images: [{url: "https://www.test.com/image.jpg"}]
                    }
                ]
            }
        }

        // Mock the fetch function to return the mock data
        const mockedFetch = jest.fn(() => Promise.resolve({
                ok: true,
                json: () => mockData
            }));
        global.fetch = mockedFetch;

        render(<ArtistSearch/>);

        // Change the search bar text and press the search button
        fireEvent.changeText(screen.getByTestId("searchBar"), "Test Artist");
        fireEvent.press(screen.getByTestId("searchButton"));

        // Check that the artists were found
        await waitFor(() => {
            // TextMatch for getAllByText can use regexes
            expect(screen.getAllByText(/Test Artist/)).toHaveLength(2);
        })
    })
});

