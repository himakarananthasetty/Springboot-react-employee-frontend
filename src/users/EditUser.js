import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
export default function EditUser() {
  let navigate = useNavigate();

  const {id}=useParams()


  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    emailId: ""
  });

  const { firstName,lastName, userName, emailId } = user;

  useEffect(()=>{
    loadUser();
  },[]);

  const onInputChange = (e) => {
    setUser({ ...user,[e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/user/${id}`, user)
    navigate("/")
  };

  const loadUser = async ()=>{
    const result= await axios.get(`http://localhost:8080/user/${id}`)
    setUser(result.data)
    
  }

  return (
    <div className="container">

      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
               First Name
              </label>
              <input
                type="text"

                className="form-control"
                placeholder="Enter your First name"
                name="firstName"
                value={firstName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
               Last Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Last name"
                name="lastName"
                value={lastName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                User Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your User Name"
                name="userName"
                value={userName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                E-mail
              </label>
              <input
                type="text"
                class="form-control" 
                className="form-control"
                placeholder="Enter your E-mail address"
                name="emailId"
                value={emailId}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
            Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}