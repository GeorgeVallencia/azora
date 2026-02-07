import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function RegisterPage() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  function registerUser(event) {

    event.preventDefault();
    axios.post('http://localhost:4000/register', {
      name,
      email,
      password
    })
    .then(res => {
    console.log('Registered:', res.data);
    })
    .catch(err => {
      console.error('Registration error:', err);
    });
    navigate('/');
    //console.log('user logged in');
  };
  
  return(
    <div className="flex max-w-4xl mx-auto justify-center items-center">
      <form onSubmit={registerUser} className="flex flex-col items-center my-10">
        <div>
          <p className="p-4">Welcome, Please enter your name, email and password to create an account.</p>
        </div>
        <div className="flex flex-col ">
          <input value={name} onChange={handleNameChange} placeholder="Full Name" className="border rounded-lg outline-none mb-4 py-2 px-3 w-60"/>
          <input value={email} onChange={handleEmailChange} placeholder="Email" type='email' className="border rounded-lg outline-none mb-4 py-2 px-3 w-60"/>
          <input value={password} onChange={handlePasswordChange} type='password' placeholder="Password" className="border rounded-lg outline-none mb-4 py-2 px-3 w-60"/>
        </div>
        <button className="border bg-cyan-300 shadow-lg w-60 items-center py-2 text-center rounded-lg">Register</button>
        <Link to='/login' className="my-4">Already have an account? <span className="underline cursor-pointer hover:text-cyan-400">Login now.</span></Link >

      </form>
    </div>
  );
}

export default RegisterPage;