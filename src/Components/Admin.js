import NavBar from "./NavBar.js";
import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Admins() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [password, setPassword] = useState("");


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleSecretKeyChange = (event) => {
    setSecretKey(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    let un = localStorage.getItem("un");
    if (un != null) {
      nav("/home");
    }
  }, [nav]);

  const handleLogin = (event) => {
    event.preventDefault();
    if (secretKey !== "abc123") {
      alert("Invalid secret key");
      return;
    }
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          localStorage.setItem("un", email);
          localStorage.setItem("admin", "yes");
          nav("/home");
        } else {
          alert("User not found");
        }
      })
      .catch((err) => {
        alert("Login failed: " + err.message);

      });
  };

  

  return (
    <>
      <center>
        <NavBar />
        <div class="card">
          <div class="card2">
            <h2 class="admin">Admin Login </h2>
            <form class="form8" onSubmit={handleLogin}>
              <input  class="input8" type="email" placeholder="Enter Email" onChange={handleEmailChange} value={email} required/>
              <input type="password" placeholder="Password" class="input8" onChange={handlePasswordChange}  value={password}  required/>
              <input type="password" placeholder="Secret key " class="input8" onChange={handleSecretKeyChange}  value={secretKey}  required/>
              <button>Submit</button>
            </form><br />
          </div>
        </div>
      </center>
    </>
  );
}