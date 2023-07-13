import { useState,useContext} from "react"; 
import { Link } from "react-router-dom"; 
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const Login = () => {
    const {toast}=useContext(ToastContext)
    const {loginUser} = useContext(AuthContext);

    const [credentials, setcredentials] = useState({
        email: "",
        password: "",
    })
    console.log(credentials)
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setcredentials({...credentials,[name]:value});
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        // toast.success("Login in the user");
        console.log(credentials)
        if(!credentials.email || !credentials.password) {
          toast.error("please enter all the required fields!!");
          return;
        }
        loginUser(credentials);
      
    }
    return (
    <>
    {/* <ToastContainer autoClose={2000} /> */}
    <h3>Login</h3>

    <form onSubmit={handleSubmit}>
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
        autoComplete="on"
      />
    </div>
    <div className="form-group">
      <label htmlFor="passwordInput" className="form-label mt-4">
        Password
    </label>
      <input 
        type="password" 
        className="form-control" 
        id="passwordInput" 
        name="password"
        value={credentials.password}
        onChange={handleInputChange}
        placeholder="Enter Password"
        autoComplete="on"
      />
    </div>
    <input type="submit" value="Login" className="btn btn-primary my-3" />
    <p>Don't have an account ? <Link to="/register">Create One</Link></p>
    </form>
    </>
    )
}

export default Login;