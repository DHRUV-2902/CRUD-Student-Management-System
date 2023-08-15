import React from 'react'
import NavBar from './NavBar'
import {useState ,useEffect} from "react"
import{getAuth,createUserWithEmailAndPassword} from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import app from './FbConfig';

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
    const[pw2,setPw2]=useState("");

    const hUn = (event) => { setUn(event.target.value);}
    const hPw1=(event)=>{ setPw1(event.target.value);}
    const hPw2 = (event)=>{setPw2(event.target.value);}
    
    const save =(event)=>{
        event.preventDefault();
        if(pw1==pw2)
        {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth,un,pw1)
            .then(res=>nav("/login"))
            .catch(err=>alert("issue"+ err));            
        }
        else
        {
            alert("passwords did not match");
            setPw1("");
            setPw2("");
        }
    };

    
  return (
  
    <>
    <center>
    <NavBar/>
     <br/><br/>

    <form class="form1" onSubmit={save}>
        
    <span class="title1">Register</span>
    <label for="email" class="label1">Email</label>
    <input type="email" id="username" name="username" required="" class="input1" onChange={hUn} value={un}/>
    <label for="password " class="label1">Password</label>
    <input type="password" id="email" name="email" required="" class="input1" onChange={hPw1} value={pw1}/>
    <label for="confirm password" class="label1">Confirm Password</label>
    <input type="password" id="password" name="password" required="" class="input1" onChange={hPw2} value={pw2} />
    <input type="submit" value="register" class="submit1"/>
  </form>  
    </center>
    </>
  )
}