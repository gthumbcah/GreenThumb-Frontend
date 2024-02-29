import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditJob = () => {
    const { id } = useParams();
    const [customerName, setCustomerName] = useState("");
    const [customerMobile, setCustomerMobile] = useState("");
    const [jobAddress, setJobAddress] = useState("");
    const [chosenTask, setChosenTask] = useState(""); 
    const [users, setUsers] = useState([]);
    const [chosenUsers, setChosenUsers] = useState([])
    const [startDate, setStartDate] = useState("");
    const [finishDate, setFinishDate] = useState("");
    const [datesInRange, setDatesInRange] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const baseTools = ["General Items (wheelbarrow, shovel, rake, broom, grass bags)"]
    const [toolsRequired, setToolsRequired] = useState(baseTools);
    const [isComplete, setIsComplete] = useState(true);
  
    
    const tasksArr = ["Mowing", "Trimming/Tidying", "Plant Installation", "Decorating"];
  
    const [jobData, setJobData] = useState({
        customerDetails: ["", "", ""],
        tasks: "",
        toolsNeeded: [],
        users: [],
        dates: [],
        jobActive: true
      });

    useEffect(() => {
        const fetchJobData = async () => {
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
                    setJobData(data);
                } else {
                    console.log('Failed to fetch job data');
                }
            } catch (error) {
                console.error('Error fetching job data:', error);
            }
        };

        fetchJobData();
    }, [id]);

    const handleTaskChange = (e) => {
        const selectedTask = e.target.value;
        setChosenTask(selectedTask);
    
        // Auto Update tools required based on selected task , with default tools for minor work
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
      
      //Extracts the name from the chosen user and places in Array and ensures user cannot be double selected.
    const handleChosenUsersChange = (e) => {
      const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
      setChosenUsers(selectedOptions.filter(name => !selectedEmployees.includes(users.find(user => user.name === name)._id))); 
    };
    
      // Combines any previously selected users array and newly selected employees based on their object id
      const handleAddEmployees = () => {
        // Filter out users that are already selected in the added Section
        const newEmployees = chosenUsers.filter(name => !selectedEmployees.includes(users.find(user => user.name === name)._id));
        // Concatenate the new employees with the already selected ones
        setSelectedEmployees(prevEmployees => [...prevEmployees, ...newEmployees.map(name => users.find(user => user.name === name)._id)]);
        setChosenUsers([]); 
      };
      //Resets the selected Users
      const handleRemoveEmployees = () => {
        setChosenUsers(prevUnselected => [...prevUnselected, ...chosenUsers]);
        setSelectedEmployees([...chosenUsers]); 
      };
    
    // handle if job goes over several days or a single day
    const handleDate = (e) => {
      const { name, value } = e.target;
      let newStartDate = startDate;
      let newFinishDate = finishDate;
    
      if (name === "startDate") {
        newStartDate = value;
        if (!finishDate || new Date(value) > new Date(finishDate)) {
          newFinishDate = value;
        }
      } else if (name === "finishDate") {
        newFinishDate = value;
      }
    
      // Prevent submission if start date is later than finish date
      if (new Date(newStartDate) > new Date(newFinishDate)) {
        console.error('Start date must be earlier than or equal to finish date');
        return; // Stop submission
      }
    
      // Calculate dates in range
      const start = new Date(newStartDate);
      const finish = new Date(newFinishDate);
      const datesInRange = [];
    
      if (start.getTime() === finish.getTime()) {
        datesInRange.push(start.toISOString().split('T')[0]); // Only push start date if start and finish dates are the same
      } else {
        for (let currentDate = new Date(start); currentDate <= finish; currentDate.setDate(currentDate.getDate() + 1)) {
          datesInRange.push(currentDate.toISOString().split('T')[0]);
        }
      }
      
      console.log(datesInRange);
    
      // Update datesInRange state
      setStartDate(newStartDate);
      setFinishDate(newFinishDate);
      setDatesInRange(datesInRange);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Manually enter the body details
        const jobData = {
            customerDetails: [customerName, customerMobile, jobAddress],
            tasks: [chosenTask],
            toolsNeeded: toolsRequired,
            users: selectedEmployees,
            dates: datesInRange,
            jobActive: true
        };
    
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://greenthumb-backend.onrender.com/jobs/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(jobData),
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

    const handleToggleFinished = () => {
        setIsComplete(activeStatus => !activeStatus); // Toggle finished status
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobData(prevData => ({
            ...prevData,
            customerDetails: name === "customerName" ? [value, prevData.customerDetails[1], prevData.customerDetails[2]] :
                             name === "customerMobile" ? [prevData.customerDetails[0], value, prevData.customerDetails[2]] :
                             [prevData.customerDetails[0], prevData.customerDetails[1], value]
        }));
    };



   

    const fetchUsers = async () => {
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
                setJobData(prevData => ({
                    ...prevData,
                    users: data
                }));
            } else {
                console.log('Failed to find users');
            }
        } catch (error) {
            console.error('Error finding users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Edit Job</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Edit Customers Name:
                    <input 
                        type="text" 
                        name="customerName" 
                        value={jobData.customerDetails[0]} 
                        onChange={handleChange} 
                        required 
                    />
                </label>
                <label>
                    Edit Customers Mobile:
                    <input 
                        type="text" 
                        name="customerMobile" 
                        value={jobData.customerDetails[1]} 
                        onChange={handleChange} 
                        required 
                    />
                </label>
                <label>
                     Edit Job Address:
                    <input 
                        type="text" 
                        name="jobAddress" 
                        value={jobData.customerDetails[2]}  
                        onChange={handleChange} 
                        required 
                    />
                </label>
                <label>
                    Selected New Task:
                    <select 
                        name="chosenTask" 
                        value={jobData.chosenTask} 
                        onChange={handleTaskChange} 
                        required
                    >
                        <option value="">Select a task</option>
                        {tasksArr.map(task => (
                            <option key={task} value={task}>{task}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Edit Tools Required:
                    <ul>
                        {toolsRequired.map(tool => (
                        <li key={tool}>{tool}</li>
                        ))}
                    </ul>
                </label>
                <label>
                    Edit Selected Employees:
                    <select 
                        name="selectedEmployees" 
                        value={chosenUsers} 
                        onChange={handleChosenUsersChange} 
                        multiple
                    >
                        <option value="">Select an employee</option>
                        {users.filter(user => !user.admin).map((user,index) => (
                            <option key={index} value={user.name}>{user.name}</option>
                        ))}
                    </select>
                </label>
                <br />
                <button type="button" onClick={handleAddEmployees}>Add Employees</button>
                <br />
                <div>
                    <h3>Selected Employees:</h3>
                    <ul>
                        {selectedEmployees.map((employeeId, index) => (
                        <li key={index}>{users.find(user => user._id === employeeId)?.name}<span role="img" aria-label="green check mark" style={{ color: 'green', marginLeft: '0.5rem' }}>
                        </span></li>
                        ))}
                    </ul>
                </div>
                <br />
                <button type="button" onClick={handleRemoveEmployees}> Reset Employees List </button>
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
                    <label>
                        Is Finished:
                        <div className="switch">
                            <input 
                                type="checkbox" 
                                checked={isComplete} 
                                onChange={handleToggleFinished} 
                            />
                            <span className="slider"></span>
                        </div>
                    </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default EditJob;













