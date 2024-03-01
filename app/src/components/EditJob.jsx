import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditJob = () => {
  // State for form fields
  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [jobAddress, setJobAddress] = useState("");


  const { id } = useParams();

  // Fetch job details for the given ID
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://greenthumb-backend.onrender.com/jobs/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          // Set state with received data
          setCustomerName(data.customerDetails[0]);
          setCustomerMobile(data.customerDetails[1]);
          setJobAddress(data.customerDetails[2]);
          // Set updated fields initially with received data
        } else {
          console.log('Failed to fetch job details');
        }
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };
  
    fetchJobDetails();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isConfirmed = window.confirm("Are you sure you want to submit?");
    if (!isConfirmed) return;
  
    try {
      const token = localStorage.getItem('token');
      const updatedJob = {
        customerDetails: [customerName, customerMobile, jobAddress]
      };
      const response = await fetch(`https://greenthumb-backend.onrender.com/jobs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedJob),
      });
  
      if (response.ok) {
        console.log('Job updated successfully');
      } else {
        console.log('Error response:', response);
      }
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  return (
    <div>
      <h2>Edit Job</h2>
      <form onSubmit={handleSubmit}>
        <label>Customers Name:
          <input 
            type="text" 
            name="customerName" 
            value={customerName} 
            onChange={(e) => setCustomerName(e.target.value)} 
            required 
          />
        </label>
        <label>Customers Mobile:
          <input 
            type="text" 
            name="customerMobile" 
            value={customerMobile} 
            onChange={(e) => setCustomerMobile(e.target.value)} 
            required 
          />
        </label>
        <label>Job Address:
          <input 
            type="text" 
            name="jobAddress" 
            value={jobAddress}  
            onChange={(e) => setJobAddress(e.target.value)} 
            required 
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditJob;












