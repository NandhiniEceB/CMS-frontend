import { useContext, useState } from "react";
import { Link } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";
const Register = () => {
  const {toast} = useContext(ToastContext);
  const { registerUser } = useContext(AuthContext);
  const [credentials, setcredentials] = useState({ 
    name:"",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setcredentials({ ...credentials, [name]: value });
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(credentials)
    if (!credentials.email || !credentials.password || !credentials.confirmPassword) {
      toast.error("please enter all the required fields!!");
      return;
    }
    if (credentials.password !== credentials.confirmPassword) {
      toast.error("password do not match!");
      return;
    }
    const userData = { ...credentials, confirmPassword: undefined };
    registerUser(userData);
  };
  return (
    <>
      {/* <ToastContainer autoClose={2000} /> */}
      <h3>CREATE YOUR ACCOUNT</h3>

      <form onSubmit={handleSubmit}> 
      <div className="form-group">
          <label htmlFor="nameInput" className="form-label mt-4">
            Your Name
          </label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            name="name"
            value={credentials.name}
            onChange={handleInputChange}
            placeholder="Name"
           
          />
        </div>
        <div className="form-group">
          <label htmlFor="emailInput" className="form-label mt-4">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            placeholder="Enter"
           
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordInput" className="form-label mt-4">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password_Input1"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            placeholder="Enter Password"
         
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmpassword" className="form-label mt-4">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password_Input2"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handleInputChange}
            placeholder="Enter Password"
          
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary my-3"
        />
        <p>Already have an account ? <Link to="/login">Login</Link></p>
      </form>
    </>
  )
}

export default Register;