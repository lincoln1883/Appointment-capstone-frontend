import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/reducers/auth/logoutSlice';

const Navbar = () => {
  const userInfo = JSON.parse(localStorage.getItem('user')) || [];
  const user = userInfo.data;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const links = [
    { path: '/trade', text: 'Home' },
    { path: '/trade/reserve', text: 'Reserve' },
    { path: '/trade/reservations', text: 'My Reservations' },
    { path: '/trade/add', text: 'Add Trade' },
    { path: '/trade/delete', text: 'Delete Trade' },
    { path: '/login', text: 'Login' },
    { path: '/register', text: 'Register' },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  if (!user) {
    redirect('/home');
  }

  return (
    <nav className="w-50">
      <div className="flex flex-col justify-around items-center m-3">
        <h1 className="text-3xl">Trade Tracker</h1>
        <h2 className="text-xl">
          Welcome
          {' '}
          { user ? user.name : 'Guest'}
        </h2>
        <div className="navbar-nav mx-auto">
          <ul>
            {links.map((link) => (
              <li key={link.path}>
                <Link to={link.path}>{link.text}</Link>
              </li>
            ))}
            <button type="button" onClick={handleLogout}>Logout</button>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
