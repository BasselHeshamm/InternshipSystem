import { useState, useEffect } from 'react';
import {
  getApplications, getInternships, getReports,
  getWorkshops, getCompanies, createReport,
  applyToInternship, appealReport, updateCompanyStatus,
  updateAppStatus, createInternship, deleteInternship,
} from '../services/api';

// ── STUDENT HOOK ──
export function useStudentData() {
  const [applications, setApplications] = useState([]);
  const [internships,  setInternships]  = useState([]);
  const [reports,      setReports]      = useState([]);
  const [workshops,    setWorkshops]    = useState([]);
  const [loading,      setLoading]      = useState(true);

  useEffect(() => {
    Promise.all([
      getApplications().catch(() => ({ data: [] })),
      getInternships().catch(() => ({ data: [] })),
      getReports().catch(() => ({ data: [] })),
      getWorkshops().catch(() => ({ data: [] })),
    ]).then(([apps, ints, reps, works]) => {
      if (apps.data.length)   setApplications(apps.data);
      if (ints.data.length)   setInternships(ints.data);
      if (reps.data.length)   setReports(reps.data);
      if (works.data.length)  setWorkshops(works.data.map(w => ({ ...w, registered: false, completed: false, type: 'live' })));
    }).finally(() => setLoading(false));
  }, []);

  const submitReport = async (title, body) => {
    const res = await createReport({ studentName: 'Student', internshipId: 1, company: 'My Company', title, body, finalized: true });
    setReports(prev => [res.data, ...prev]);
    return res.data;
  };

  const submitAppeal = async (reportId, message) => {
    await appealReport(reportId, message);
    setReports(prev => prev.map(r => (r._id || r.id) === reportId ? { ...r, appeal: { message, status: 'pending' } } : r));
  };

  const applyTo = async (internshipId, title) => {
    await applyToInternship({ internshipId });
  };

  return { applications, internships, reports, workshops, loading, submitReport, submitAppeal, applyTo, setReports, setWorkshops };
}

// ── COMPANY HOOK ──
export function useCompanyData() {
  const [internships,  setInternships]  = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading,      setLoading]      = useState(true);

  useEffect(() => {
    Promise.all([
      getInternships().catch(() => ({ data: [] })),
      getApplications().catch(() => ({ data: [] })),
    ]).then(([ints, apps]) => {
      if (ints.data.length)  setInternships(ints.data);
      if (apps.data.length)  setApplications(apps.data);
    }).finally(() => setLoading(false));
  }, []);

  const postInternship = async (form) => {
    const res = await createInternship({ title: form.title, description: form.description, duration: form.duration, isPaid: form.paid, salary: form.salary, skills: form.skills });
    setInternships(prev => [res.data, ...prev]);
  };

  const removeInternship = async (id) => {
    await deleteInternship(id);
    setInternships(prev => prev.filter(i => i.id !== id));
  };

  const changeAppStatus = async (appId, status) => {
    await updateAppStatus(appId, status);
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status } : a));
  };

  return { internships, applications, loading, postInternship, removeInternship, changeAppStatus, setInternships, setApplications };
}

// ── SCAD COMPANY HOOK ──
export function useScadCompanyData() {
  const [companies, setCompanies] = useState([]);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    getCompanies()
      .then(res => { if (res.data.length) setCompanies(res.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const changeStatus = async (id, status) => {
    await updateCompanyStatus(id, status);
    setCompanies(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  };

  return { companies, loading, changeStatus };
}
