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





{/* // import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// const EditJob = () => {
//     const { id } = useParams();
//     const [jobData, setJobData] = useState({
//         _id: "",
//         customerName: "",
//         customerMobile: "",
//         jobAddress: "",
//         chosenTask: "",
//         users: [],
//         startDate: "",
//         finishDate: "",
//         selectedEmployees: [],
//         toolsRequired: []
//     });

//     useEffect(() => {
//         const fetchJobData = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await fetch(`https://greenthumb-backend.onrender.com/jobs/${id}`, {
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Content-Type': 'application/json',
//                     },
//                 });
//                 if (response.ok) {
//                     const data = await response.json();
//                     setJobData(data);
//                 } else {
//                     console.log('Failed to fetch job data');
//                 }
//             } catch (error) {
//                 console.error('Error fetching job data:', error);
//             }
//         };

//         fetchJobData();
//     }, [id]);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const token = localStorage.getItem('token');
//             const response = await fetch(`https://greenthumb-backend.onrender.com/jobs/${id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Accept': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify(jobData),
//             });

//             if (response.ok) {
//                 console.log('Job updated successfully');
//             } else {
//                 console.log('Error response:', response);
//             }
//         } catch (error) {
//             console.error('Error updating job:', error);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setJobData(prevData => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const handleSelectedEmployeesChange = (e) => {
//         const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
//         setJobData(prevData => ({
//             ...prevData,
//             selectedEmployees: selectedOptions
//         }));
//     };

//     const handleToolsRequiredChange = (e) => {
//         const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
//         setJobData(prevData => ({
//             ...prevData,
//             toolsRequired: selectedOptions
//         }));
//     };

//     const fetchUsers = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await fetch('https://greenthumb-backend.onrender.com/users', {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             if (response.ok) {
//                 const data = await response.json();
//                 setJobData(prevData => ({
//                     ...prevData,
//                     users: data
//                 }));
//             } else {
//                 console.log('Failed to find users');
//             }
//         } catch (error) {
//             console.error('Error finding users:', error);
//         }
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     return (
//         <div>
//             <h2>Edit Job</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Customers Name:
//                     <input 
//                         type="text" 
//                         name="customerName" 
//                         value={jobData.customerDetails[0]} 
//                         onChange={handleChange} 
//                         required 
//                     />
//                 </label>
//                 <label>
//                     Customers Mobile:
//                     <input 
//                         type="text" 
//                         name="customerMobile" 
//                         value={jobData.customerDetails[1]} 
//                         onChange={handleChange} 
//                         required 
//                     />
//                 </label>
//                 <label>
//                     Job Address:
//                     <input 
//                         type="text" 
//                         name="jobAddress" 
//                         value={jobData.customerDetails[2]}  
//                         onChange={handleChange} 
//                         required 
//                     />
//                 </label>
//                 <label>
//                     Selected Task:
//                     <select 
//                         name="chosenTask" 
//                         value={jobData.tasks} 
//                         onChange={handleChange} 
//                         required
//                     >
//                         <option value="">Select a task</option>
//                         {/* Map through tasksArr to create options */}
//                     </select>
//                 </label>
//                 <label>
//                     Tools Required:
//                     <select 
//                         name="toolsRequired" 
//                         value={jobData.toolsRequired} 
//                         onChange={handleToolsRequiredChange} 
//                         multiple
//                     >
//                         {/* Map through toolsArr to create options */}
//                     </select>
//                 </label>
//                 <label>
//                     Selected Employees:
//                     <select 
//                         name="selectedEmployees" 
//                         value={jobData.selectedEmployees} 
//                         onChange={handleSelectedEmployeesChange} 
//                         multiple
//                     >
//                         {jobData.users.filter(user => !user.admin).map((user, index) => (
//                             <option key={index} value={user._id}>{user.name}</option>
//                         ))}
//                     </select>
//                 </label>
//                 <label>
//                     Start Date:
//                     <input 
//                         type="date" 
//                         name="startDate" 
//                         value={jobData.startDate} 
//                         onChange={handleChange} 
//                         required 
//                     />
//                 </label>
//                 <label>
//                     Finish Date:
//                     <input 
//                         type="date" 
//                         name="finishDate" 
//                         value={jobData.finishDate} 
//                         onChange={handleChange} 
//                     />
//                 </label>
//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     );
// };

// export default EditJob;











