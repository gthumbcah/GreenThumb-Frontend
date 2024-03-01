import { describe, test, expect, it } from 'vitest';
import React from 'react';
import { render, fireEvent, scree } from '@testing-library/react';
import EditEmployee from '../EditEmployee'; 
import { JSDOM } from 'jsdom'; 
import { jest } from 'jest'
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

global.localStorage = localStorageMock


describe("EditEmployee", () => {
  it("should render EditEmployee page", () => {
    const { getByText } = render((<BrowserRouter><EditEmployee /></BrowserRouter>));
  });




  

  // it("should update the password field correctly", () => {
  //   const { getByLabelText } = render((<BrowserRouter><EditEmployee /></BrowserRouter>));
  //   const passwordInput = getByLabelText('Job Address:');
  //   fireEvent.change(passwordInput, { target: { value: '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8' } });
  //   expect(passwordInput.value).toBe('5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8');
  // });
});

