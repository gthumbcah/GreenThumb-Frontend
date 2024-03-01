import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import NewJob from '../NewJob';
import { afterEach, describe, it, expect, vi } from 'vitest';

describe('NewJob Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders NewJob component', () => {
    const { getByText, getByLabelText, getByRole } = render(<NewJob />);

    expect(getByText('New Job')).toBeInTheDocument();

    fireEvent.change(getByLabelText('Customers Name'), { target: { value: 'John Doe' } });
    fireEvent.change(getByLabelText('Customers Mobile'), { target: { value: '1234567890' } });
    fireEvent.change(getByLabelText('Job Address'), { target: { value: '123 Main St' } });

    expect(getByLabelText('Customers Name')).toHaveValue('John Doe');
    expect(getByLabelText('Customers Mobile')).toHaveValue('1234567890');
    expect(getByLabelText('Job Address')).toHaveValue('123 Main St');

    fireEvent.click(getByRole('button', { name: 'Submit' }));
  });
});