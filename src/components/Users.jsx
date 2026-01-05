import React, { use } from 'react';

const Users = ({usersPromise}) => {
    const initialUsers = use(usersPromise);
    console.log(initialUsers);
    const handleAddUser = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const newUser = {name, email};
        console.log(newUser);

        //create user in the database
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(data => {
            console.log('Data after createing user in the db', data);
            if(data.insertedId){
                alert('User added successfully.');
                e.target.reset();
            }
        })
    }
    return (
        <div>
            <div>
            {/* Add users */}
                <form onSubmit={handleAddUser}>
                    <input type="text" name="name" />
                    <br />
                    <input type="email" name="email" />
                    <br />
                    <input type="submit" value="Add User" />
                </form>
            </div>
        </div>
    );
};

export default Users;