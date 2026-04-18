import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import StudentDashboard from "./Pages/StudentDashboard";
import CompanyDashboard from "./Pages/CompanyDashboard";
import SCADDashboard from "./Pages/SCADDashboard";
import FacultyDashboard from "./Pages/FacultyDashboard";
import BrowseInternships from "./Pages/BrowseInternships";
import NotFound from "./Components/NotFound";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/student-register" element={<Register />} />
            <Route path="/company-register" element={<Register />} />
            <Route path="/faculty-register" element={<Register />} />
            <Route path="/scad-register" element={<Register />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/company-dashboard" element={<CompanyDashboard />} />
            <Route path="/scad-dashboard/*" element={<SCADDashboard />} />
            <Route path="/faculty-dashboard/*" element={<FacultyDashboard />} />
            <Route path="/browse-internships" element={<BrowseInternships />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
