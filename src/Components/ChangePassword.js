import React from 'react'
import NavBar from './NavBar'
import {useState ,useEffect} from "react"
import{getAuth,updatePassword,onAuthStateChanged} from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import app from './FbConfig';

export default function ChangePassword() {
    useEffect(()=>{

        let un =localStorage.getItem("un");
        if(un==null){
            nav("/login");
        }

    },[]);

    const nav = useNavigate();
    
    const[pw1,setPw1]=useState("");
    const[pw2,setPw2]=useState("");

   
    const hPw1=(event)=>{ setPw1(event.target.value);}
    const hPw2 = (event)=>{setPw2(event.target.value);}
    
    const save =(event)=>{
        event.preventDefault();
        if(pw1==pw2)
        {
            const auth = getAuth();
            onAuthStateChanged(auth,(user)=>{
                updatePassword(user,pw1)
                .then(res=>{
                    localStorage.clear();
                    nav("/login");
                })
                .catch(err=>alert("issue"+ err));            
            })


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
    <h1>Change password</h1>
    <form onSubmit={save}>
       
        <input type="password" placeholder="enter password " onChange={hPw1} value={pw1}/>
        <br/><br/>
        <input type="password" placeholder="confirm password" onChange={hPw2} value={pw2}/>
        <br/><br/>
        <input type="submit" value="change password "/>

    </form>
          
    </center>
    </>
  )
}