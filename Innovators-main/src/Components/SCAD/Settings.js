import React, { useState, useEffect } from "react";

function Settings() {
  const [settings, setSettings] = useState({
    currentCycle: {
      startDate: "",
      endDate: "",
      applicationDeadline: "",
      reportDeadline: "",
    },
    nextCycle: {
      startDate: "",
      endDate: "",
      applicationDeadline: "",
      reportDeadline: "",
    },
    notificationSettings: {
      emailNotifications: true,
      reportReminders: true,
      applicationDeadlineReminders: true,
    },
  });

  useEffect(() => {
    setSettings({
      currentCycle: {
        startDate: "2024-01-15",
        endDate: "2024-04-15",
        applicationDeadline: "2023-12-15",
        reportDeadline: "2024-04-30",
      },
      nextCycle: {
        startDate: "2024-06-01",
        endDate: "2024-08-31",
        applicationDeadline: "2024-05-15",
        reportDeadline: "2024-09-15",
      },
      notificationSettings: {
        emailNotifications: true,
        reportReminders: true,
        applicationDeadlineReminders: true,
      },
    });
  }, []);

  const handleDateChange = (cycle, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [cycle]: { ...prev[cycle], [field]: value },
    }));
  };

  const handleNotificationChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      notificationSettings: { ...prev.notificationSettings, [field]: value },
    }));
  };

  const CycleCard = ({ cycleKey, title }) => (
    <div className="section-card settings-section" style={{ marginBottom: 20 }}>
      <h3
        style={{
          fontFamily: "Playfair Display, serif",
          fontSize: 18,
          fontWeight: 700,
          marginBottom: 20,
        }}
      >
        {title}
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {[
          ["startDate", "Start Date"],
          ["endDate", "End Date"],
          ["applicationDeadline", "Application Deadline"],
          ["reportDeadline", "Report Deadline"],
        ].map(([field, label]) => (
          <div key={field} className="form-group">
            <label>{label}</label>
            <input
              type="date"
              value={settings[cycleKey][field]}
              onChange={(e) =>
                handleDateChange(cycleKey, field, e.target.value)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <CycleCard cycleKey="currentCycle" title="Current Internship Cycle" />
      <CycleCard cycleKey="nextCycle" title="Next Internship Cycle" />

      <div
        className="section-card settings-section"
        style={{ marginBottom: 24 }}
      >
        <h3
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 20,
          }}
        >
          Notification Settings
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            ["emailNotifications", "Enable Email Notifications"],
            ["reportReminders", "Send Report Reminders"],
            [
              "applicationDeadlineReminders",
              "Send Application Deadline Reminders",
            ],
          ].map(([field, label]) => (
            <label
              key={field}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              <input
                type="checkbox"
                checked={settings.notificationSettings[field]}
                onChange={(e) =>
                  handleNotificationChange(field, e.target.checked)
                }
                style={{ accentColor: "var(--red)", width: 16, height: 16 }}
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      <button
        className="btn btn-primary"
        onClick={() => alert("Settings saved successfully!")}
      >
        Save Settings
      </button>
    </div>
  );
}

export default Settings;
