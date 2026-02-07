import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { RiAccountCircleFill } from "react-icons/ri";

function NavBar() {

  const { user } = useContext(UserContext);

  return(
    <div className="flex max-w-4xl mx-auto">
      <div className="flex justify-between w-full">
        <Link to='/' className="m-4 px-3 py-2">Logo</Link>
        
         { !user ? <div className="m-4 flex items-center">
          <Link to='/login' className="border shadow-lg py-2 px-4 mr-3">Login</Link>
          <Link to='/register' className="border shadow-lg py-2 px-4">Register</Link> 
          </div>
          :
            <div className="flex items-center">
              <RiAccountCircleFill size={30} />
              {user.name}
            </div>
          }
      </div>
    </div>
  );
}

export default NavBar;