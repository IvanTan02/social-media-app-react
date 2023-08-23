import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import './styles/Navbar.css';

export const Navbar = () => {
  const [user] = useAuthState(auth);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="Navbar">
      <div className="links">
        <Link className="link" to="/">
          Home
        </Link>
        {!user ? (
          <Link className="link" to="/login">
            Login
          </Link>
        ) : (
          <Link className="link" to="/createpost">
            Create Post
          </Link>
        )}
      </div>
      {user && (
        <div className="user-card">
          <img src={user?.photoURL || ''} />
          <h4>{user?.displayName}</h4>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
};
