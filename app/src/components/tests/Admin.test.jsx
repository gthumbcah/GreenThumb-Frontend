import { render, screen, fireEvent } from 'vitest';
import { rest } from 'vite-plugin-mock';
import Admin from '../Admin';

// Mocking the API response
const mockEmployees = [
  { _id: 1, name: 'Employee 1', admin: false },
  { _id: 2, name: 'Employee 2', admin: false },
  { _id: 3, name: 'Admin 1', admin: true },
];

describe('Admin Component', () => {
  it('renders a list of employees', async () => {
    // Mocking the API response
    rest.get(`${API_BASE_URL}/users`, (req, res, ctx) => {
      return res(ctx.json(mockEmployees));
    });

    // Rendering the component
    render(<Admin />);

    // Expecting the list of employees to be rendered
    const employeeItems = await screen.findAllByRole('listitem');
    expect(employeeItems).toHaveLength(mockEmployees.length);
  });

  it('displays delete options when "Delete Employee" button is clicked', async () => {
    // Rendering the component
    render(<Admin />);

    // Clicking the "Delete Employee" button
    const deleteButton = screen.getByText('Delete Employee');
    fireEvent.click(deleteButton);

    // Expecting delete options to be displayed
    const deleteOptions = await screen.findAllByRole('button', { name: /delete/i });
    expect(deleteOptions).toHaveLength(mockEmployees.filter(emp => !emp.admin).length);
  });

});
