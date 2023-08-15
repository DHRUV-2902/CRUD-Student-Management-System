import React from 'react'
import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import { ref, set, get, child, query, orderByChild, equalTo, remove } from "firebase/database";
import { useNavigate, useLocation } from "react-router-dom";
import db from "./FbConfig";

export default function UpdateStudent() {
    const nav = useNavigate();
    const location = useLocation();
    const { studentData } = location.state || {};
    const [StudentDetails, setStudentDetails] = useState({
      name: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      stream:"",
      number:""
  });
    const [oldName, setOldName] = useState('');

 
  const [fetchedStudentData, setFetchedStudentData] = useState(null);

  const handleInputChange = (event) => {
    console.log("handleInputChange called");
    const { name, value } = event.target;

    console.log("name, value",name, value)

    // Pad start the dateOfBirth value if it is not empty
    const updateValue = name === "dateOfBirth" ? value.padStart(2, "0") : value;

    setStudentDetails((prevStudentDetails) => ({
      ...prevStudentDetails,
      [name]: updateValue,
    }));
  };   


  useEffect(() => {
    if (studentData) {
      setStudentDetails(studentData); 
      setOldName(studentData.name);
    } else {
      nav("/login");
    }
  }, [studentData,nav]);
  
  const delStu = (name) => {
		const r3 = ref(db, "student/" + oldName);
		remove(r3)
			.then(() => {
				console.log("Record Deleted");
				// window.location.reload();
			})
			.catch(err => console.log(err));
	}


  const save = (event) => {
    event.preventDefault();
    if (StudentDetails.name.trim() === "") {
      alert("NAME cannot be empty");
      return;
    }
    if (StudentDetails.number.trim() === "") {
      alert("number cannot be empty");
      return;
    }
    if (StudentDetails.date === "") {
      alert("date cannot be empty");
      return;
    }
    if (StudentDetails.gender.trim() === "") {
      alert("gender cannot be empty");
      return;
    }
    if (StudentDetails.stream.trim() === "") {
      alert("Strim cannot be empty");
      return;
    }
   
  
    // Error handling for name length
    if (StudentDetails.name.trim().length < 2) {
      alert("Name should be greater than 2 characters.");
      return;
    }

    // Error handling for name containing a number
    if (!/^[A-Za-z ]+$/.test(StudentDetails.name)) {
      alert("Name should not contain numbers.");
      return;
    }


  delStu(StudentDetails.name);

  const r1 = ref(db);
  const emailQuery = query(
      child(r1, "student"),
      orderByChild("email"),
      equalTo(StudentDetails.email)
  );
  get(emailQuery)
      .then((snapshot) => {
              const r2 = ref(db, "student/" + StudentDetails.name);
              set(r2, StudentDetails);
              alert("Student data  Updated successfully");
              setStudentDetails({
                name: "",
                email: "",
                dateOfBirth: "",
                gender: "",
                number:"",
                stream:""
                // ... (reset other fields) ...
            });
              nav("/home");
          }
      )
      .catch((err) => console.log(err));
};
return (
  <>
    <center>
      <NavBar />
     
      <form class="form9" onSubmit={save}>
  <p class="title">Update Student Details  </p>
  <label>
      <input required="" name='name' placeholder="first Name " type="text" class="input" onChange={handleInputChange}   value={StudentDetails.name}/> 
  </label>     
  <label>
      <input required="" name='email' placeholder="Email " type="email" class="input"   value={StudentDetails.email}   disabled />
  </label> 
  <label>
  <select required="" name='stream' placeholder="" type="number" class="input" onChange={handleInputChange}   value={StudentDetails.stream}>
        <option value="">Select Stream</option>
        <option value="Comps">Comps</option>
        <option value="IT">IT</option>
        <option value="Mech">mechanical</option>
        <option value="Civil">Civil</option>
        <option value="EXTC">Electronics and Telecommunication</option>
        <option value="ELec">Electronics </option>
        </select>
  </label>
  <label>
      <input required="" name='number' placeholder=" Mobile Number " type="number" class="input" onChange={handleInputChange}   value={StudentDetails.number}/>
  </label>
  <label>
      <input required="" name='dateOfBirth' placeholder="Date Of Birth" type="date" class="input" onChange={handleInputChange}   value={StudentDetails.dateOfBirth}/>
  </label>
  <label>
      <select required="" name='gender' placeholder="" type="number" class="input" onChange={handleInputChange}   value={StudentDetails.gender}>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option></select>
  </label>
  
  <button class="submit">Submit</button>
  
</form>
    </center>
  </>
);
}