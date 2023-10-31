
import Login from './login';
import App from './App';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';

function App2() {
  return (
   
    <div className="App">
      <header className="App-header">
     
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route exact path="/*" element={
      
        <App/>
      
      } />
    
     
      
    </Routes>
   
     
    </header>
      
    </div>
  );
}

export default App2;
