import React from 'react';
import { Container, Form, FormControl } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';

import './Header.css'; 

const Header  = ({ onSearchChange }) => {
   

  const getTitle = () => {
    const path = window.location.pathname;

    if (path === '/') {
      return 'Calendrier de réservation';
    } else if (path === '/workers') {
      return 'Workers';
    } else if (path === '/rooms') {
      return 'Clients';
    } else {
      return 'Calendrier de réservation'; 
    }
  };
  const handleInputChange = (event) => {
    onSearchChange(event);
  };

  return (
    <div className="top-bar">
      <Container>
        <Form className="search-form">
          <BsSearch />
          <FormControl type="search" placeholder="Search" className="mr-2" onChange={handleInputChange}/>
        </Form>
      </Container>
      <h1 className="title">{getTitle()}</h1> {  }
     
    </div>
  );
};

export default Header;
