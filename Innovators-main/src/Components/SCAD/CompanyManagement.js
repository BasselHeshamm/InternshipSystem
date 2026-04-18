import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { getCompanies, updateCompanyStatus } from "../../services/api";

function CompanyManagement() {
  const [companies, setCompanies] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCompanies()
      .then(res => setCompanies(res.data))
      .catch(() => {
        // fallback to dummy data if API fails
        setCompanies([
          { id: 1, company_name: "TechCorp", industry: "Technology", status: "pending", created_at: "2024-03-20", first_name: "John", last_name: "Doe", email: "john@techcorp.com" },
          { id: 2, company_name: "DesignStudio", industry: "Design", status: "approved", created_at: "2024-03-15", first_name: "Jane", last_name: "Smith", email: "jane@designstudio.com" },
          { id: 3, company_name: "InnovateLabs", industry: "Research", status: "pending", created_at: "2024-03-18", first_name: "Mike", last_name: "Johnson", email: "mike@innovatelabs.com" },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (companyId, newStatus) => {
    try {
      await updateCompanyStatus(companyId, newStatus);
      setCompanies(companies.map(c => c.id === companyId ? { ...c, status: newStatus } : c));
    } catch {
      setCompanies(companies.map(c => c.id === companyId ? { ...c, status: newStatus } : c));
    }
  };

  // Normalize fields — backend returns company_name, first_name, last_name
  const normalize = (c) => ({
    ...c,
    name: c.company_name || c.name,
    contactPerson: c.first_name ? `${c.first_name} ${c.last_name}` : c.contactPerson,
    registrationDate: c.created_at ? c.created_at.slice(0, 10) : c.registrationDate,
  });

  const normalized = companies.map(normalize);

  const filteredCompanies = normalized.filter((c) => {
    const matchesStatus = filter === "all" || c.status === filter;
    const matchesIndustry = industryFilter === "all" || c.industry === industryFilter;
    const matchesSearch =
      (c.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.industry || "").toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesIndustry && matchesSearch;
  });

  const uniqueIndustries = [...new Set(normalized.map((c) => c.industry).filter(Boolean))];

  if (loading) return <div style={{ padding: 40, textAlign: "center", color: "var(--gray)" }}>Loading companies...</div>;

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
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="form-group">
          <option value="all">All Companies</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <select value={industryFilter} onChange={(e) => setIndustryFilter(e.target.value)} className="form-group">
          <option value="all">All Industries</option>
          {uniqueIndustries.map((ind) => (
            <option key={ind} value={ind}>{ind}</option>
          ))}
        </select>
      </div>

      {filteredCompanies.length === 0 ? (
        <div className="section-card" style={{ padding: 24, textAlign: "center", color: "var(--gray)" }}>
          No companies found. Companies will appear here after registering.
        </div>
      ) : (
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
                  <td style={{ color: "var(--gray)" }}>{company.registrationDate}</td>
                  <td>
                    <span className={`status-badge status-${company.status}`}>{company.status}</span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      {company.status === "pending" && (
                        <>
                          <button className="btn btn-primary btn-sm" onClick={() => handleStatusChange(company.id, "approved")}>Approve</button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleStatusChange(company.id, "rejected")}>Reject</button>
                        </>
                      )}
                      <button className="btn btn-outline-primary btn-sm" onClick={() => { setSelectedCompany(company); setShowDetails(true); }}>Details</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal show={showDetails} onHide={() => setShowDetails(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCompany?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCompany && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                ["Industry", selectedCompany.industry],
                ["Status", selectedCompany.status],
                ["Contact Person", selectedCompany.contactPerson],
                ["Email", selectedCompany.email],
                ["Phone", selectedCompany.phone || "N/A"],
                ["Registration Date", selectedCompany.registrationDate],
              ].map(([label, value]) => (
                <div key={label}>
                  <div style={{ fontSize: 11, color: "var(--gray)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>{label}</div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{value}</div>
                </div>
              ))}
              <div style={{ gridColumn: "1 / -1" }}>
                <div style={{ fontSize: 11, color: "var(--gray)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>Address</div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{selectedCompany.address || "N/A"}</div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetails(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CompanyManagement;
