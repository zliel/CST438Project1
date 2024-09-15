/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import { render, screen } from '@testing-library/react-native';

// Note: import explicitly to use the types shipped with jest.
import {it, describe, expect} from '@jest/globals';
//opopo
describe('App', () => {
  it('renders without errors', () => {
    render(<App />);
    expect(screen).toBeTruthy();
  });

  it('renders Home screen correctly', () => {
    render(<App />);
    expect(screen.getByText("Home")).toBeTruthy();
  })
});

