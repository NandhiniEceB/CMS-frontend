import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import ToastContext from "./ToastContext";
import { useLocation, useNavigate } from "react-router-dom";
const AuthContext = createContext();
export const AuthContextProvider = ({children}) => {

    const {toast} = useContext(ToastContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const[error,setError]=useState(null);
    useEffect(()=>{
        checkUserLoggedIn();
    },[])

    //check if the user is logged in.
    const checkUserLoggedIn=async ()=>{
      
        try {
            const res=await fetch(`https://cms-backend-i9v7.onrender.com/api/me`,{
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const result=await res.json(); 
            if(!result.err){ 
                if(location.pathname === "/login" || location.pathname === "/reguster"){ 
                    setTimeout(()=>{
                        navigate("/",{replace:true}); 
                    },500);
                    
                   
                } 
                else{
                    navigate(location.pathname ? location.pathname:"/")
                }
             setUser(result);
          
          
            }else{
                navigate("/login",{replace:true});
            }
        } catch (err) {
           console.log(err);  
        } 
    }
    //login request
    const loginUser = async(userData) => {
        try{
            const res = await fetch(`https://cms-backend-i9v7.onrender.com/api/login`,{
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({...userData})
            });
            const result= await res.json(); 
            console.log(user);
            if(!result.error){ 
                // console.log(result);
                localStorage.setItem("token",result.token); 
                setUser(result.user);
                toast.success(`Logged in ${result.user.name}`);
                navigate("/",{replace: true});
            }else{ 
                toast.error(result.error);
            }  
        }catch (err) {
            console.log(err);
        }
    };
    //register request 
    const registerUser = async(userData)=>{
        try{
            const res=await fetch(`https://cms-backend-i9v7.onrender.com/api/register`,{
                method: "POST", 
                headers:{
                    "Content-type":"application/json",
                }, 
                body:JSON.stringify({...userData}), 

            }); 
            const result= await res.json(); 
            if(!result.error){
               toast.success("User Registered Successfully!! Login into your account!")
               navigate("/login",{replace: true});
            }else{ 
                toast.error(result.error);
            }
        }catch(err){
            console.log(err);
        }
    };
    return <AuthContext.Provider value={{loginUser,registerUser,user,setUser}}>
      
        {children}
        
        </AuthContext.Provider>
}
export default AuthContext;