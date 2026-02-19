import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { RiAccountCircleFill } from "react-icons/ri";
import axios from "axios";

function NavBar() {

  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:4000/logout', {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="flex max-w-4xl mx-auto">
        <div className="flex justify-between w-full items-center py-4">
          <Link to='/' className="px-3 py-2 font-bold text-xl text-blue-600">Azora</Link>

          {!user ? (
            <div className="flex items-center space-x-3">
              <Link to='/login' className="border rounded-lg shadow-lg py-2 px-4 border-blue-600 text-blue-600 hover:bg-blue-50">Login</Link>
              <Link to='/register' className="border rounded-lg shadow-lg py-2 px-4 border-blue-600 text-blue-600 hover:bg-blue-50">Register</Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <RiAccountCircleFill size={28} className="text-gray-600" />
                <span className="font-medium text-gray-800">
                  {user?.name || user?.email || 'User'}
                </span>
              </div>
              <Link to='/payment' className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
                Upgrade
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;