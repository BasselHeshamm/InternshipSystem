import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form, Badge, Modal } from "react-bootstrap";
import { FaBuilding, FaClock, FaMoneyBillWave, FaMapMarkerAlt, FaGraduationCap, FaCalendarAlt, FaUsers, FaCheck } from "react-icons/fa";
import NavigationButtons from '../Components/NavigationButtons';

function BrowseInternships({ onApply }) {
  const [filters, setFilters] = useState({
    industry: "",
    duration: "",
    paymentType: ""
  });

  const [selectedInternship, setSelectedInternship] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Available industries
  const industries = [
    "Information Technology",
    "Engineering",
    "Business & Management",
    "Design & Creative",
    "Marketing & Communications",
    "Finance & Banking",
    "Healthcare & Pharmaceuticals",
    "Education & Training",
    "Research & Development",
    "Manufacturing & Production"
  ];

  // Duration options
  const durations = [
    "1-3 months",
    "3-6 months",
    "6-12 months",
    "12+ months"
  ];

  // Payment types
  const paymentTypes = [
    "Paid",
    "Unpaid",
    "Stipend"
  ];

  // Enhanced dummy data for internships
  const internships = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "Tech Solutions",
      industry: "Information Technology",
      duration: "3-6 months",
      paymentType: "Paid",
      expectedSalary: "$25-30 per hour",
      location: "New York, NY",
      description: "Join our team to work on cutting-edge web applications.",
      requirements: ["React", "JavaScript", "HTML/CSS"],
      responsibilities: [
        "Develop and maintain user-facing features",
        "Build reusable components and libraries",
        "Optimize applications for maximum speed and scalability",
        "Collaborate with backend developers"
      ],
      benefits: [
        "Competitive salary",
        "Flexible working hours",
        "Remote work options",
        "Professional development opportunities"
      ],
      startDate: "2024-06-01",
      applicationDeadline: "2024-05-15",
      positionsAvailable: 2,
      minimumGPA: 3.0,
      requiredSemester: "5th semester or higher",
      companyDescription: "Tech Solutions is a leading software development company specializing in enterprise solutions.",
      companySize: "100-500 employees",
      companyWebsite: "https://techsolutions.com"
    },
    {
      id: 2,
      title: "Marketing Intern",
      company: "Global Marketing",
      industry: "Marketing & Communications",
      duration: "6-12 months",
      paymentType: "Stipend",
      expectedSalary: "$1,500 monthly stipend",
      location: "Remote",
      description: "Help create and execute marketing campaigns.",
      requirements: ["Social Media", "Content Creation", "Analytics"],
      responsibilities: [
        "Assist in developing marketing strategies",
        "Create engaging social media content",
        "Analyze campaign performance",
        "Support event planning and execution"
      ],
      benefits: [
        "Monthly stipend",
        "Networking opportunities",
        "Mentorship program",
        "Potential full-time offer"
      ],
      startDate: "2024-07-01",
      applicationDeadline: "2024-06-15",
      positionsAvailable: 3,
      minimumGPA: 2.8,
      requiredSemester: "4th semester or higher",
      companyDescription: "Global Marketing is a full-service marketing agency helping brands reach their target audience.",
      companySize: "50-100 employees",
      companyWebsite: "https://globalmarketing.com"
    },
    {
      id: 3,
      title: "Engineering Intern",
      company: "Innovatech",
      industry: "Engineering",
      duration: "3-6 months",
      paymentType: "Paid",
      expectedSalary: "$28-35 per hour",
      location: "Boston, MA",
      description: "Work on innovative engineering projects.",
      requirements: ["CAD", "Project Management", "Technical Documentation"],
      responsibilities: [
        "Assist in product design and development",
        "Create technical documentation",
        "Participate in project meetings",
        "Conduct research and analysis"
      ],
      benefits: [
        "Competitive salary",
        "Health insurance",
        "Professional development",
        "On-site gym access"
      ],
      startDate: "2024-08-01",
      applicationDeadline: "2024-07-15",
      positionsAvailable: 1,
      minimumGPA: 3.2,
      requiredSemester: "6th semester or higher",
      companyDescription: "Innovatech is a technology company focused on developing cutting-edge engineering solutions.",
      companySize: "200-500 employees",
      companyWebsite: "https://innovatech.com"
    }
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectInternship = (internship) => {
    setSelectedInternship(internship);
    setShowDetails(true);
  };

  const handleApply = (internship) => {
    onApply(internship);
    setShowDetails(false);
  };

  const filteredInternships = internships.filter(internship => {
    return (
      (filters.industry === "" || internship.industry === filters.industry) &&
      (filters.duration === "" || internship.duration === filters.duration) &&
      (filters.paymentType === "" || internship.paymentType === filters.paymentType)
    );
  });

  return (
    <Container>
      <NavigationButtons />
      <h2 className="mb-4">Browse Internships</h2>

      {/* Filters */}
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label><FaBuilding className="me-2" />Industry</Form.Label>
                <Form.Select
                  name="industry"
                  value={filters.industry}
                  onChange={handleFilterChange}
                >
                  <option value="">All Industries</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label><FaClock className="me-2" />Duration</Form.Label>
                <Form.Select
                  name="duration"
                  value={filters.duration}
                  onChange={handleFilterChange}
                >
                  <option value="">All Durations</option>
                  {durations.map(duration => (
                    <option key={duration} value={duration}>
                      {duration}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label><FaMoneyBillWave className="me-2" />Payment Type</Form.Label>
                <Form.Select
                  name="paymentType"
                  value={filters.paymentType}
                  onChange={handleFilterChange}
                >
                  <option value="">All Payment Types</option>
                  {paymentTypes.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Internship Listings */}
      <Row>
        {filteredInternships.map(internship => (
          <Col md={6} key={internship.id} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{internship.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {internship.company}
                </Card.Subtitle>
                <div className="mb-3">
                  <Badge bg="primary" className="me-2">
                    {internship.industry}
                  </Badge>
                  <Badge bg="info" className="me-2">
                    {internship.duration}
                  </Badge>
                  <Badge bg={internship.paymentType === "Paid" ? "success" : "warning"}>
                    {internship.paymentType}
                  </Badge>
                </div>
                <Card.Text>
                  <strong>Location:</strong> {internship.location}
                  <br />
                  <strong>Description:</strong> {internship.description}
                  <br />
                  <strong>Requirements:</strong>
                  <div className="mt-2">
                    {internship.requirements.map((req, index) => (
                      <Badge key={index} bg="light" text="dark" className="me-1 mb-1">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </Card.Text>
                <Button 
                  variant="primary"
                  onClick={() => handleSelectInternship(internship)}
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Internship Details Modal */}
      <Modal show={showDetails} onHide={() => setShowDetails(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedInternship?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedInternship && (
            <>
              <div className="mb-4">
                <h5>{selectedInternship.company}</h5>
                <div className="mb-3">
                  <Badge bg="primary" className="me-2">
                    {selectedInternship.industry}
                  </Badge>
                  <Badge bg="info" className="me-2">
                    {selectedInternship.duration}
                  </Badge>
                  <Badge bg={selectedInternship.paymentType === "Paid" ? "success" : "warning"}>
                    {selectedInternship.paymentType}
                  </Badge>
                  {selectedInternship.paymentType !== "Unpaid" && (
                    <Badge bg="success" className="ms-2">
                      {selectedInternship.expectedSalary}
                    </Badge>
                  )}
                </div>
              </div>

              <Row>
                <Col md={6}>
                  <h6><FaMapMarkerAlt className="me-2" />Location</h6>
                  <p>{selectedInternship.location}</p>

                  <h6><FaCalendarAlt className="me-2" />Timeline</h6>
                  <p>
                    Start Date: {selectedInternship.startDate}<br />
                    Application Deadline: {selectedInternship.applicationDeadline}
                  </p>

                  <h6><FaUsers className="me-2" />Positions</h6>
                  <p>{selectedInternship.positionsAvailable} position(s) available</p>

                  <h6><FaGraduationCap className="me-2" />Requirements</h6>
                  <p>
                    Minimum GPA: {selectedInternship.minimumGPA}<br />
                    Required Semester: {selectedInternship.requiredSemester}
                  </p>
                </Col>
                <Col md={6}>
                  <h6>Company Description</h6>
                  <p>{selectedInternship.companyDescription}</p>
                  <p>Company Size: {selectedInternship.companySize}</p>
                  <a href={selectedInternship.companyWebsite} target="_blank" rel="noopener noreferrer">
                    Visit Company Website
                  </a>
                </Col>
              </Row>

              <hr />

              <h6>Responsibilities</h6>
              <ul>
                {selectedInternship.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>

              <h6>Benefits</h6>
              <ul>
                {selectedInternship.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>

              <h6>Required Skills</h6>
              <div className="mb-3">
                {selectedInternship.requirements.map((req, index) => (
                  <Badge key={index} bg="light" text="dark" className="me-1 mb-1">
                    {req}
                  </Badge>
                ))}
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetails(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleApply(selectedInternship)}>
            <FaCheck className="me-2" />
            Apply Now
          </Button>
        </Modal.Footer>
      </Modal>

      {filteredInternships.length === 0 && (
        <div className="text-center mt-4">
          <p>No internships found matching your criteria.</p>
          <Button 
            variant="outline-primary"
            onClick={() => setFilters({ industry: "", duration: "", paymentType: "" })}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </Container>
  );
}

export default BrowseInternships;
