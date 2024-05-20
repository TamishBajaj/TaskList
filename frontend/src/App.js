import React ,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import EditTask from './components/EditTask';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskManager from './components/TaskManager';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {


  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  console.log(isAuthenticated);
  const handleLogin = () => {
    // Simulate authentication logic here
    localStorage.setItem('token', 'sample_token');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/signup" element={<Signup />} />
        <Route path="/task-manager" element={isAuthenticated ? <TaskManager onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/task-list" element={isAuthenticated ? <TaskList /> : <Navigate to="/login" />} />
        <Route path="/edit-task/:id" element={isAuthenticated ? <EditTask /> : <Navigate to="/login" />} />
        <Route path="/task-form" element={isAuthenticated ? <TaskForm /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/task-manager" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
