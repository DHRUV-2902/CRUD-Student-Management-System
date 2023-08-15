import React from 'react'
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom"
import { ref, child, remove, get } from "firebase/database";
import db from "./FbConfig";

export default function Home() {
    
    const nav = useNavigate();
    const [user,setUser]=useState("");
    const admin = localStorage.getItem("admin");
	console.log(admin);
	const [info, setInfo] = useState([]);

	useEffect(() => {

		const dbref = ref(db);

		get(child(dbref, "student/"))
			.then((snapshot) => {
				if (snapshot.exists()) {
					setInfo([]);
					console.log(snapshot.val());
					const data = snapshot.val()
					if (data !== null) {
						Object.values(data).map((da) => {
							setInfo((oldArray) => [...oldArray, da]);
						});
					}
				}
				else {
					console.log("no data");
				}
			})
			.catch(error => console.log(error));

		let un = localStorage.getItem("un");
		if (un != null) {
			setUser("Welcome " + un);
		}
		else {
			nav("/login");
		}
	}, [nav]);

	const lo = (event) => {
		event.preventDefault();
		localStorage.clear();
		nav("/login");
	}
	const updateStu = (email) => {
		
		const studentRef = ref(db, "student/" + email);
		get(studentRef)
		  .then((snapshot) => {
			if (snapshot.exists()) {
			  const studentData = snapshot.val();
			  console.log("sd,............")
			//   nav(`/updatestudent?name=${name}`, { state: { studentData } });
			nav(`/sd`, { state: { studentData } });
			
			} else {
				
			  alert("Student data not found!");
			}
		  })
		  .catch((err) => console.log(err));
	  };
	
	const delStu = (rno) => {
		const r3 = ref(db, "student/" + rno);
		remove(r3)
			.then(() => {
				alert("Record Deleted");
				window.location.reload();
			})
			.catch(err => console.log(err));
	}

    useEffect(()=>{
        let un=localStorage.getItem("un");
        if(un!=null){
            setUser( un );
        }
        else{
            nav("/login");
        }
    },[]);

    

       
  return (
    <div>
        <center>
        <NavBar/>
		<div class="display"> 
		<h1>HOME PAGE </h1> 
		<h2> <marquee behavior="alternate" direction="left" scrollamount="11">  Welcome !!!</marquee> {user} </h2>
		</div>
		<br></br>
       
      
        {(admin != "yes") &&
					<div class="dis2">
						<h4>
							To Add  <b><i>Details</i></b><br />
							Go to <b><i>Details</i></b> from Navbar or Click
						</h4>
						<button class="go-home">
							<Link to="/feedback" style={{ textDecoration: "none" }}>Add Details</Link>
						</button>
					</div>
				}

				{(admin === "yes") && <table border="5" style={{ width: "auto" }}>
					<div style={{ fontSize: "62%" }} class="table">
						<tr>
							
							<th>E-Mail</th>
							<th>Name</th>
							<th>Number</th>
							<th>Gender</th>
							<th>Stream</th>
							<th>Date Of Birth</th>
							<th>Update</th>
							<th>Delete</th>
							
						</tr>
						{
							info.map(e => {
								console.log(e);
								return (
									<tr style={{ "textAlign": "center" }}>
										
										<td>{e.email}</td>
										<td>{e.name}</td>
										<td>{e.number}</td>
										<td>{e.gender}</td>
										<td>{e.stream}</td>
										<td>{e.date}</td>
										
										<td><button onClick={() => {
											if (window.confirm("Are You Sure to update???")) updateStu(e.name)
										}}>Update</button></td>
										<td><button onClick={() => {
											if (window.confirm("Are You Sure???")) delStu(e.name)
										}}>Delete</button></td>
									</tr>
								)
							})
						}
					</div>
				</table>}
        
        
        </center>
      
    </div>
  )
}
