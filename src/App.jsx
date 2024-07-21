import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Test from './components/Test';
import NavScrollExample from './components/Navbar';
import BlogPost from './components/BlogPost';
import SearchResults from './components/SearchResults';
import AddPost from './components/AddPost';
import PostDetail from './components/PostDetails';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './components/context/AuthContext.jsx'; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavScrollExample />
        <Routes>
          <Route path="/" element={<Navigate to="/post" />} />
          <Route path="/autori" element={<Test />} />
          <Route path="/post" element={<BlogPost />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/add-post" element={
            <ProtectedRoute>
              <AddPost />
            </ProtectedRoute>
          } />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
