import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              MachineLending
            </Link>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <Link to="/machines" className="hover:text-gray-300">
                Machines
              </Link>
              <Link to="/people" className="hover:text-gray-300">
                People
              </Link>
              <Link to="/lendings" className="hover:text-gray-300">
                Lendings
              </Link>
              
              <div className="ml-4 border-l border-gray-600 pl-4 flex items-center">
                <span className="mr-2">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 rounded px-3 py-1 text-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
          
          {!user && (
            <div className="flex items-center">
              <Link 
                to="/login" 
                className="bg-blue-500 hover:bg-blue-600 rounded px-4 py-2"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;