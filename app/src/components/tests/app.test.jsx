// App.test.js
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import {describe, it, expect} from 'vitest'
import App from '../components/App';
import Calendar from '../components/Calendar';
import MyCalendar from '../components/MyCalendar';

describe('MyCalendar Component', () => {
  it('renders without crashing', () => {
    render(<MyCalendar />);
    // Check if the Calendar component renders without crashing
    expect(screen.getByText('Calendar')).toBeInTheDocument();
  });

  it('displays jobs for selected date', () => {
    render(<MyCalendar />);
    // Assuming there's a job for the selected date in the sample data
    const sampleDate = new Date('2024-03-01'); // Change the date as needed
    // Simulate clicking on a specific date
    const dateElement = screen.getByText(sampleDate.getDate().toString());
    dateElement.click();
    // Check if the component renders the list of jobs for the selected date
    expect(screen.getByText(`Jobs for ${sampleDate.toDateString()}`)).toBeInTheDocument();
  });
});


