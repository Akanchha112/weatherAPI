import React, { useState, useEffect } from 'react';
import { fetchUserData, updateUserStatus } from '../services/firebase'; // Firebase functions to fetch and update user data

function UserTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from Firebase
    const fetchData = async () => {
      const userData = await fetchUserData();
      setUsers(userData);
    };
    fetchData();
  }, []);

  const handleStatusChange = async (userId, newStatus) => {
    // Update user status in Firebase
    await updateUserStatus(userId, newStatus);
    // Update the local state
    const updatedUsers = users.map(user => user.id === userId ? { ...user, status: newStatus } : user);
    setUsers(updatedUsers);
  };

  return (
    <div>
      <h2>Active Users</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Password</th>
            <th>Status</th>
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user.id}>
                <td>{user.Email}</td>
                <td>{user.pass}</td>
                <td>Active</td>
                {/* <td>
                  <button onClick={() => handleStatusChange(user.id, 'inactive')}>Change Status</button>
                 
                </td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Loading...</td> {/* Render loading indicator */}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
