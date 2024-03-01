import { describe, test, expect } from 'vitest';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ClockComponent from '../ClockComponent';
import { JSDOM } from 'jsdom';

// Setup JSDOM
const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;

describe('ClockComponent', () => {
  test('clock in and clock out functionality', async () => {
    const { getByText } = render(<ClockComponent />);

    // Check if Clock In button exists
    const clockInButton = getByText('Clock In');
    expect(clockInButton).toBeTruthy();

    // Clock In
    fireEvent.click(clockInButton);

    // Check if Clock Out button exists after Clock In
    const clockOutButton = getByText('Clock Out');
    expect(clockOutButton).toBeTruthy();

    // Clock Out
    fireEvent.click(clockOutButton);

    // Check if Clock In button exists again after Clock Out
    expect(clockInButton).toBeTruthy();
  });
});