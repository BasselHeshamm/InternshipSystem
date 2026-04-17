import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHome } from "react-icons/fa";

function NavigationButtons() {
  const navigate = useNavigate();

  return (
    <div className="navigation-buttons mb-4">
      <Button
        variant="outline-primary"
        className="me-2"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="me-2" /> Back
      </Button>
      <Button variant="outline-primary" onClick={() => navigate("/")}>
        <FaHome className="me-2" /> Home
      </Button>
    </div>
  );
}

export default NavigationButtons;
