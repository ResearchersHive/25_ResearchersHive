import React, { useState } from 'react';
import "./login.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const captureChanges = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const saveChanges = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        formData
      );
          console.log(response)
          if(response.data.message === "User authenticated") {
            // const cookies = new Cookies(null, { path: '/' });
            // cookies.set('token', response.data.token);

            const modal = document.getElementById("myModal");
            const modalP = document.getElementById("modalPara");
            modalP.innerHTML = "Successfully Logged In!";
            modal.style.display = "block";
            console.log("Login Successful!");
            setTimeout(() => {
              modal.style.display = "none";
              
              if (response.data.profile === "scholar") {
                navigate('/scholar');
              } else {
                navigate('/author');
              }
            }, 2000);

          } else {
            const modal = document.getElementById("myModal");
            const modalP = document.getElementById("modalPara");
            modalP.innerHTML = "Unsuccessful Login : " + response.data.msg;
            modal.style.display = "block";
            console.log("Login Unsuccessful");
            console.log(response.data.msg)
            setTimeout(() => {
              modal.style.display = "none";
              // navigate("/login");
            }, 2000);
          }
      } catch (error) {
        console.error("Error:", error);
      }
  };

  return (
    <div class="pageBody">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Login</h5>
        <form onSubmit={saveChanges}>
        <div class="mb-3">
              <label for="email" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control"
                name="email"
                value={formData.email}
                placeholder="Enter your email address"
                onChange={captureChanges}
                required
              />
            </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              name="password"
              value={formData.password}
              placeholder="Enter your password"
              onChange={captureChanges}
              required />
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
          <p></p>
          <a href='http://localhost:5173/register'><p>Create new Account</p></a>
        </form>
      </div>
    </div>
    <div id="myModal" className="modal">
      <div className="modal-content">
        <p id="modalPara"></p>
      </div>
    </div>
    </div>
  );
};

export default Login