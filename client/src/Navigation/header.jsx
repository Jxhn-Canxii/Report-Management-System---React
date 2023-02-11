import React from 'react';
import { Link } from 'react-router-dom';
import { setLogout } from "../State";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt,faHome,faUsers,faBars } from '@fortawesome/free-solid-svg-icons';
import profile from '../assets/images/user.png';
import logo from '../assets/images/widia_logo.jpeg';

const Sidebar = () => {
  const dispatch = useDispatch();
  return (
    <>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button">
             <FontAwesomeIcon icon={faBars}/>
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
        </ul>
        <form className="form-inline ml-3">
          <div className="input-group input-group-sm">
            <input
              className="form-control form-control-navbar"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn btn-navbar" type="submit">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </form>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link onClick={() => dispatch(setLogout())} className="nav-link">
              <FontAwesomeIcon icon={faSignOutAlt} />
            </Link>
          </li>
        </ul>
      </nav>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">q
        <Link className="brand-link">
          <img
            src={logo}
            alt="Company Logo"
            className="brand-image img-circle elevation-3"
          />
          <span className="brand-text font-weight-light">WIDIA</span>
        </Link>

        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src={profile}
                alt="User Profile"
                className="img-circle elevation-2"
              />
            </div>
            <div className="info">
              <Link className="d-block">Admin</Link>
            </div>
          </div>
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column">
              <li className="nav-item">
                <Link to="/home" className="nav-link" data-widget="pushmenu" href="#" role="button">
                  <FontAwesomeIcon icon={faHome} className="nav-icon" />
                  <p>Home</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/employee" className="nav-link">
                  <FontAwesomeIcon icon={faUsers} className="nav-icon" />
                  <p>Users</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  onClick={() => dispatch(setLogout())}
                  className="nav-link"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" />
                  <p>Logout</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
