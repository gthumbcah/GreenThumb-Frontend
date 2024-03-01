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
    const {getByLabelText, getByText, getByTestId} = render((<BrowserRouter><EditEmployee /></BrowserRouter>));

    expect(() => getByText('Update Account Details')).not.toThrow()

    const editEmPassword = getByLabelText('password:');
    fireEvent.change(editEmPassword, { target: { value: 'testingpassword' } });
    expect(editEmPassword.value).toBe('testingpassword');

    const editEmName = getByTestId('name-input');
    fireEvent.change(editEmName, {target: {value: "Marc Smith"}})
    expect(editEmName.value).toBe('Marc Smith')

    const editEmEmail = getByTestId('email-input');
    fireEvent.change(editEmEmail, {target: {value: "marc@gmail.com"}})
    expect(editEmEmail.value).toBe('marc@gmail.com')

  });
});

