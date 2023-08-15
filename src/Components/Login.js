import React from 'react'
import NavBar from './NavBar'
import {useState ,useEffect} from "react"
import{getAuth,signInWithEmailAndPassword} from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import app from './FbConfig'

export default function SignUp() {
    useEffect(()=>{

        let un =localStorage.getItem("un");
        if(un!=null){
            nav("/home");
        }

    },[]);

    const nav = useNavigate();
    const[un,setUn] = useState("");
    const[pw1,setPw1]=useState("");
    

    const hUn = (event) => { setUn(event.target.value);}
    const hPw1=(event)=>{ setPw1(event.target.value);}
    
    
    const check =(event)=>{
        event.preventDefault();
        const auth= getAuth();
        signInWithEmailAndPassword(auth,un,pw1)
        .then(res=>
            {
                localStorage.setItem("un",un);
                alert("login successful");
                nav("/home");
            })
        .catch(err=>alert("issue"+err))
        
    };

    
  return (
  
    <>
    <center>
    <NavBar/>
    <br/><br/>

<form onSubmit={check} class="form2">
    
    <p class="heading2">Login</p>
    <input class="input2" placeholder="Username" type="text" onChange={hUn} value={un}/>
    <input class="input2" placeholder="Password" type="password" onChange={hPw1} value={pw1}/> 
    <input type="submit" class="btn2" value="LoginIn"/>
</form>

   
          
    </center>
    </>
  )
}