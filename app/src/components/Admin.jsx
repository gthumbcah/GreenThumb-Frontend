import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../components/api/endpoints.js';
import Confirm from './Confirm.jsx';
import './Admin.css'; 

const Admin = () => {
  const [employees, setEmployees] = useState([]);
  const [deleteOpt, setDeleteOpt] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
      });
  }, [employees]);

  const handleDelete = (id) => {
    setDeleteEmployeeId(id);
    setConfirmation(true);
  };

  const handleConfirmSubmit = () => {
    fetch(`${API_BASE_URL}/users/${deleteEmployeeId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res) => res.json());
    setConfirmation(false);
  };

  const handleCancelSubmit = () => {
    setConfirmation(false);
  };

  return (
    <div className="admin-container">
      {!deleteOpt ? (
        <>
          <ul className="employee-list">
            {employees.map((employee, index) => (
              <li className="employee-item" key={index}>
                <Link to={`/edit/${employee._id}`}>{employee.name}</Link>
              </li>
            ))}
          </ul>
          <div className="buttons-container">
            <button className="button" type="Link">
              <Link to={`/Admin/create`}>Create Employee</Link>
            </button>
            <button className="button" onClick={() => setDeleteOpt(true)}>
              Delete Employee
            </button>
          </div>
        </>
      ) : (
        <>
          <ul className="employee-list">
            {employees.map(
              (employee, index) =>
                !employee.admin && (
                  <li className="employee-item" key={index}>
                    <button
                      className="deleteEm button"
                      onClick={() => handleDelete(employee._id)}
                    >
                      {employee.name}
                    </button>
                  </li>
                )
            )}
          </ul>
          <div className="buttons-container">
            <button className="button" onClick={() => setDeleteOpt(false)}>
              Return to Employee Selector
            </button>
          </div>
          {confirmation && (
            <Confirm
              message="Are you sure you want to update the account details?"
              onConfirm={handleConfirmSubmit}
              onCancel={handleCancelSubmit}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Admin;
