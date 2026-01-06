import React from 'react';
import { useLoaderData } from 'react-router';


const UpdateUser = () => {
    const user = useLoaderData();
    const handleUpdateUser = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const updatedUser = {name, email};
        console.log(updatedUser);
        //Update user info in the database
         fetch(`http://localhost:3000/users/${user._id}`,{
            method: "PUT",
            headers: {
                "content-type": 'application/json',
            },
            body: JSON.stringify(updatedUser),
         })
         .then(res => res.json())
         .then(data => {
            console.log("After Updating:" ,data);
         })
    }
    return (
        <div>
            <form>
                <form type="text" name='name' defaultValue={user.name}></form>
                <br />
                <form type="email" name='email' defaultValue={user.email}></form>
                <br />
                <input type="submit" value="Update User"></input>
            </form>
        </div>
    );
};

export default UpdateUser;