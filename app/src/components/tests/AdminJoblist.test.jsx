import { describe, test, expect, it } from 'vitest';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AdminJoblist from '../AdminJoblist';
import { JSDOM } from 'jsdom';
import { BrowserRouter } from 'react-router-dom';

// Setup JSDOM
const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;

// Mocking localStorage
const localStorageMock = (() => {
  let store = {};
  
  return {
    getItem: key => store[key],
    setItem: (key, value) => { store[key] = value.toString(); },
    removeItem: key => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();

global.localStorage = localStorageMock;

describe('AdminJoblist Component', () => {
    it("should render AdminJobList page", () => {
        const jobs = [
            {
                customerDetails:["Jill Walker"],
                users:[{name: 'Johnny Walker'}]
            }
        ]

        const {getByText, getByLabelText, getByTestId} = render((<BrowserRouter><AdminJoblist jobs={jobs} /></BrowserRouter>));
    
        expect(() => getByText('Admin Job List')).not.toThrow()
    
  })
});



