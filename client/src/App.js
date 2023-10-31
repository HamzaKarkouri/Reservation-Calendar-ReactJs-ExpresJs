

import './App.css';
import Sidebar from './Sidebar';
import Header from './Header';
import Calendar from './calendar2';
import Workers from './Workers';
import Rooms from './Rooms';
import { useState } from 'react';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';



function App() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };
  return (
   <div className='container'>
    <div className="App">
      <header className="App-header">
     
      <Routes>
      <Route exact path="/" element={<Calendar />} />
      <Route path="/workers" element={<Workers />} />
      <Route path="/rooms" element={<Rooms searchValue={searchValue}/>} />
      </Routes>
   
     
    </header>
      
    </div>
    <Header onSearchChange={handleSearchChange} /> 
    <Sidebar />
    </div>
  );
}

export default App;
