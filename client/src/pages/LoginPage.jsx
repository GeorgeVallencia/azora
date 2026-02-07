import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setUser} = useContext(UserContext);

  const handleEmail = (event) => {
    setEmail(event.target.value);
  }

  const handlePassword = (event) => {
    setPassword(event.target.value);
  }

  async function Login(event) {
    event.preventDefault();
    const data = await axios.post('http://localhost:4000/login', {email, password}, {withCredentials: true});
    setUser(data);
    navigate('/');
  };

  return(
    <div className="flex max-w-4xl mx-auto justify-center items-center">
      <form onSubmit={Login} className="flex flex-col items-center my-10">
        <div>
          <p className="p-4">Welcome, Please enter your email and password to login to your account.</p>
        </div>
        <div className="flex flex-col ">
          <input value={email} onChange={handleEmail} placeholder="Email" type="email" className="border rounded-lg outline-none mb-4 py-2 px-3 w-60"/>
          <input value={password} onChange={handlePassword} placeholder="Password" type="password" className="border rounded-lg outline-none mb-4 py-2 px-3 w-60"/>
        </div>
        <button className="border bg-cyan-300 shadow-lg w-60 items-center py-2 text-center rounded-lg">Login</button>
        <Link to='/register' className="my-4">Don't have an account yet? <span className="underline cursor-pointer hover:text-cyan-400">Register now.</span></Link >
      </form>
    </div>
  );
}

export default LoginPage;