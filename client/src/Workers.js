import './Workers.css';
import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import { BsTrash, BsPencil } from 'react-icons/bs';
import { BiPlus } from 'react-icons/bi';
import axios from 'axios';

const Workers = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [phone, setPhone] = useState('');
  const [editingWorker, setEditingWorker] = useState(null);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingWorker(null);
    setName('');
    setPosition('');
    setPhone('');


  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editingWorker) {
        
        await axios.put(`http://localhost:3008/wor/workers/${editingWorker._id}`, {
          name,
          phone,
          position,
        });
      } else {
        // Create new worker
        await axios.post('http://localhost:3008/wor/workers', {
          name,
          phone,
          position,
        });
      }

      fetchWorkers();
      handleCloseModal();
    } catch (error) {
      console.error('Error creating/editing worker:', error);
    }
  };

  const handleEdit = (worker) => {
    setEditingWorker(worker);
    setName(worker.name);
    setPhone(worker.phone);
    setPosition(worker.position);
    handleShowModal();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3008/wor/workers/${id}`);
      fetchWorkers();
    } catch (error) {
      console.error('Error deleting worker:', error);
    }
  };

  const [workers, setWorkers] = useState([]);
  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const response = await axios.get('http://localhost:3008/wor/workers');
      setWorkers(response.data);
    } catch (error) {
      console.error('Error fetching workers:', error);
    }
  };

  return (
    <div className='container4'>
      <Table striped bordered hover>
        <thead className='table-dark'>
          <tr>
            <th>Name</th>
            <th>N° de téléphone</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((worker) => (
            <tr key={worker.id}>
              <td>{worker.name}</td>
              <td>{worker.phone}</td>
              <td>{worker.position}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(worker._id)}>
                  <BsTrash /> Delete
                </Button>
                <Button variant="primary" onClick={() => handleEdit(worker)}>
                  <BsPencil /> Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button className='add' variant="primary" onClick={handleShowModal}>
        <BiPlus className="mr-2" /> Add Worker
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingWorker ? 'Edit Worker' : 'Add Worker'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPosition">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                name="position"
                placeholder="Enter position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {editingWorker ? 'Update Worker' : 'Create Worker'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Workers;
