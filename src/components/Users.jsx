import React, { use, useState } from 'react';

const Users = ({ usersPromise }) => {
    const initialUsers = use(usersPromise);
    const [users, setUsers] = useState(initialUsers);

    const handleAddUser = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const newUser = { name, email };

        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(data => {
            console.log('Data after creating user in the db', data);
            if (data.insertedId) {
                newUser._id = data.insertedId;
                const newUsers = [...users, newUser];
                setUsers(newUsers);
                alert('User added successfully.');
                const addedUser = { _id: data.insertedId, ...newUser };
                setUsers([...users, addedUser]); 
                
                e.target.reset();
            }
        })
    }

    const handleUserDelete = (id)=> {
        console.log("Delete this user", id);
        fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE',
            headers: {
                
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log("After delete data", data);
        })
    }
    return (
        <div>
            <div>
                <form onSubmit={handleAddUser}>
                    <input type="text" name="name" placeholder="Name" required />
                    <br />
                    <input type="email" name="email" placeholder="Email" required />
                    <br />
                    <input type="submit" value="Add User" />
                </form>
            </div>

            {/* View Users */}
            <div>
                {
                    users.map(user => (
                        <p key={user._id}>
                            {user.name}: {user.email}
                            <button onClick={()=> handleUserDelete(user._id)}>X</button>
                        </p>
                    ))
                }
            </div>
        </div>
    );
};

export default Users;