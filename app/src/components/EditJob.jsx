import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './NewJob.css';

const EditJob = () => {
    const { id } = useParams();
    const history = useHistory();

    const [customerName, setCustomerName] = useState("");
    const [customerMobile, setCustomerMobile] = useState("");
    const [jobAddress, setJobAddress] = useState("");
    const [chosenTask, setChosenTask] = useState(""); 
    const [users, setUsers] = useState([]);
    const [chosenUsers, setChosenUsers] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [finishDate, setFinishDate] = useState("");
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const baseTools = ["General Items (wheelbarrow, shovel, rake, broom, grass bags)"]
    const [toolsRequired, setToolsRequired] = useState(baseTools);

    const tasksArr = ["Mowing", "Trimming/Tidying", "Plant Installation", "Decorating"];

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
                    const [customerName, customerMobile, jobAddress] = data.customerDetails;
                    setCustomerName(customerName);
                    setCustomerMobile(customerMobile);
                    setJobAddress(jobAddress);
                    setChosenTask(data.tasks[0]);
                    setToolsRequired(data.toolsNeeded);
                    setSelectedEmployees(data.users);
                    setStartDate(data.dates[0]);
                    setFinishDate(data.dates[data.dates.length - 1]);
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        const jobData = {
            customerDetails: [customerName, customerMobile, jobAddress],
            tasks: [chosenTask],
            toolsNeeded: toolsRequired,
            users: selectedEmployees,
            dates: [startDate, finishDate], 
            jobActive: true
        };
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://greenthumb-backend.onrender.com/jobs/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(jobData),
            });

            if (response.ok) {
                console.log('Job updated successfully');
                history.push('/admin/joblist');
            } else {
                console.log('Error response:', response);
            }
        } catch (error) {
            console.error('Error updating job:', error);
            if (error.response) {
                const responseBody = await error.response.json();
                console.error('Response body:', responseBody);
            }
        }
    };

    return (
        <div>
            <h2>Edit Job</h2>
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
                    Start Date:
                    <input 
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required 
                    />
                </label>
                <label>
                    Finish Date:
                    <input 
                        type="date"
                        value={finishDate}
                        onChange={(e) => setFinishDate(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default EditJob;










