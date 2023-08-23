// MATERIAL UI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import { lightBlue } from '@mui/material/colors';

// REACT
import './styles/Navbar.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, provider } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';

// COMPONENTS
import { Logo } from './Logo';
import { Link } from './Link';
import { UserCard } from './UserCard';
import { ToggleMenu } from './ToggleMenu';

export const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate('/');
  };

  return (
    <AppBar position="fixed" sx={{ width: '100%' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo display={{ xs: 'none', md: 'flex' }} />
          <ToggleMenu />

          <Logo display={{ xs: 'flex', md: 'none' }} />

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link text="Home" link="/" />
            <Link text="Login" link="/login" />
          </Box>
          {user ? (
            <UserCard />
          ) : (
            <Button
              onClick={signInWithGoogle}
              variant="contained"
              sx={{ backgroundColor: lightBlue[500] }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

// <div className="Navbar">
//   <div className="links">
//     <Link className="link" to="/">
//       Home
//     </Link>
//     {!user ? (
//       <Link className="link" to="/login">
//         Login
//       </Link>
//     ) : (
//       <Link className="link" to="/createpost">
//         Create Post
//       </Link>
//     )}
//   </div>
//   {user && (
//     <div className="user-card">
//       <img src={user?.photoURL || ''} />
//       <h4>{user?.displayName}</h4>
//       <button onClick={logout}>Logout</button>
//     </div>
//   )}
// </div>
