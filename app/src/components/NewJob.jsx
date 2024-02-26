import React, { useState, useEffect } from 'react';

const NewJob = () => {
  // State for form fields
  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [jobAddress, setJobAddress] = useState("");
  const [chosenTask, setChosenTask] = useState(""); 
  const [users, setUsers] = useState([]);
  const [chosenUsers, setChosenUsers] = useState([])
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const baseTools = ["General Items (wheelbarrow, shovel, rake, broom, grass bags)"]
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://greenthumb-backend.onrender.com/users', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.log('Failed to find users');
        }
      } catch (error) {
        console.error('Error finding users:', error);
      }
    };
  
    fetchData();
  }, []);
  
  const handleChosenUsersChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    setChosenUsers(selectedOptions.filter(option => !selectedEmployees.includes(option))); 
  };
  
  const handleAddEmployees = () => {
    setSelectedEmployees(prevEmployees => [...prevEmployees, ...chosenUsers]);
    setChosenUsers([]); 
  };

  const handleRemoveEmployees = () => {
    setChosenUsers(prevUnselected => [...prevUnselected, ...chosenUsers]);
    setSelectedEmployees([...chosenUsers]); 
  };



  const handleDate = (e) => {
    const { name, value } = e.target;
    if (name === "startDate") {
      setStartDate(value);
      if (!finishDate) {
        setFinishDate(value); 
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
      users: selectedEmployees, // Use selectedEmployees instead of users
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
            value={chosenUsers} 
            onChange={handleChosenUsersChange}
            multiple
          >
            <option value="">Select an employee</option>
            {users.map((user, index) => (
              <option key={index} value={user.name}>{user.name}</option>
            ))}
          </select>
        </label>
        <br />
        <button type="button" onClick={handleAddEmployees}>Add Employees</button>
        <br />
        <div>
          <h3>Selected Employees:</h3>
          <ul
            required>
            {selectedEmployees.map((employee, index) => (
              <li key={index}>{employee}</li>
            ))}
          </ul>
        </div>
        <br />
        <label>
        <br />
        <button type="button" onClick={handleRemoveEmployees}> Reset Employees List </button>
        <br />
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

