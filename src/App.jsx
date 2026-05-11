import React, { useMemo, useState } from "react";
import logo from "./assets/logo.png";

const CLUB_NAME = "Victoria Bowling Club, Torrance";
const DEFAULT_MEMBER_PIN = "1234";
const DEFAULT_ADMIN_PIN = "2059";

const SECTION_NAMES = {
  home: "Home",
  diary: "Diary",
  notices: "Noticeboard",
  competitions: "Competitions",
  members: "Members",
  office: "Office Bearers",
  coaches: "Club Coaches",
  documents: "Documents",
  admin: "Admin",
};

const TABS = [
  "home",
  "diary",
  "notices",
  "competitions",
  "members",
  "office",
  "coaches",
  "documents",
  "admin",
];

function nextId(items) {
  return items.length ? Math.max(...items.map((x) => x.id)) + 1 : 1;
}

function loadData(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: 16,
    fontFamily: "Arial, sans-serif",
    background:
      "linear-gradient(180deg, #112d5c 0%, #2b5f96 48%, #69c0e5 100%)",
    color: "#1f1f1f",
  },
  wrap: { maxWidth: 1180, margin: "0 auto" },
  loginPanel: {
    maxWidth: 390,
    margin: "70px auto",
    background: "#ffffff",
    borderRadius: 18,
    padding: 26,
    textAlign: "center",
    boxShadow: "0 10px 24px rgba(0,0,0,0.22)",
  },
  header: {
    background:
      "linear-gradient(135deg, #1b2f72 0%, #355f9d 55%, #68c1e6 100%)",
    color: "#ffffff",
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
    boxShadow: "0 10px 24px rgba(0,0,0,0.22)",
  },
  headerRow: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    flexWrap: "wrap",
  },
  logo: {
    width: 78,
    height: 78,
    objectFit: "contain",
    background: "#ffffff",
    borderRadius: "50%",
    padding: 4,
  },
  title: { margin: 0, fontSize: 30 },
  subtitle: { margin: "6px 0 0 0", fontSize: 16 },
  tabs: {
    display: "flex",
    gap: 10,
    marginBottom: 18,
    flexWrap: "wrap",
  },
  tab: (active) => ({
    padding: "11px 18px",
    borderRadius: 10,
    border: active ? "2px solid #ffffff" : "2px solid #cfd6dc",
    background: active ? "#1b2f72" : "#f4f7fa",
    color: active ? "#ffffff" : "#1f1f1f",
    fontWeight: "bold",
    cursor: "pointer",
  }),
  panel: {
    background: "#ffffff",
    borderRadius: 18,
    padding: 22,
    marginBottom: 18,
    boxShadow: "0 8px 20px rgba(0,0,0,0.16)",
  },
  card: {
    background: "#f8fbfd",
    border: "1px solid #d7e3ec",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  input: {
    width: "100%",
    padding: 12,
    marginTop: 10,
    borderRadius: 10,
    border: "2px solid #bfc7cf",
    boxSizing: "border-box",
    fontSize: 16,
    backgroundColor: "#ffffff",
    color: "#000000",
    WebkitTextFillColor: "#000000",
    outline: "none",
  },
  textarea: {
    width: "100%",
    padding: 12,
    marginTop: 10,
    borderRadius: 10,
    border: "2px solid #bfc7cf",
    boxSizing: "border-box",
    fontSize: 16,
    minHeight: 100,
    resize: "vertical",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#ffffff",
    color: "#000000",
    WebkitTextFillColor: "#000000",
    outline: "none",
  },
  button: {
    marginTop: 12,
    padding: "12px 16px",
    borderRadius: 10,
    border: "none",
    background: "#1b2f72",
    color: "#ffffff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  smallButton: {
    padding: "8px 12px",
    borderRadius: 8,
    border: "none",
    background: "#1b2f72",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "bold",
    marginRight: 8,
    marginTop: 8,
  },
  deleteButton: {
    padding: "8px 12px",
    borderRadius: 8,
    border: "none",
    background: "#9d1f2f",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "bold",
    marginRight: 8,
    marginTop: 8,
  },
  formBox: {
    background: "#eef7fc",
    border: "1px solid #cfe0ea",
    borderRadius: 14,
    padding: 14,
    marginBottom: 18,
  },
};

export default function App() {
  const [memberPin, setMemberPin] = useState(
    localStorage.getItem("victoria_member_pin") || DEFAULT_MEMBER_PIN
  );
  const [realAdminPin, setRealAdminPin] = useState(
    localStorage.getItem("victoria_admin_pin") || DEFAULT_ADMIN_PIN
  );

  const [pin, setPin] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState("home");

  const [adminPin, setAdminPin] = useState("");
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [newMemberPin, setNewMemberPin] = useState("");
  const [newAdminPin, setNewAdminPin] = useState("");

  const [diaryItems, setDiaryItems] = useState(() =>
    loadData("victoria_diary", [])
  );
  const [notices, setNotices] = useState(() =>
    loadData("victoria_notices", [])
  );
  const [competitions, setCompetitions] = useState(() =>
    loadData("victoria_competitions", [])
  );
  const [members, setMembers] = useState(() =>
    loadData("victoria_members", [])
  );
  const [office, setOffice] = useState(() =>
    loadData("victoria_office", [])
  );
  const [coaches, setCoaches] = useState(() =>
    loadData("victoria_coaches", [])
  );
  const [documents, setDocuments] = useState(() =>
    loadData("victoria_documents", [])
  );

  const [form, setForm] = useState({
    id: null,
    title: "",
    date: "",
    time: "",
    details: "",
    name: "",
    role: "",
    phone: "",
    email: "",
    link: "",
    fileName: "",
    fileData: "",
  });

  const sortedDiary = useMemo(() => {
    return [...diaryItems].sort((a, b) =>
      `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`)
    );
  }, [diaryItems]);

  const handleLogin = () => {
    if (pin === memberPin) {
      setLoggedIn(true);
      setMessage("");
    } else {
      setMessage("Incorrect members PIN");
    }
  };

  const handleAdminLogin = () => {
    if (adminPin === realAdminPin) {
      setAdminUnlocked(true);
      setMessage("");
    } else {
      setMessage("Wrong admin PIN");
    }
  };

  const savePins = () => {
    if (newMemberPin.trim()) {
      localStorage.setItem("victoria_member_pin", newMemberPin.trim());
      setMemberPin(newMemberPin.trim());
    }

    if (newAdminPin.trim()) {
      localStorage.setItem("victoria_admin_pin", newAdminPin.trim());
      setRealAdminPin(newAdminPin.trim());
    }

    setNewMemberPin("");
    setNewAdminPin("");
    setMessage("PINs updated.");
  };

  const resetForm = () =>
    setForm({
      id: null,
      title: "",
      date: "",
      time: "",
      details: "",
      name: "",
      role: "",
      phone: "",
      email: "",
      link: "",
      fileName: "",
      fileData: "",
    });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        fileName: file.name,
        fileData: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const saveSectionItem = (section) => {
    const setters = {
      diary: [diaryItems, setDiaryItems, "victoria_diary"],
      notices: [notices, setNotices, "victoria_notices"],
      competitions: [competitions, setCompetitions, "victoria_competitions"],
      members: [members, setMembers, "victoria_members"],
      office: [office, setOffice, "victoria_office"],
      coaches: [coaches, setCoaches, "victoria_coaches"],
      documents: [documents, setDocuments, "victoria_documents"],
    };

    const [items, setter, key] = setters[section];

    const newItem = form.id ? form : { ...form, id: nextId(items) };

    const updated = form.id
      ? items.map((x) => (x.id === form.id ? newItem : x))
      : [...items, newItem];

    setter(updated);
    saveData(key, updated);
    resetForm();
  };

  const deleteSectionItem = (section, id) => {
    const setters = {
      diary: [diaryItems, setDiaryItems, "victoria_diary"],
      notices: [notices, setNotices, "victoria_notices"],
      competitions: [competitions, setCompetitions, "victoria_competitions"],
      members: [members, setMembers, "victoria_members"],
      office: [office, setOffice, "victoria_office"],
      coaches: [coaches, setCoaches, "victoria_coaches"],
      documents: [documents, setDocuments, "victoria_documents"],
    };

    const [items, setter, key] = setters[section];
    const updated = items.filter((x) => x.id !== id);

    setter(updated);
    saveData(key, updated);
  };

  const renderList = (title, items) => (
    <div style={styles.panel}>
      <h2>{title}</h2>

      {items.length === 0 ? (
        <p>No items added yet.</p>
      ) : (
        items.map((item) => (
          <div key={item.id} style={styles.card}>
            {item.title && <h3>{item.title}</h3>}
            {item.name && <h3>{item.name}</h3>}

            {item.role && (
              <p>
                <strong>Role:</strong> {item.role}
              </p>
            )}

            {item.date && (
              <p>
                <strong>Date:</strong> {item.date}
              </p>
            )}

            {item.time && (
              <p>
                <strong>Time:</strong> {item.time}
              </p>
            )}

            {item.phone && (
              <p>
                <strong>Phone:</strong> {item.phone}
              </p>
            )}

            {item.email && (
              <p>
                <strong>Email:</strong> {item.email}
              </p>
            )}

            {item.details && <p>{item.details}</p>}

            {item.link && (
              <p>
                <a href={item.link} target="_blank" rel="noreferrer">
                  Open Document / Link
                </a>
              </p>
            )}

            {item.fileData && (
              <p>
                <a href={item.fileData} target="_blank" rel="noreferrer">
                  Open File: {item.fileName || "Attached File"}
                </a>
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );

  const renderAdminSection = (section, items) => (
    <>
      <h3>{SECTION_NAMES[section]} Admin</h3>

      <div style={styles.formBox}>
        {["diary", "notices", "competitions", "documents"].includes(
          section
        ) && (
          <input
            style={styles.input}
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        )}

        {section === "diary" && (
          <>
            <input
              style={styles.input}
              placeholder="Date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />

            <input
              style={styles.input}
              placeholder="Time"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
            />
          </>
        )}

        {["members", "office", "coaches"].includes(section) && (
          <>
            <input
              style={styles.input}
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              style={styles.input}
              placeholder="Role / Category"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            />

            <input
              style={styles.input}
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <input
              style={styles.input}
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </>
        )}

        {section === "documents" && (
          <input
            style={styles.input}
            placeholder="Document link"
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
          />
        )}

        {["diary", "notices", "competitions", "documents"].includes(
          section
        ) && (
          <>
            <input type="file" style={styles.input} onChange={handleFileUpload} />

            {form.fileName && (
              <p>
                <strong>Selected file:</strong> {form.fileName}
              </p>
            )}

            {form.fileData && (
              <button
                type="button"
                style={styles.deleteButton}
                onClick={() =>
                  setForm({
                    ...form,
                    fileName: "",
                    fileData: "",
                  })
                }
              >
                Remove File
              </button>
            )}
          </>
        )}

        <textarea
          style={styles.textarea}
          placeholder="Details"
          value={form.details}
          onChange={(e) => setForm({ ...form, details: e.target.value })}
        />

        <button
          style={styles.smallButton}
          onClick={() => saveSectionItem(section)}
        >
          {form.id ? "Update Item" : "Add Item"}
        </button>

        <button style={styles.deleteButton} onClick={resetForm}>
          Clear Form
        </button>
      </div>

      {items.map((item) => (
        <div key={item.id} style={styles.card}>
          <strong>{item.title || item.name || "Untitled item"}</strong>

          {item.fileName && (
            <p>
              <strong>File:</strong> {item.fileName}
            </p>
          )}

          <div>
            <button style={styles.smallButton} onClick={() => setForm(item)}>
              Edit
            </button>

            <button
              style={styles.deleteButton}
              onClick={() => deleteSectionItem(section, item.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );

  if (!loggedIn) {
    return (
      <div style={styles.page}>
        <div style={styles.loginPanel}>
          <img src={logo} alt="logo" style={styles.logo} />
          <h1>{CLUB_NAME}</h1>
          <p>Club App</p>

          <input
            type="password"
            placeholder="Enter Members PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            style={styles.input}
          />

          <button onClick={handleLogin} style={styles.button}>
            Enter
          </button>

          {message && <p>{message}</p>}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.wrap}>
        <div style={styles.header}>
          <div style={styles.headerRow}>
            <img src={logo} alt="logo" style={styles.logo} />
            <div>
              <h1 style={styles.title}>{CLUB_NAME}</h1>
              <p style={styles.subtitle}>Club App</p>
            </div>
          </div>
        </div>

        <div style={styles.tabs}>
          {TABS.map((key) => (
            <button
              key={key}
              style={styles.tab(tab === key)}
              onClick={() => {
                setTab(key);
                resetForm();
              }}
            >
              {SECTION_NAMES[key]}
            </button>
          ))}

          <button
            style={styles.tab(false)}
            onClick={() => {
              setLoggedIn(false);
              setPin("");
              setAdminUnlocked(false);
              setAdminPin("");
              setTab("home");
              setMessage("");
            }}
          >
            Log Out
          </button>
        </div>

        {tab === "home" && (
          <div style={styles.panel}>
            <h2>Welcome</h2>
            <p>Welcome to the {CLUB_NAME} app.</p>
          </div>
        )}

        {tab === "diary" && renderList("Diary", sortedDiary)}
        {tab === "notices" && renderList("Noticeboard", notices)}
        {tab === "competitions" && renderList("Competitions", competitions)}
        {tab === "members" && renderList("Members", members)}
        {tab === "office" && renderList("Office Bearers", office)}
        {tab === "coaches" && renderList("Club Coaches", coaches)}
        {tab === "documents" && renderList("Documents", documents)}

        {tab === "admin" && (
          <div style={styles.panel}>
            <h2>Admin</h2>

            {adminUnlocked && (
              <button
                style={styles.deleteButton}
                onClick={() => {
                  setAdminUnlocked(false);
                  setAdminPin("");
                  setMessage("");
                }}
              >
                Log Out Of Admin
              </button>
            )}

            {!adminUnlocked ? (
              <div style={styles.formBox}>
                <h3>Unlock Admin Editing</h3>

                <input
                  type="password"
                  placeholder="Enter Admin PIN"
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  style={styles.input}
                />

                <button onClick={handleAdminLogin} style={styles.button}>
                  Unlock Editing
                </button>

                {message && <p>{message}</p>}
              </div>
            ) : (
              <>
                <div style={styles.formBox}>
                  <h3>Change PINs</h3>
                  <p>Leave a box blank if you do not want to change that PIN.</p>

                  <input
                    type="password"
                    placeholder="New Members PIN"
                    value={newMemberPin}
                    onChange={(e) => setNewMemberPin(e.target.value)}
                    style={styles.input}
                  />

                  <input
                    type="password"
                    placeholder="New Admin PIN"
                    value={newAdminPin}
                    onChange={(e) => setNewAdminPin(e.target.value)}
                    style={styles.input}
                  />

                  <button style={styles.button} onClick={savePins}>
                    Save New PINs
                  </button>

                  {message && <p>{message}</p>}
                </div>

                {renderAdminSection("diary", diaryItems)}
                {renderAdminSection("notices", notices)}
                {renderAdminSection("competitions", competitions)}
                {renderAdminSection("members", members)}
                {renderAdminSection("office", office)}
                {renderAdminSection("coaches", coaches)}
                {renderAdminSection("documents", documents)}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
