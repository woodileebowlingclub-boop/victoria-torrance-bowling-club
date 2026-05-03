Paste this as your full `App.jsx`:

```jsx
import React, { useEffect, useMemo, useState } from "react";
import logo from "./assets/logo.png";

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
    maxWidth: "1000px",
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
    maxWidth: "760px",
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

  subHeading: {
    marginTop: "18px",
    marginBottom: "12px",
    color: "#0b3d91",
    borderBottom: "2px solid #d8e4f7",
    paddingBottom: "6px",
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

  textarea: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "1px solid #c8d6ea",
    fontSize: "16px",
    boxSizing: "border-box",
    minHeight: "100px",
    resize: "vertical",
    fontFamily: "Arial, sans-serif",
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

  smallButton: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "none",
    background: "#0b3d91",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    marginRight: "8px",
    marginTop: "8px",
  },

  deleteButton: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "none",
    background: "#b22222",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    marginRight: "8px",
    marginTop: "8px",
  },

  card: {
    background: "#ffffff",
    border: "1px solid #d8e4f7",
    borderRadius: "14px",
    padding: "14px",
    marginBottom: "12px",
  },

  adminBox: {
    background: "#eef5ff",
    border: "1px solid #cfe0fb",
    borderRadius: "14px",
    padding: "16px",
    marginBottom: "18px",
  },

  message: {
    marginTop: "10px",
    textAlign: "center",
    fontWeight: "bold",
    color: "#0b3d91",
  },

  muted: {
    color: "#555",
    textAlign: "center",
  },

  centreText: {
    textAlign: "center",
    margin: 0,
    fontSize: "18px",
  },

  rowText: {
    margin: "6px 0",
  },
};

function nextId(items) {
  return items.length ? Math.max(...items.map((x) => x.id)) + 1 : 1;
}

function normaliseSection(section) {
  return String(section || "").trim().toLowerCase();
}

export default function App() {
  const [adminPin, setAdminPin] = useState(DEFAULT_ADMIN_PIN);
  const [enteredAdminPin, setEnteredAdminPin] = useState("");
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [tab, setTab] = useState("home");
  const [message, setMessage] = useState("");

  const [diaryItems, setDiaryItems] = useState([]);
  const [members, setMembers] = useState([]);
  const [officeBearers, setOfficeBearers] = useState([]);
  const [noticeboardItems, setNoticeboardItems] = useState([]);
  const [tournamentItems, setTournamentItems] = useState([]);

  const [currentAdminPinInput, setCurrentAdminPinInput] = useState("");
  const [newAdminPinInput, setNewAdminPinInput] = useState("");
  const [confirmAdminPinInput, setConfirmAdminPinInput] = useState("");

  const [diaryForm, setDiaryForm] = useState({
    id: null,
    title: "",
    date: "",
    time: "",
    details: "",
  });

  const [memberForm, setMemberForm] = useState({
    id: null,
    name: "",
    section: "",
    phone: "",
    whatsapp: "",
  });

  const [officeForm, setOfficeForm] = useState({
    id: null,
    role: "",
    name: "",
    phone: "",
    whatsapp: "",
  });

  const [noticeForm, setNoticeForm] = useState({
    id: null,
    title: "",
    date: "",
    message: "",
  });

  const [tournamentForm, setTournamentForm] = useState({
    id: null,
    title: "",
    date: "",
    details: "",
  });

  useEffect(() => {
    const savedAdminPin = localStorage.getItem("victoria_admin_pin");
    if (savedAdminPin) setAdminPin(savedAdminPin);
  }, []);

  const sortedDiary = useMemo(() => {
    return [...diaryItems].sort((a, b) => {
      const aKey = `${a.date || ""} ${a.time || ""}`;
      const bKey = `${b.date || ""} ${b.time || ""}`;
      return aKey.localeCompare(bKey);
    });
  }, [diaryItems]);

  const groupedMembers = useMemo(() => {
    return {
      gents: members.filter((m) => normaliseSection(m.section).includes("gent")),
      ladies: members.filter((m) => normaliseSection(m.section).includes("lad")),
      social: members.filter((m) => normaliseSection(m.section).includes("social")),
      other: members.filter((m) => {
        const section = normaliseSection(m.section);
        return (
          !section.includes("gent") &&
          !section.includes("lad") &&
          !section.includes("social")
        );
      }),
    };
  }, [members]);

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
      setMessage("New admin PIN must be at least 4 characters.");
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

  const resetDiaryForm = () =>
    setDiaryForm({ id: null, title: "", date: "", time: "", details: "" });

  const resetMemberForm = () =>
    setMemberForm({ id: null, name: "", section: "", phone: "", whatsapp: "" });

  const resetOfficeForm = () =>
    setOfficeForm({ id: null, role: "", name: "", phone: "", whatsapp: "" });

  const resetNoticeForm = () =>
    setNoticeForm({ id: null, title: "", date: "", message: "" });

  const resetTournamentForm = () =>
    setTournamentForm({ id: null, title: "", date: "", details: "" });

  const saveDiary = () => {
    if (!diaryForm.title) {
      setMessage("Please enter a diary title.");
      return;
    }

    if (diaryForm.id) {
      setDiaryItems((prev) =>
        prev.map((x) => (x.id === diaryForm.id ? diaryForm : x))
      );
    } else {
      setDiaryItems((prev) => [...prev, { ...diaryForm, id: nextId(prev) }]);
    }

    resetDiaryForm();
    setMessage("Diary updated.");
  };

  const saveMember = () => {
    if (!memberForm.name) {
      setMessage("Please enter a member name.");
      return;
    }

    if (memberForm.id) {
      setMembers((prev) =>
        prev.map((x) => (x.id === memberForm.id ? memberForm : x))
      );
    } else {
      setMembers((prev) => [...prev, { ...memberForm, id: nextId(prev) }]);
    }

    resetMemberForm();
    setMessage("Members updated.");
  };

  const saveOffice = () => {
    if (!officeForm.role || !officeForm.name) {
      setMessage("Please enter role and name.");
      return;
    }

    if (officeForm.id) {
      setOfficeBearers((prev) =>
        prev.map((x) => (x.id === officeForm.id ? officeForm : x))
      );
    } else {
      setOfficeBearers((prev) => [...prev, { ...officeForm, id: nextId(prev) }]);
    }

    resetOfficeForm();
    setMessage("Office bearers updated.");
  };

  const saveNotice = () => {
    if (!noticeForm.title || !noticeForm.message) {
      setMessage("Please enter notice title and message.");
      return;
    }

    if (noticeForm.id) {
      setNoticeboardItems((prev) =>
        prev.map((x) => (x.id === noticeForm.id ? noticeForm : x))
      );
    } else {
      setNoticeboardItems((prev) => [
        ...prev,
        { ...noticeForm, id: nextId(prev) },
      ]);
    }

    resetNoticeForm();
    setMessage("Noticeboard updated.");
  };

  const saveTournament = () => {
    if (!tournamentForm.title) {
      setMessage("Please enter tournament title.");
      return;
    }

    if (tournamentForm.id) {
      setTournamentItems((prev) =>
        prev.map((x) => (x.id === tournamentForm.id ? tournamentForm : x))
      );
    } else {
      setTournamentItems((prev) => [
        ...prev,
        { ...tournamentForm, id: nextId(prev) },
      ]);
    }

    resetTournamentForm();
    setMessage("Tournament updated.");
  };

  const renderMemberCard = (item) => (
    <div key={item.id} style={styles.card}>
      <strong>{item.name}</strong>

      {item.phone && (
        <p style={styles.rowText}>
          <strong>Phone:</strong> {item.phone}
        </p>
      )}

      {item.whatsapp && (
        <p style={styles.rowText}>
          <strong>WhatsApp:</strong> {item.whatsapp}
        </p>
      )}
    </div>
  );

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <img src={logo} alt="Club Logo" style={styles.logo} />

        <div style={styles.title}>Victoria Bowling Club, Torrance</div>
        <div style={styles.subtitle}>Welcome to the club app</div>

        <div style={styles.tabs}>
          <button style={styles.tab(tab === "home")} onClick={() => setTab("home")}>
            Home
          </button>
          <button style={styles.tab(tab === "diary")} onClick={() => setTab("diary")}>
            Diary
          </button>
          <button style={styles.tab(tab === "members")} onClick={() => setTab("members")}>
            Members
          </button>
          <button style={styles.tab(tab === "office")} onClick={() => setTab("office")}>
            Office Bearers
          </button>
          <button
            style={styles.tab(tab === "noticeboard")}
            onClick={() => setTab("noticeboard")}
          >
            Noticeboard
          </button>
          <button
            style={styles.tab(tab === "tournament")}
            onClick={() => setTab("tournament")}
          >
            Tournament
          </button>
          <button style={styles.tab(tab === "admin")} onClick={() => setTab("admin")}>
            Admin
          </button>
        </div>

        {tab === "home" && (
          <div style={styles.panel}>
            <h2 style={styles.heading}>Home</h2>
            <p style={styles.centreText}>
              Welcome to Victoria Bowling Club, Torrance.
            </p>
          </div>
        )}

        {tab === "diary" && (
          <div style={styles.panel}>
            <h2 style={styles.heading}>Diary</h2>
            {sortedDiary.length === 0 ? (
              <p style={styles.muted}>No diary entries added yet.</p>
            ) : (
              sortedDiary.map((item) => (
                <div key={item.id} style={styles.card}>
                  <strong>{item.title}</strong>
                  {item.date && (
                    <p style={styles.rowText}>
                      <strong>Date:</strong> {item.date}
                    </p>
                  )}
                  {item.time && (
                    <p style={styles.rowText}>
                      <strong>Time:</strong> {item.time}
                    </p>
                  )}
                  {item.details && <p style={styles.rowText}>{item.details}</p>}
                </div>
              ))
            )}
          </div>
        )}

        {tab === "members" && (
          <div style={styles.panel}>
            <h2 style={styles.heading}>Members</h2>

            {members.length === 0 ? (
              <p style={styles.muted}>No members added yet.</p>
            ) : (
              <>
                {groupedMembers.gents.length > 0 && (
                  <>
                    <h3 style={styles.subHeading}>Gents Section</h3>
                    {groupedMembers.gents.map(renderMemberCard)}
                  </>
                )}

                {groupedMembers.ladies.length > 0 && (
                  <>
                    <h3 style={styles.subHeading}>Ladies Section</h3>
                    {groupedMembers.ladies.map(renderMemberCard)}
                  </>
                )}

                {groupedMembers.social.length > 0 && (
                  <>
                    <h3 style={styles.subHeading}>Social Members</h3>
                    {groupedMembers.social.map(renderMemberCard)}
                  </>
                )}

                {groupedMembers.other.length > 0 && (
                  <>
                    <h3 style={styles.subHeading}>Other Members</h3>
                    {groupedMembers.other.map(renderMemberCard)}
                  </>
                )}
              </>
            )}
          </div>
        )}

        {tab === "office" && (
          <div style={styles.panel}>
            <h2 style={styles.heading}>Office Bearers</h2>
            {officeBearers.length === 0 ? (
              <p style={styles.muted}>No office bearers added yet.</p>
            ) : (
              officeBearers.map((item) => (
                <div key={item.id} style={styles.card}>
                  <strong>{item.role}</strong>
                  <p style={styles.rowText}>
                    <strong>Name:</strong> {item.name}
                  </p>
                  {item.phone && (
                    <p style={styles.rowText}>
                      <strong>Phone:</strong> {item.phone}
                    </p>
                  )}
                  {item.whatsapp && (
                    <p style={styles.rowText}>
                      <strong>WhatsApp:</strong> {item.whatsapp}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {tab === "noticeboard" && (
          <div style={styles.panel}>
            <h2 style={styles.heading}>Noticeboard</h2>
            {noticeboardItems.length === 0 ? (
              <p style={styles.muted}>No notices added yet.</p>
            ) : (
              noticeboardItems.map((item) => (
                <div key={item.id} style={styles.card}>
                  <strong>{item.title}</strong>
                  {item.date && (
                    <p style={styles.rowText}>
                      <strong>Date:</strong> {item.date}
                    </p>
                  )}
                  <p style={styles.rowText}>{item.message}</p>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "tournament" && (
          <div style={styles.panel}>
            <h2 style={styles.heading}>Tournament</h2>
            {tournamentItems.length === 0 ? (
              <p style={styles.muted}>No tournament entries added yet.</p>
            ) : (
              tournamentItems.map((item) => (
                <div key={item.id} style={styles.card}>
                  <strong>{item.title}</strong>
                  {item.date && (
                    <p style={styles.rowText}>
                      <strong>Date:</strong> {item.date}
                    </p>
                  )}
                  {item.details && <p style={styles.rowText}>{item.details}</p>}
                </div>
              ))
            )}
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

                {message && <div style={styles.message}>{message}</div>}
              </>
            ) : (
              <>
                <h2 style={styles.heading}>Administrator Settings</h2>

                <div style={styles.adminBox}>
                  <h3 style={styles.subHeading}>Change Admin PIN</h3>

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
                </div>

                <div style={styles.adminBox}>
                  <h3 style={styles.subHeading}>Diary</h3>

                  <input
                    type="text"
                    placeholder="Title"
                    value={diaryForm.title}
                    onChange={(e) =>
                      setDiaryForm({ ...diaryForm, title: e.target.value })
                    }
                    style={styles.input}
                  />

                  <input
                    type="text"
                    placeholder="Date"
                    value={diaryForm.date}
                    onChange={(e) =>
                      setDiaryForm({ ...diaryForm, date: e.target.value })
                    }
                    style={styles.input}
                  />

                  <input
                    type="text"
                    placeholder="Time"
                    value={diaryForm.time}
                    onChange={(e) =>
                      setDiaryForm({ ...diaryForm, time: e.target.value })
                    }
                    style={styles.input}
                  />

                  <textarea
                    placeholder="Details"
                    value={diaryForm.details}
                    onChange={(e) =>
                      setDiaryForm({ ...diaryForm, details: e.target.value })
                    }
                    style={styles.textarea}
                  />

                  <button onClick={saveDiary} style={styles.smallButton}>
                    {diaryForm.id ? "Update Diary Item" : "Add Diary Item"}
                  </button>

                  <button onClick={resetDiaryForm} style={styles.deleteButton}>
                    Clear
                  </button>

                  {sortedDiary.map((item) => (
                    <div key={item.id} style={styles.card}>
                      <strong>{item.title}</strong>
                      <div>
                        <button
                          onClick={() => setDiaryForm(item)}
                          style={styles.smallButton}
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            setDiaryItems((prev) =>
                              prev.filter((x) => x.id !== item.id)
                            )
                          }
                          style={styles.deleteButton}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={styles.adminBox}>
                  <h3 style={styles.subHeading}>Members</h3>

                  <input
                    type="text"
                    placeholder="Name"
                    value={memberForm.name}
                    onChange={(e) =>
                      setMemberForm({ ...memberForm, name: e.target.value })
                    }
                    style={styles.input}
                  />

                  <select
                    value={memberForm.section}
                    onChange={(e) =>
                      setMemberForm({ ...memberForm, section: e.target.value })
                    }
                    style={styles.input}
                  >
                    <option value="">Select Section</option>
                    <option value="Gents">Gents</option>
                    <option value="Ladies">Ladies</option>
                    <option value="Social">Social</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Phone"
                    value={memberForm.phone}
                    onChange={(e) =>
                      setMemberForm({ ...memberForm, phone: e.target.value })
                    }
                    style={styles.input}
                  />

                  <input
                    type="text"
                    placeholder="WhatsApp"
                    value={memberForm.whatsapp}
                    onChange={(e) =>
                      setMemberForm({ ...memberForm, whatsapp: e.target.value })
                    }
                    style={styles.input}
                  />

                  <button onClick={saveMember} style={styles.smallButton}>
                    {memberForm.id ? "Update Member" : "Add Member"}
                  </button>

                  <button onClick={resetMemberForm} style={styles.deleteButton}>
                    Clear
                  </button>

                  {members.map((item) => (
                    <div key={item.id} style={styles.card}>
                      <strong>
                        {item.name} {item.section ? `- ${item.section}` : ""}
                      </strong>
                      <div>
                        <button
                          onClick={() => setMemberForm(item)}
                          style={styles.smallButton}
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            setMembers((prev) => prev.filter((x) => x.id !== item.id))
                          }
                          style={styles.deleteButton}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={styles.adminBox}>
                  <h3 style={styles.subHeading}>Office Bearers</h3>

                  <input
                    type="text"
                    placeholder="Role"
                    value={officeForm.role}
                    onChange={(e) =>
                      setOfficeForm({ ...officeForm, role: e.target.value })
                    }
                    style={styles.input}
                  />

                  <input
                    type="text"
                    placeholder="Name"
                    value={officeForm.name}
                    onChange={(e) =>
                      setOfficeForm({ ...officeForm, name: e.target.value })
                    }
                    style={styles.input}
                  />

                  <input
                    type="text"
                    placeholder="Phone"
                    value={officeForm.phone}
                    onChange={(e) =>
                      setOfficeForm({ ...officeForm, phone: e.target.value })
                    }
                    style={styles.input}
                  />

                  <input
                    type="text"
                    placeholder="WhatsApp"
                    value={officeForm.whatsapp}
                    onChange={(e) =>
                      setOfficeForm({ ...officeForm, whatsapp: e.target.value })
                    }
                    style={styles.input}
                  />

                  <button onClick={saveOffice} style={styles.smallButton}>
                    {officeForm.id ? "Update Office Bearer" : "Add Office Bearer"}
                  </button>

                  <button onClick={resetOfficeForm} style={styles.deleteButton}>
                    Clear
                  </button>

                  {officeBearers.map((item) => (
                    <div key={item.id} style={styles.card}>
                      <strong>
                        {item.role} - {item.name}
                      </strong>
                      <div>
                        <button
                          onClick={() => setOfficeForm(item)}
                          style={styles.smallButton}
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            setOfficeBearers((prev) =>
                              prev.filter((x) => x.id !== item.id)
                            )
                          }
                          style={styles.deleteButton}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={styles.adminBox}>
                  <h3 style={styles.subHeading}>Noticeboard</h3>

                  <input
                    type="text"
                    placeholder="Title"
                    value={noticeForm.title}
                    onChange={(e) =>
                      setNoticeForm({ ...noticeForm, title: e.target.value })
                    }
                    style={styles.input}
                  />

                  <input
                    type="text"
                    placeholder="Date"
                    value={noticeForm.date}
                    onChange={(e) =>
                      setNoticeForm({ ...noticeForm, date: e.target.value })
                    }
                    style={styles.input}
                  />

                  <textarea
                    placeholder="Message"
                    value={noticeForm.message}
                    onChange={(e) =>
                      setNoticeForm({ ...noticeForm, message: e.target.value })
                    }
                    style={styles.textarea}
                  />

                  <button onClick={saveNotice} style={styles.smallButton}>
                    {noticeForm.id ? "Update Notice" : "Add Notice"}
                  </button>

                  <button onClick={resetNoticeForm} style={styles.deleteButton}>
                    Clear
                  </button>

                  {noticeboardItems.map((item) => (
                    <div key={item.id} style={styles.card}>
                      <strong>{item.title}</strong>
                      <div>
                        <button
                          onClick={() => setNoticeForm(item)}
                          style={styles.smallButton}
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            setNoticeboardItems((prev) =>
                              prev.filter((x) => x.id !== item.id)
                            )
                          }
                          style={styles.deleteButton}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={styles.adminBox}>
                  <h3 style={styles.subHeading}>Tournament</h3>

                  <input
                    type="text"
                    placeholder="Title"
                    value={tournamentForm.title}
                    onChange={(e) =>
                      setTournamentForm({
                        ...tournamentForm,
                        title: e.target.value,
                      })
                    }
                    style={styles.input}
                  />

                  <input
                    type="text"
                    placeholder="Date"
                    value={tournamentForm.date}
                    onChange={(e) =>
                      setTournamentForm({
                        ...tournamentForm,
                        date: e.target.value,
                      })
                    }
                    style={styles.input}
                  />

                  <textarea
                    placeholder="Details"
                    value={tournamentForm.details}
                    onChange={(e) =>
                      setTournamentForm({
                        ...tournamentForm,
                        details: e.target.value,
                      })
                    }
                    style={styles.textarea}
                  />

                  <button onClick={saveTournament} style={styles.smallButton}>
                    {tournamentForm.id ? "Update Tournament" : "Add Tournament"}
                  </button>

                  <button onClick={resetTournamentForm} style={styles.deleteButton}>
                    Clear
                  </button>

                  {tournamentItems.map((item) => (
                    <div key={item.id} style={styles.card}>
                      <strong>{item.title}</strong>
                      <div>
                        <button
                          onClick={() => setTournamentForm(item)}
                          style={styles.smallButton}
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            setTournamentItems((prev) =>
                              prev.filter((x) => x.id !== item.id)
                            )
                          }
                          style={styles.deleteButton}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {message && <div style={styles.message}>{message}</div>}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
```
