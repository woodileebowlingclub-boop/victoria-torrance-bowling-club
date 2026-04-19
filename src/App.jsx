import React, { useEffect, useState } from "react";
import logo from "./assets/logo.png";

const DEFAULT_MEMBER_PIN = "1234";
const DEFAULT_ADMIN_PIN = "2059";

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #0b3d91, #1e5bb8, #4a7edc)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    boxSizing: "border-box",
  },

  container: {
    textAlign: "center",
    background: "#ffffff",
    padding: "40px 20px",
    borderRadius: "20px",
    width: "90%",
    maxWidth: "720px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
  },

  logo: {
    width: "260px",
    height: "auto",
    marginBottom: "25px",
  },

  title: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#0b3d91",
    marginBottom: "12px",
    lineHeight: "1.2",
  },

  subtitle: {
    fontSize: "24px",
    color: "#444",
    marginBottom: "30px",
  },

  tabs: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "25px",
  },

  tab: (active) => ({
    padding: "10px 18px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    background: active ? "#0b3d91" : "#e9eef8",
    color: active ? "#fff" : "#0b3d91",
    fontWeight: "bold",
    fontSize: "15px",
  }),

  panel: {
    maxWidth: "520px",
    margin: "0 auto",
    textAlign: "left",
    background: "#f8fbff",
    border: "1px solid #d8e4f7",
    borderRadius: "16px",
    padding: "20px",
  },

  heading: {
    marginTop: 0,
    marginBottom: "16px",
    color: "#0b3d91",
    textAlign: "center",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "1px solid #c8d6ea",
    fontSize: "16px",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#0b3d91",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    marginBottom: "10px",
  },

  secondaryButton: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #0b3d91",
    background: "#ffffff",
    color: "#0b3d91",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    marginBottom: "10px",
  },

  message: {
    marginTop: "10px",
    textAlign: "center",
    fontWeight: "bold",
    color: "#0b3d91",
  },

  note: {
    fontSize: "14px",
    color: "#555",
    marginTop: "8px",
    textAlign: "center",
  },

  centreText: {
    textAlign: "center",
    margin: 0,
    fontSize: "18px",
  },
};

export default function App() {
  const [memberPin] = useState(DEFAULT_MEMBER_PIN);
  const [adminPin, setAdminPin] = useState(DEFAULT_ADMIN_PIN);

  const [enteredMemberPin, setEnteredMemberPin] = useState("");
  const [enteredAdminPin, setEnteredAdminPin] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [tab, setTab] = useState("home");
  const [message, setMessage] = useState("");

  const [currentAdminPinInput, setCurrentAdminPinInput] = useState("");
  const [newAdminPinInput, setNewAdminPinInput] = useState("");
  const [confirmAdminPinInput, setConfirmAdminPinInput] = useState("");

  useEffect(() => {
    const savedAdminPin = localStorage.getItem("victoria_admin_pin");
    if (savedAdminPin) setAdminPin(savedAdminPin);
  }, []);

  const handleMemberLogin = () => {
    if (enteredMemberPin === memberPin) {
      setLoggedIn(true);
      setEnteredMemberPin("");
      setMessage("");
    } else {
      setMessage("Incorrect members PIN");
    }
  };

  const handleMemberLogout = () => {
    setLoggedIn(false);
    setAdminUnlocked(false);
    setEnteredMemberPin("");
    setEnteredAdminPin("");
    setCurrentAdminPinInput("");
    setNewAdminPinInput("");
    setConfirmAdminPinInput("");
    setTab("home");
    setMessage("");
  };

  const handleAdminLogin = () => {
    if (enteredAdminPin === adminPin) {
      setAdminUnlocked(true);
      setEnteredAdminPin("");
      setMessage("");
    } else {
      setMessage("Wrong admin PIN");
    }
  };

  const handleAdminLogout = () => {
    setAdminUnlocked(false);
    setEnteredAdminPin("");
    setCurrentAdminPinInput("");
    setNewAdminPinInput("");
    setConfirmAdminPinInput("");
    setMessage("");
  };

  const handleChangeAdminPin = () => {
    if (!currentAdminPinInput || !newAdminPinInput || !confirmAdminPinInput) {
      setMessage("Please complete all admin PIN boxes.");
      return;
    }

    if (currentAdminPinInput !== adminPin) {
      setMessage("Current admin PIN is incorrect.");
      return;
    }

    if (newAdminPinInput.length < 4) {
      setMessage("New admin PIN must be at least 4 digits.");
      return;
    }

    if (newAdminPinInput !== confirmAdminPinInput) {
      setMessage("New admin PIN and confirm PIN do not match.");
      return;
    }

    setAdminPin(newAdminPinInput);
    localStorage.setItem("victoria_admin_pin", newAdminPinInput);

    setCurrentAdminPinInput("");
    setNewAdminPinInput("");
    setConfirmAdminPinInput("");
    setMessage("Admin PIN changed successfully.");
  };

  if (!loggedIn) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <img src={logo} alt="Club Logo" style={styles.logo} />

          <div style={styles.title}>Victoria Torrance Bowling Club</div>

          <div style={styles.subtitle}>Welcome to the club app</div>

          <div style={styles.panel}>
            <h2 style={styles.heading}>Members Login</h2>

            <input
              type="password"
              placeholder="Enter members PIN"
              value={enteredMemberPin}
              onChange={(e) => setEnteredMemberPin(e.target.value)}
              style={styles.input}
            />

            <button onClick={handleMemberLogin} style={styles.button}>
              Enter App
            </button>

            {message && <div style={styles.message}>{message}</div>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <img src={logo} alt="Club Logo" style={styles.logo} />

        <div style={styles.title}>Victoria Torrance Bowling Club</div>

        <div style={styles.subtitle}>Welcome to the club app</div>

        <div style={styles.tabs}>
          <button style={styles.tab(tab === "home")} onClick={() => setTab("home")}>
            Home
          </button>
          <button style={styles.tab(tab === "admin")} onClick={() => setTab("admin")}>
            Admin
          </button>
          <button style={styles.tab(false)} onClick={handleMemberLogout}>
            Logout
          </button>
        </div>

        {tab === "home" && (
          <div style={styles.panel}>
            <h2 style={styles.heading}>Home</h2>
            <p style={styles.centreText}>Welcome to Victoria Torrance Bowling Club.</p>
          </div>
        )}

        {tab === "admin" && (
          <div style={styles.panel}>
            {!adminUnlocked ? (
              <>
                <h2 style={styles.heading}>Administrator Login</h2>

                <input
                  type="password"
                  placeholder="Enter admin PIN"
                  value={enteredAdminPin}
                  onChange={(e) => setEnteredAdminPin(e.target.value)}
                  style={styles.input}
                />

                <button onClick={handleAdminLogin} style={styles.button}>
                  Unlock Admin
                </button>
              </>
            ) : (
              <>
                <h2 style={styles.heading}>Administrator Settings</h2>

                <input
                  type="password"
                  placeholder="Current admin PIN"
                  value={currentAdminPinInput}
                  onChange={(e) => setCurrentAdminPinInput(e.target.value)}
                  style={styles.input}
                />

                <input
                  type="password"
                  placeholder="New admin PIN"
                  value={newAdminPinInput}
                  onChange={(e) => setNewAdminPinInput(e.target.value)}
                  style={styles.input}
                />

                <input
                  type="password"
                  placeholder="Confirm new admin PIN"
                  value={confirmAdminPinInput}
                  onChange={(e) => setConfirmAdminPinInput(e.target.value)}
                  style={styles.input}
                />

                <button onClick={handleChangeAdminPin} style={styles.button}>
                  Change Admin PIN
                </button>

                <button onClick={handleAdminLogout} style={styles.secondaryButton}>
                  Lock Admin
                </button>

                <div style={styles.note}>
                  The new admin PIN is saved in this browser.
                </div>
              </>
            )}

            {message && <div style={styles.message}>{message}</div>}
          </div>
        )}
      </div>
    </div>
  );
}
