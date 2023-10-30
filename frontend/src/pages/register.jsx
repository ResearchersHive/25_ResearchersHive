import { useState } from "react";
import axios from "axios";
import "./register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    profile: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const captureChanges = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const confirmPass = (e) => {
    e.preventDefault();
    var p = document.getElementById("password");
    // const cp = e.target.value;
    var cp = document.getElementById("cPass");
    var q = document.getElementById("confirmation");
    console.log(p.value);
    console.log(cp.value);
    
    if (p.value === cp.value) {
        q.innerHTML = "Password Matched";
        q.style.color = "GREEN";
    } else {
        q.innerHTML = "Password Mismatch";
        q.style.color = "RED";
    }
}
  const saveChanges = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:8000/api/user/register",
        formData
      );
      if (result.status === 201) {
        const modal = document.getElementById("myModal");
        const modalP = document.getElementById("modalPara");
        modalP.innerHTML = "Successfully Registered";
        modal.style.display = "block";
        setTimeout(() => {
          modal.style.display = "none";
          navigate("/login");
        }, 2000);
      } else if(result.status === 400) {
        const modal = document.getElementById("myModal");
        const modalP = document.getElementById("modalPara");
        modalP.innerHTML = result.data.message;
        modal.style.display = "block";
        setTimeout(() => {
          modal.style.display = "none";
          navigate("/login");
        }, 6000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const cardStyle = {
    backgroundImage: "linear-gradient(to bottom right, #fdfcfb, #e2d1c3)",
    border: "none",
    borderRadius: "15px",
    width: "500px",
    boxShadow: "0 30px 40px rgba(41, 47, 28, 0.1)",
  };

  const bodyStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#00000063",
    backgroundSize: "cover",
  };

  return (
    <div className="pageBody" style={bodyStyle}>
      <div className="card" style={cardStyle}>
        <div className="card-body">
          <h5 className="card-title">Registration Form</h5>
          <form onSubmit={saveChanges}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={formData.username}
                placeholder="Enter your name"
                onChange={captureChanges}
                required
              />
            </div>
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
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                placeholder="Enter your password"
                onChange={captureChanges}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
              Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm password"
                id="cPass"
                onKeyUp={confirmPass}
                required
              />
              <p id="confirmation"></p>
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                className="form-select"
                name="profile"
                value={formData.profile}
                onChange={captureChanges}
                required>
                <option value="" disabled selected>
                  Choose your role
                </option>
                <option value="scholar">Scholar</option>
                <option value="author">Author</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
            <p></p>
            <a href="/login">
              <p>Already have an Account</p>
            </a>
          </form>
        </div>
      </div>
      <div id="myModal" className="modal-1">
        <div className="modal-1-content">
          <p id="modalPara">Successfully Registered!</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
