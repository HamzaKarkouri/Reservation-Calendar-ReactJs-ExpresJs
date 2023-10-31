import './Workers.css';
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

import axios from 'axios';

const Workers  = ({ searchValue }) => {
  const [workers, setWorkers] = useState([]);
  const filteredWorkers = searchValue
    ? workers.filter((worker) =>
        worker.name.toLowerCase() === searchValue.toLowerCase()
      )
    : workers;

  



  

  
  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const response = await axios.get('http://localhost:3008/api/events');
      setWorkers(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  return (
    <div className='container4'>
      <Table striped bordered hover>
        <thead className='table-dark'>
          <tr>
            <th>Client</th>
            <th>Séance</th>
            <th>Worker</th>
            <th>Salle</th>
           
            <th>Début</th>
            <th>Fin</th>
          </tr>
        </thead>
        <tbody>
        {filteredWorkers.map((worker) => (
            <tr key={worker.id}>
              <td>{worker.name}</td>
              <td>{worker.title}</td>
              <td>{worker.worker}</td>
              <td>{worker.room}</td>
              <td>{worker.startTime}</td>
              <td>{worker.endTime}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      
    </div>
  );
};

export default Workers;
