import { useState } from 'react';
import "./login.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


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
          if(response.status === 200){
            const modal = document.getElementById("myModal");
            const modalP = document.getElementById("modalPara");
            modalP.innerHTML = "Successfully Logged In!";
            modal.style.display = "block";
            console.log("Login Successful!");
            console.log(response.data)
            localStorage.setItem("token", response.data.access);
            fetch("http://localhost:8000/api/user/info", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${response.data.access}`,
              },
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                localStorage.setItem("id", data.id);
              })
              .then(() => {
                setTimeout(() => {
                  navigate('/dashboard');
                }, 2000);
              });
          }
      } catch (error) {
        console.error("Error:", error);
        const modal = document.getElementById("myModal");
        const modalP = document.getElementById("modalPara");
        modalP.innerHTML = "Unsuccessful Login : " + error.response.data.detail;
        modal.style.display = "block";
        console.log("Login Unsuccessful");
        setTimeout(() => {
          modal.style.display = "none";
          // navigate("/login");
        }, 2000);
      }
  };

  return (
    <div className="pageBody">
    <div className="myCard">
      <div className="card-body">
        <h5 className="card-title">Login</h5>
        <form onSubmit={saveChanges}>
        <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                placeholder="Enter your email address"
                onChange={captureChanges}
                required
              />
            </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              placeholder="Enter your password"
              onChange={captureChanges}
              required />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
          <p></p>
          <a href='http://localhost:5173/register'><p>Create new Account</p></a>
        </form>
      </div>
    </div>
    <div id="myModal" className="modal-1">
      <div className="modal-1-content">
        <p id="modalPara"></p>
      </div>
    </div>
    </div>
  );
};

export default Login