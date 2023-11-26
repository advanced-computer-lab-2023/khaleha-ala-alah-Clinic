import React from 'react';

const UserList = ({ users, onSelectUser }) => {
  return (
    <div className="user-list">
      <h2>All Users</h2>
        {users.map((user, index) => (
            <div
            key={index}
            className="user"
            onClick={() => onSelectUser(user.userID)}
            >
            {user.name}
            </div>
        ))}
    </div>
  );
};

export default UserList;
