import { useContext } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import ToastContext from '../context/ToastContext';
const Navbar = ({title=" 📞 CONTACT MANAGER"}) => { 
    const {user, setUser}=useContext(AuthContext);
    const navigate = useNavigate();
    const {toast} = useContext(ToastContext)
    return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
  <div className="container-fluid">
    <Link to = "/" style={{textDecoration:'none',color:'black',fontWeight:'bold'}}>
      {title} 
    {/* <a href="#" className="navbar-brand">{title}</a>  */} 
   
    </Link>
    
    <button 

 className="navbar-toggler" 
    type="button" 
    data-bs-toggle="collapse" 
    data-bs-target="#navbarColor01" 
    aria-controls="navbarColor01" 
    aria-expanded="false" 
    aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarColor01">
      <ul className="navbar-nav ms-auto"> 
      {user ? 
      <> 
      <li className="nav-item">
          <Link to = "/mycontacts" style={{textDecoration:'none',color:'black',fontWeight:'bold'}}>
          All Contacts&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </Link>
          
        </li>
      <li className="nav-item">
          <Link to = "/create" style={{textDecoration:'none',color:'black',fontWeight:'bold'}}>
          Create&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </Link>
          
        </li><li className="nav-item" onClick={()=>{
        setUser(null); 
        localStorage.clear();
        toast.success("Logged out");
        navigate("/login",{replace: true});
      }}>
       <button className="btn btn-danger">Logout</button>
        </li></>: <> <li className="nav-item">
          <Link to = "/login" style={{textDecoration:'none',color:'black',fontWeight:'bold'}}>
          Login
        </Link>
          
        </li>
        
        <li className="nav-item">

        <Link to = "/register" style={{textDecoration:'none',color:'black',fontWeight:'bold'}}>
        &nbsp;&nbsp;&nbsp;Register
      
        </Link>
           
        </li> </>}
       
       
        
      </ul>
    </div>
  </div>
</nav>
);
}
export default Navbar;