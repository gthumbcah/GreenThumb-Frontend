import { JSDOM } from 'jsdom';
import { describe, expect, test } from 'vitest';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from '../Login';

// Setup JSDOM
const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;
Object.defineProperty(global.window, 'navigator', {
  value: {
    userAgent: 'node.js', 
  },
});

describe('Login Component', () => {
    test('renders Login component', () => {
        const { getByLabelText, getByText } = render(<Login />);
        
        // Test username input
        const usernameInput = getByLabelText('Username:');
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        expect(usernameInput.value).toBe('testuser');
        
        // Test password input
        const passwordInput = getByLabelText('Password:');
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
        expect(passwordInput.value).toBe('testpassword');
        
        // Test login button
        fireEvent.click(getByText('Login'));
        
    });
});