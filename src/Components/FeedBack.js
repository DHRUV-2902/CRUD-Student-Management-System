import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import { ref, set, get, child, query, orderByChild, equalTo } from "firebase/database";
import { useNavigate } from "react-router-dom";
import db from "./FbConfig";

export default function Feedback() {
  const nav = useNavigate();
 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [date,setDate]=useState("");
  const [gender,setGender]=useState("");
  const[stream,setStream] = useState("");

  
  const hName = (event) => {
    setName(event.target.value);
  };
  const hEmail = (event) => {
    setEmail(event.target.value);
  };
  const hNumber = (event) => {
    setNumber(event.target.value);
  };
  const hDate=(event)=>{
    setDate(event.target.value);
  }
  const hGender =(e)=>{
    setGender(e.target.value);
  }
  const hStream =(e)=>{
    setStream(e.target.value);
  }

  useEffect(() => {
    let un = localStorage.getItem("un");
    let admin = localStorage.getItem("admin");
    if (un != null) {
      setEmail(un);
      if (admin === "yes") {
        nav('/home');
      }
    } else {
      nav("/login");
    }
  }, [nav]);

  const save = (event) => {
    event.preventDefault();
    if (name.trim() === "") {
      alert("NAME cannot be empty");
      return;
    }
    if (number.trim() === "") {
      alert("number cannot be empty");
      return;
    }
    if (date === "") {
      alert("date cannot be empty");
      return;
    }
    if (gender.trim() === "") {
      alert("gender cannot be empty");
      return;
    }
    if (stream.trim() === "") {
      alert("Strim cannot be empty");
      return;
    }
   
  
    // Error handling for name length
    if (name.trim().length < 2) {
      alert("Name should be greater than 2 characters.");
      return;
    }

    // Error handling for name containing a number
    if (!/^[A-Za-z ]+$/.test(name)) {
      alert("Name should not contain numbers.");
      return;
    }
  
    
    const r1 = ref(db);
    const emailQuery = query(
      child(r1, "student"),
      orderByChild("email"),
      equalTo(email)

    );
    get(emailQuery)
      .then((snapshot) => {
        if (snapshot.exists()) {
          alert(email + " already exists");
          setName("");
          setEmail("");
          setNumber("");
          setGender("");
          setDate("");
          setStream("");
         
        } else {
          let data = { name, email, number, date,gender,stream }; //stream
          const r2 = ref(db, "student/" + name); 
          set(r2, data);
          alert("Record created");
          setName("");
          setEmail("");
          setNumber("");
          setGender("");
          setDate("");
          setStream("");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <center>
        <NavBar />
       
        <form class="form9" onSubmit={save}>
    <p class="title">Add Student Details  </p>
    <label>
        <input required="" placeholder="first Name " type="text" class="input" onChange={hName}   value={name}/> 
    </label>     
    <label>
        <input required="" placeholder="Email " type="email" class="input" onChange={hEmail}  value={email}   disabled />
    </label> 
    <label>
    <select required="" placeholder="" type="number" class="input" onChange={hStream}  value={stream}>
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
        <input required="" placeholder=" Mobile Number " type="number" class="input" onChange={hNumber}    value={number}/>
    </label>
    <label>
        <input required="" placeholder="Date Of Birth" type="date" class="input" onChange={hDate}  value={date}/>
    </label>
    <label>
        <select required="" placeholder="" type="number" class="input" onChange={hGender}  value={gender}>
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