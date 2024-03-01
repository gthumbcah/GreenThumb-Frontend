import { describe, test, expect } from 'vitest';
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import NewJob from '../NewJob';
import { JSDOM } from 'jsdom'; 

// Setup JSDOM
const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;

describe('NewJob Component', () => {
  test('renders NewJob component', async () => {
    const { getByText, getByLabelText, getByPlaceholderText } = render(<NewJob />);

    expect(() => getByText('New Job')).not.toThrow();


    const customersNameInput = getByLabelText('Customers Name:');
    fireEvent.change(customersNameInput, { target: { value: 'John Doe' } });
    expect(customersNameInput.value).toBe('John Doe');

    const customersMobileInput = getByLabelText('Customers Mobile:');
    fireEvent.change(customersMobileInput, { target: { value: '1234567890' } });
    expect(customersMobileInput.value).toBe('1234567890');

    const jobAddressInput = getByLabelText('Job Address:');
    fireEvent.change(jobAddressInput, { target: { value: '123 Main St' } });
    expect(jobAddressInput.value).toBe('123 Main St');


    const tasksSelect = getByLabelText('Tasks:');
    fireEvent.change(tasksSelect, { target: { value: 'Mowing' } });
    expect(tasksSelect.value).toBe('Mowing');

  });
});