import React, { useState } from 'react';

const NewJob = () => {
  // State for form fields
  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [jobAddress, setJobAddress] = useState("");
  const [chosenTask, setChosenTask] = useState(""); // State to track chosen task
  // const [selectedEmployee, setSelectedEmployee] = useState("");
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");


  const baseTools = ["Wheelbarrow", "Shovels", "Rake", "Strong Arms"]
  const [toolsRequired, setToolsRequired] = useState(baseTools);

  // Task options
  const tasksArr = ["Mowing", "Trimming/Tidying", "Plant Installation", "Decorating"];

  // Function to handle task selection
  const handleTaskChange = (e) => {
    const selectedTask = e.target.value;
    setChosenTask(selectedTask);

    // Update tools required based on selected task
    switch (selectedTask) {
      case "Mowing":
        setToolsRequired([...baseTools,"Lawnmower", "Whippersnipper"]);
        break;
      case "Trimming/Tidying":
        setToolsRequired([...baseTools,"Hedgetrimmer", "Handshearers"]);
        break;
      case "Plant Installation":
        setToolsRequired([...baseTools,"Trowel", "String", "Flowers"]);
        break;
      case "Decorating":
        setToolsRequired([...baseTools,"Decorations", "Statues", "Buggy"]);
        break;
      default :
        setToolsRequired(baseTools);
        break;
    }
  };

  
  const handleDate = (e) => {
    const { name, value } = e.target;
    if (name === "startDate") {
      setStartDate(value);
      if (!finishDate) {
        setFinishDate(value); // Set finish date to start date if it's not already filled
      }
    } else if (name === "finishDate") {
      setFinishDate(value);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const jobData = {
      customerDetails: [customerName, customerMobile, jobAddress],
      tasks: [chosenTask],
      toolsNeeded: toolsRequired,
      users: [selectedEmployee],
      dates: [startDate, finishDate],
      jobActive: true
    };

    try {
      const response = await fetch('https://greenthumb-backend.onrender.com/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json",
          Authorization: "Bearer" + localStorage.getItem('token')
        },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        console.log('Job created successfully');
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  return (
    <div>
      <h2>New Job</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Customers Name:
          <input 
            type="text" 
            value={customerName} 
            onChange={(e) => setCustomerName(e.target.value)} 
            required 
          />
        </label>
        <label>
          Customers Mobile:
          <input 
            type="text" 
            value={customerMobile} 
            onChange={(e) => setCustomerMobile(e.target.value)} 
            required 
          />
        </label>
        <label>
          Job Address:
          <input 
            type="text" 
            value={jobAddress} 
            onChange={(e) => setJobAddress(e.target.value)} 
            required 
          />
        </label>
        <br />
        <label>
          Tasks:
          <select 
            value={chosenTask} 
            onChange={handleTaskChange} 
            required
          >
            <option value="">Select a task</option>
            {tasksArr.map(task => (
              <option key={task} value={task}>{task}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Tools Required:
          <ul>
            {toolsRequired.map(tool => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
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
          Start Date:
          <input 
            type="date"
            name="startDate"
            value={startDate}
            onChange={handleDate}
            required 
          />
        </label>
        <label>
          Finish Date:
          <input 
            type="date"
            name="finishDate"
            value={finishDate}
            onChange={handleDate}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewJob;
