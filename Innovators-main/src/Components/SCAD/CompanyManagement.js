import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

function CompanyManagement() {
  const [companies, setCompanies] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setCompanies([
      {
        id: 1,
        name: "TechCorp",
        industry: "Technology",
        status: "pending",
        registrationDate: "2024-03-20",
        contactPerson: "John Doe",
        email: "john@techcorp.com",
        phone: "123-456-7890",
        address: "123 Silicon Valley",
      },
      {
        id: 2,
        name: "DesignStudio",
        industry: "Design",
        status: "approved",
        registrationDate: "2024-03-15",
        contactPerson: "Jane Smith",
        email: "jane@designstudio.com",
        phone: "234-567-8901",
        address: "456 Creative Street",
      },
      {
        id: 3,
        name: "InnovateLabs",
        industry: "Research",
        status: "pending",
        registrationDate: "2024-03-18",
        contactPerson: "Mike Johnson",
        email: "mike@innovatelabs.com",
        phone: "345-678-9012",
        address: "789 Innovation Road",
      },
    ]);
  }, []);

  const handleStatusChange = (companyId, newStatus) => {
    setCompanies(
      companies.map((c) =>
        c.id === companyId ? { ...c, status: newStatus } : c,
      ),
    );
  };

  const filteredCompanies = companies.filter((c) => {
    const matchesStatus = filter === "all" || c.status === filter;
    const matchesIndustry =
      industryFilter === "all" || c.industry === industryFilter;
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesIndustry && matchesSearch;
  });

  const uniqueIndustries = [...new Set(companies.map((c) => c.industry))];

  return (
    <div>
      <div className="filter-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search companies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="form-group"
        >
          <option value="all">All Companies</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <select
          value={industryFilter}
          onChange={(e) => setIndustryFilter(e.target.value)}
          className="form-group"
        >
          <option value="all">All Industries</option>
          {uniqueIndustries.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </select>
      </div>

      <div className="section-card" style={{ padding: 0 }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Industry</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Registered</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.map((company) => (
              <tr key={company.id}>
                <td style={{ fontWeight: 600 }}>{company.name}</td>
                <td style={{ color: "var(--gray)" }}>{company.industry}</td>
                <td>{company.contactPerson}</td>
                <td style={{ color: "var(--gray)" }}>{company.email}</td>
                <td style={{ color: "var(--gray)" }}>
                  {company.registrationDate}
                </td>
                <td>
                  <span className={`status-badge status-${company.status}`}>
                    {company.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    {company.status === "pending" && (
                      <>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() =>
                            handleStatusChange(company.id, "approved")
                          }
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleStatusChange(company.id, "rejected")
                          }
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => {
                        setSelectedCompany(company);
                        setShowDetails(true);
                      }}
                    >
                      Details
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showDetails} onHide={() => setShowDetails(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCompany?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCompany && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              {[
                ["Industry", selectedCompany.industry],
                ["Status", selectedCompany.status],
                ["Contact Person", selectedCompany.contactPerson],
                ["Email", selectedCompany.email],
                ["Phone", selectedCompany.phone || "N/A"],
                ["Registration Date", selectedCompany.registrationDate],
              ].map(([label, value]) => (
                <div key={label}>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--gray)",
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      marginBottom: 3,
                    }}
                  >
                    {label}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{value}</div>
                </div>
              ))}
              <div style={{ gridColumn: "1 / -1" }}>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--gray)",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    marginBottom: 3,
                  }}
                >
                  Address
                </div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>
                  {selectedCompany.address || "N/A"}
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetails(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CompanyManagement;
