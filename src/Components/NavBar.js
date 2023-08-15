import React from 'react'
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { getAuth, deleteUser } from "firebase/auth";


export default function NavBar() {
   
    const nav = useNavigate();
	const un = localStorage.getItem("un");
	const admin = localStorage.getItem("admin");
    
    const lo =  (event)=>{
      event.preventDefault();
      localStorage.clear();
      nav("/login");
  }
  const dele = (event) => {
		event.preventDefault();
		const answer = window.confirm("Are you sure??");
		if (answer) {
			const auth = getAuth();
			const users = auth.currentUser;

			deleteUser(users)
				.then(() => {
					localStorage.clear();
					nav("/login");
				})
				.catch(err => alert("Issue " + err));
		}
	}
  return (
    <>
    <center>
  
    <ul class="topnav">
  <li>{(un==null )&& (<Link to="/login">login</Link>)} </li>
  <li> {(un==null )&& (<Link to="/signup">signup</Link>)} </li>
  <li> {(un==null )&& (<Link to="/al">Admin</Link>)}</li>
  <li> {(un!=null) && (<Link to="/home">Home</Link>)} </li>
  <li> {(un != null) && (<Link to="/cp">Change Password</Link>)}</li>
  <li> {(un != null) && (admin !== "yes") && (<Link to="/feedback">Details</Link>)}</li>
  <li>{(un != null) && (<Link to="/sd">UpdateStudent</Link>)}</li>
  <li> {(un != null) && (<span><button onClick={lo} className="button"><span className="lable">Logout</span></button></span>)}</li> 
  <li> {(un != null) && (<span><button onClick={dele} className="button"><span className="lable">DeleteUser</span></button></span>)}</li>

</ul>
    
     
     
     
      
      
			
			
			
   
    
    </center>
    </>
  )
}
