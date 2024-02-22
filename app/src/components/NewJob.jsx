import React, { useState } from 'react';

const NewJob = () => {
  // State for form fields
  const [customerName, setCustomerName] = useState('');
  const [toolsRequired, setToolsRequired] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [date, setDate] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <h2>New Job</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Customer's Name:
          <input 
            type="text" 
            value={customerName} 
            onChange={(e) => setCustomerName(e.target.value)} 
            required 
          />
        </label>
        <br />
        <label>
          Tools Required:
          <input 
            type="text" 
            value={toolsRequired} 
            onChange={(e) => setToolsRequired(e.target.value)} 
            required 
          />
        </label>
        <br />
        <label>
          Select Employee:
          <select 
            value={selectedEmployee} 
            onChange={(e) => setSelectedEmployee(e.target.value)} 
            required
          >
            <option value="">Select an employee</option>
            {/* Replace the options below with actual employee data */}
            <option value="employee1">Employee 1</option>
            <option value="employee2">Employee 2</option>
            <option value="employee3">Employee 3</option>
          </select>
        </label>
        <br />
        <label>
          Date:
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required 
          />
        </label>
        <br />
        <label>
          Special Requests:
          <textarea 
            value={specialRequests} 
            onChange={(e) => setSpecialRequests(e.target.value)} 
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewJob;