import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/img/argentbanklogo.webp';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

function Header() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/sign-in');
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {user ? (
          <>
            <span className="main-nav-item">{user.userName}</span>
            <Link className="main-nav-item" to="/" onClick={handleLogout}>
              <i className="fa fa-user-circle"></i>
              Sign out
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;
