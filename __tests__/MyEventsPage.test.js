import 'react-native';
import React from 'react';
import MyEventsPage from '../Screens/MyEventsPage';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Mock fetch and AsyncStorage
global.fetch = jest.fn();
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

describe('MyEventsPage', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });
  
    it('renders without errors',async () => {
      await waitFor(() =>{
        render(<MyEventsPage />);
      });
      expect(screen).toBeTruthy();
    });


    it('displays "No liked events found" when there are no liked events', async () => {
        // Mock AsyncStorage to return null (no liked events)
        AsyncStorage.getItem.mockResolvedValue(null);
    
        render(<MyEventsPage />);
    
        // Wait for the "No liked events found" message to appear
        await waitFor(() => {
          expect(screen.getByText('No liked events found.')).toBeTruthy();
        });
    });

});
