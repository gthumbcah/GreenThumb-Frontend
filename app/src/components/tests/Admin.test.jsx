import { describe, expect, test } from 'vitest';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Admin from '../Admin';
import { BrowserRouter } from 'react-router-dom';
import { JSDOM } from 'jsdom'; 

// Setup JSDOM
const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;
global.localStorage = {
  getItem: (key) => key === 'token' ? 'your_token_here' : null, 
};

describe('Admin Component', () => {
  test('renders Admin component', async () => {
    const mockData = [
      { _id: '1', name: 'Employee 1', admin: false },
      { _id: '2', name: 'Employee 2', admin: true },
    ];

    global.fetch = () => Promise.resolve({
      json: () => Promise.resolve(mockData),
    });

    const { getByText, getByLabelText } = render(
      <BrowserRouter>
        <Admin />
      </BrowserRouter>
    );

  
    const createEmployeeButton = getByText('Create Employee');
    const deleteEmployeeButton = getByText('Delete Employee');
    const jobsListButton = getByText('Jobs List');

    const employeeList = document.querySelector('.employee-list');


    expect(createEmployeeButton).toBeDefined();
    expect(deleteEmployeeButton).toBeDefined();
    expect(jobsListButton).toBeDefined();
    expect(employeeList).toBeDefined();


  });
});