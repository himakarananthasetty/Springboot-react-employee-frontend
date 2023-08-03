import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

const Home = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        loadUsers();
    }, []);
    //because of emply array it wil run only once, else it will run unlimited times.
    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/users")
        setUsers(result.data);
    }
    const {id}= useParams()
    const deleteUser= async (id)=>{
        await axios.delete(`http://localhost:8080/user/${id}`)
        loadUsers()
    }

    return (
        <div className='container '>
            <div className='py-4'>
                <table className="table border-lg shadow-lg ">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Email Id</th>
                            <th scope="col">Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr>
                                    <th scope="row" key={index}>{index+1}</th>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.userName}</td>
                                    <td>{user.emailId}</td>
                                    <td>
                                        <Link className='btn btn-primary mx-2' to={`/viewuser/${user.id}`}> View</Link>
                                        {/* <button className='btn btn-outline-primary mx-2'> Edit</button> */}
                                        <Link className='btn btn-outline-primary mx-2' to={`/edituser/${user.id}`}>Edit</Link>
                                        <button className='btn btn-danger mx-2 '
                                        onClick={()=>deleteUser(user.id)}
                                        > Delete</button>


                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home