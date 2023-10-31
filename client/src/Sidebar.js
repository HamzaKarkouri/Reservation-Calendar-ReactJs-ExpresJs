import React from 'react';
import { BsHouseDoorFill, BsPeopleFill, BsGridFill, BsFillPersonFill } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css'; 
const accountImage = require('./profile.jpg');

const Sidebar = () => {
  const isActivePage = (path) => {
    return window.location.pathname === path;
  };

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <h2 className="sidebar-website">AdminBookings</h2>
      </div>
      <div className="sidebar-menu">
        <ul className="sidebar-list">
          <li>
            <a href="/" className="sidebar-item" style={isActivePage('/') ? { backgroundColor: '#6462628a' } : {}}>
              <IconContext.Provider value={{ className: 'sidebar-icon' }}>
                <BsHouseDoorFill />
              </IconContext.Provider>
              Home
            </a>
          </li>
          <li>
            <a href="/workers" className="sidebar-item" style={isActivePage('/workers') ? { backgroundColor: '#6462628a' } : {}}>
              <IconContext.Provider value={{ className: 'sidebar-icon' }}>
                <BsPeopleFill />
              </IconContext.Provider>
              Workers
            </a>
          </li>
          <li>
            <a href="/rooms" className="sidebar-item" style={isActivePage('/rooms') ? { backgroundColor: '#6462628a' } : {}}>
              <IconContext.Provider value={{ className: 'sidebar-icon' }}>
                <BsGridFill />
              </IconContext.Provider>
              Clients
            </a>
          </li>
        </ul>
      </div>
      <div className="sidebar-bottom">
        <div className="sidebar-divider"></div>
        <div className="account-container">
          <div className="account-image">
            <img src={accountImage} alt="Account" />
          </div>
          <Dropdown drop="up">
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Hamza Karkouri
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-dark">
              <Dropdown.Item>Action</Dropdown.Item>
              <Dropdown.Item>Another action</Dropdown.Item>
              <Dropdown.Item>Something else here</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Log out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
