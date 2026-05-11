import React, { useMemo, useState } from "react";
import logo from "./assets/logo.png";

const CLUB_NAME = "Victoria Bowling Club, Torrance";
const DEFAULT_MEMBER_PIN = "1234";
const DEFAULT_ADMIN_PIN = "2059";

function nextId(items) {
  return items.length ? Math.max(...items.map((x) => x.id)) + 1 : 1;
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: 16,
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(180deg, #112d5c 0%, #2b5f96 48%, #69c0e5 100%)",
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
    background: "linear-gradient(135deg, #1b2f72 0%, #355f9d 55%, #68c1e6 100%)",
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

  const [diaryItems, setDiaryItems] = useState([]);
  const [diaryForm, setDiaryForm] = useState({
    id: null,
    title: "",
    date: "",
    time: "",
    details: "",
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

  const saveDiary = () => {
    if (!diaryForm.title) return;

    if (diaryForm.id) {
      setDiaryItems((prev) =>
        prev.map((x) => (x.id === diaryForm.id ? diaryForm : x))
      );
    } else {
      setDiaryItems((prev) => [...prev, { ...diaryForm, id: nextId(prev) }]);
    }

    setDiaryForm({
      id: null,
      title: "",
      date: "",
      time: "",
      details: "",
    });
  };

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
          <button style={styles.tab(tab === "home")} onClick={() => setTab("home")}>
            Home
          </button>
          <button style={styles.tab(tab === "diary")} onClick={() => setTab("diary")}>
            Diary
          </button>
          <button style={styles.tab(tab === "admin")} onClick={() => setTab("admin")}>
            Admin
          </button>
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

        {tab === "diary" && (
          <div style={styles.panel}>
            <h2>Diary</h2>

            {sortedDiary.length === 0 ? (
              <p>No diary items added yet.</p>
            ) : (
              sortedDiary.map((item) => (
                <div key={item.id} style={styles.card}>
                  <h3>{item.title}</h3>
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
                  {item.details && <p>{item.details}</p>}
                </div>
              ))
            )}
          </div>
        )}

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
                  <p>
                    Leave a box blank if you do not want to change that PIN.
                  </p>

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

                <h3>Diary Admin</h3>

                <div style={styles.formBox}>
                  <input
                    style={styles.input}
                    placeholder="Title"
                    value={diaryForm.title}
                    onChange={(e) =>
                      setDiaryForm({ ...diaryForm, title: e.target.value })
                    }
                  />

                  <input
                    style={styles.input}
                    placeholder="Date"
                    value={diaryForm.date}
                    onChange={(e) =>
                      setDiaryForm({ ...diaryForm, date: e.target.value })
                    }
                  />

                  <input
                    style={styles.input}
                    placeholder="Time"
                    value={diaryForm.time}
                    onChange={(e) =>
                      setDiaryForm({ ...diaryForm, time: e.target.value })
                    }
                  />

                  <textarea
                    style={styles.textarea}
                    placeholder="Details"
                    value={diaryForm.details}
                    onChange={(e) =>
                      setDiaryForm({ ...diaryForm, details: e.target.value })
                    }
                  />

                  <button style={styles.smallButton} onClick={saveDiary}>
                    {diaryForm.id ? "Update Diary Item" : "Add Diary Item"}
                  </button>
                </div>

                {sortedDiary.map((item) => (
                  <div key={item.id} style={styles.card}>
                    <strong>{item.title}</strong>

                    <div>
                      <button
                        style={styles.smallButton}
                        onClick={() => setDiaryForm(item)}
                      >
                        Edit
                      </button>

                      <button
                        style={styles.deleteButton}
                        onClick={() =>
                          setDiaryItems((prev) =>
                            prev.filter((x) => x.id !== item.id)
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
