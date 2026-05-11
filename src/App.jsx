import React, { useMemo, useState } from "react";
import logo from "./assets/logo.png";

const CLUB_PIN = "1234";
const ADMIN_PIN = "2059";
const CLUB_NAME = "Victoria Bowling Club, Torrance";

const styles = {
  page: {
    minHeight: "100vh",
    padding: 16,
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(180deg, #112d5c 0%, #2b5f96 48%, #69c0e5 100%)",
    color: "#1f1f1f",
  },
  wrap: {
    maxWidth: 1180,
    margin: "0 auto",
  },
  loginPanel: {
    maxWidth: 390,
    margin: "70px auto",
    background: "#ffffff",
    borderRadius: 18,
    padding: 26,
    textAlign: "center",
    boxShadow: "0 10px 24px rgba(0,0,0,0.22)",
    border: "2px solid #d8d8d8",
  },
  header: {
    background: "linear-gradient(135deg, #1b2f72 0%, #355f9d 55%, #68c1e6 100%)",
    color: "#ffffff",
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
    boxShadow: "0 10px 24px rgba(0,0,0,0.22)",
    border: "2px solid rgba(255,255,255,0.35)",
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
    border: "2px solid #cfcfcf",
  },
  title: {
    margin: 0,
    fontSize: 30,
    lineHeight: 1.1,
  },
  subtitle: {
    margin: "6px 0 0 0",
    opacity: 0.95,
    fontSize: 16,
  },
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
    boxShadow: "0 3px 8px rgba(0,0,0,0.12)",
  }),
  panel: {
    background: "#ffffff",
    borderRadius: 18,
    padding: 22,
    boxShadow: "0 8px 20px rgba(0,0,0,0.16)",
    border: "2px solid #d7d7d7",
  },
  sectionTitle: {
    marginTop: 0,
    marginBottom: 14,
  },
  card: {
    background: "#f8fbfd",
    border: "1px solid #d7e3ec",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  cardTitle: {
    margin: "0 0 6px 0",
    color: "#163467",
  },
  infoText: {
    margin: "4px 0",
  },
  input: {
    width: "100%",
    padding: 12,
    marginTop: 10,
    borderRadius: 10,
    border: "1px solid #bfc7cf",
    boxSizing: "border-box",
    fontSize: 16,
    background: "#fff",
    color: "#000",
  },
  textarea: {
    width: "100%",
    padding: 12,
    marginTop: 10,
    borderRadius: 10,
    border: "1px solid #bfc7cf",
    boxSizing: "border-box",
    fontSize: 16,
    minHeight: 100,
    resize: "vertical",
    fontFamily: "Arial, sans-serif",
    background: "#fff",
    color: "#000",
  },
  button: {
    marginTop: 12,
    padding: "12px 16px",
    borderRadius: 10,
    border: "none",
    background: "#1b2f72",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 15,
    cursor: "pointer",
  },
  smallButton: {
    padding: "8px 12px",
    borderRadius: 8,
    border: "none",
    background: "#1b2f72",
    color: "#fff",
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
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    marginRight: 8,
    marginTop: 8,
  },
  adminBox: {
    background: "#f4f7fa",
    border: "1px solid #d7d7d7",
    borderRadius: 14,
    padding: 16,
    marginTop: 16,
  },
  formBox: {
    background: "#eef7fc",
    border: "1px solid #cfe0ea",
    borderRadius: 14,
    padding: 14,
    marginBottom: 18,
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 12,
  },
  muted: {
    color: "#555",
  },
};

function nextId(items) {
  return items.length ? Math.max(...items.map((x) => x.id)) + 1 : 1;
}

export default function App() {
  const [pin, setPin] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState("home");

  const [adminPin, setAdminPin] = useState("");
  const [adminUnlocked, setAdminUnlocked] = useState(false);

  const [members, setMembers] = useState([]);
  const [diaryItems, setDiaryItems] = useState([]);
  const [officeBearers, setOfficeBearers] = useState([]);
  const [noticeboardItems, setNoticeboardItems] = useState([]);
  const [tournamentItems, setTournamentItems] = useState([]);

  const [memberForm, setMemberForm] = useState({
    id: null,
    name: "",
    section: "",
    phone: "",
    whatsapp: "",
  });

  const [diaryForm, setDiaryForm] = useState({
    id: null,
    title: "",
    date: "",
    time: "",
    details: "",
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
    message: "",
    date: "",
  });

  const [tournamentForm, setTournamentForm] = useState({
    id: null,
    title: "",
    date: "",
    details: "",
  });

  const sortedDiary = useMemo(() => {
    return [...diaryItems].sort((a, b) => {
      const aKey = `${a.date || ""} ${a.time || ""}`;
      const bKey = `${b.date || ""} ${b.time || ""}`;
      return aKey.localeCompare(bKey);
    });
  }, [diaryItems]);

  const handleLogin = () => {
    if (pin === CLUB_PIN) {
      setLoggedIn(true);
      setMessage("");
    } else {
      setMessage("Incorrect members PIN");
    }
  };

  const handleAdminLogin = () => {
    if (adminPin === ADMIN_PIN) {
      setAdminUnlocked(true);
      setMessage("");
    } else {
      setMessage("Wrong admin PIN");
    }
  };

  const resetMemberForm = () =>
    setMemberForm({ id: null, name: "", section: "", phone: "", whatsapp: "" });

  const resetDiaryForm = () =>
    setDiaryForm({ id: null, title: "", date: "", time: "", details: "" });

  const resetOfficeForm = () =>
    setOfficeForm({ id: null, role: "", name: "", phone: "", whatsapp: "" });

  const resetNoticeForm = () =>
    setNoticeForm({ id: null, title: "", message: "", date: "" });

  const resetTournamentForm = () =>
    setTournamentForm({ id: null, title: "", date: "", details: "" });

  const saveMember = () => {
    if (!memberForm.name || !memberForm.section) return;
    if (memberForm.id) {
      setMembers((prev) => prev.map((x) => (x.id === memberForm.id ? memberForm : x)));
    } else {
      setMembers((prev) => [...prev, { ...memberForm, id: nextId(prev) }]);
    }
    resetMemberForm();
  };

  const saveDiary = () => {
    if (!diaryForm.title) return;
    if (diaryForm.id) {
      setDiaryItems((prev) => prev.map((x) => (x.id === diaryForm.id ? diaryForm : x)));
    } else {
      setDiaryItems((prev) => [...prev, { ...diaryForm, id: nextId(prev) }]);
    }
    resetDiaryForm();
  };

  const saveOffice = () => {
    if (!officeForm.role || !officeForm.name) return;
    if (officeForm.id) {
      setOfficeBearers((prev) => prev.map((x) => (x.id === officeForm.id ? officeForm : x)));
    } else {
      setOfficeBearers((prev) => [...prev, { ...officeForm, id: nextId(prev) }]);
    }
    resetOfficeForm();
  };

  const saveNotice = () => {
    if (!noticeForm.title || !noticeForm.message) return;
    if (noticeForm.id) {
      setNoticeboardItems((prev) =>
        prev.map((x) => (x.id === noticeForm.id ? noticeForm : x))
      );
    } else {
      setNoticeboardItems((prev) => [...prev, { ...noticeForm, id: nextId(prev) }]);
    }
    resetNoticeForm();
  };

  const saveTournament = () => {
    if (!tournamentForm.title) return;
    if (tournamentForm.id) {
      setTournamentItems((prev) =>
        prev.map((x) => (x.id === tournamentForm.id ? tournamentForm : x))
      );
    } else {
      setTournamentItems((prev) => [...prev, { ...tournamentForm, id: nextId(prev) }]);
    }
    resetTournamentForm();
  };

  if (!loggedIn) {
    return (
      <div style={styles.page}>
        <div style={styles.loginPanel}>
          <img src={logo} alt={`${CLUB_NAME} logo`} style={styles.logo} />
          <h1 style={{ marginBottom: 8 }}>{CLUB_NAME}</h1>
          <p style={{ marginTop: 0 }}>Club App</p>

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

          {message && <div style={{ marginTop: 14 }}>{message}</div>}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.wrap}>
        <div style={styles.header}>
          <div style={styles.headerRow}>
            <img src={logo} alt={`${CLUB_NAME} logo`} style={styles.logo} />
            <div>
              <h1 style={styles.title}>{CLUB_NAME}</h1>
              <p style={styles.subtitle}>Club App</p>
            </div>
          </div>
        </div>

        <div style={styles.tabs}>
          <button style={styles.tab(tab === "home")} onClick={() => setTab("home")}>Home</button>
          <button style={styles.tab(tab === "diary")} onClick={() => setTab("diary")}>Diary</button>
          <button style={styles.tab(tab === "members")} onClick={() => setTab("members")}>Members</button>
          <button style={styles.tab(tab === "office")} onClick={() => setTab("office")}>Office Bearers</button>
          <button style={styles.tab(tab === "noticeboard")} onClick={() => setTab("noticeboard")}>Noticeboard</button>
          <button style={styles.tab(tab === "tournament")} onClick={() => setTab("tournament")}>Tournament</button>
          <button style={styles.tab(tab === "admin")} onClick={() => setTab("admin")}>Admin</button>
        </div>

        {tab === "home" && (
          <div style={styles.panel}>
            <h2 style={styles.sectionTitle}>Welcome</h2>
            <p>Welcome to the {CLUB_NAME} app.</p>
            <p>Use the tabs above to view club information.</p>
          </div>
        )}

        {tab === "diary" && (
          <div style={styles.panel}>
            <h2 style={styles.sectionTitle}>Diary</h2>
            {sortedDiary.length === 0 ? (
              <p style={styles.muted}>No diary entries added yet.</p>
            ) : (
              sortedDiary.map((item) => (
                <div key={item.id} style={styles.card}>
                  <h3 style={styles.cardTitle}>{item.title}</h3>
                  {item.date && <p style={styles.infoText}><strong>Date:</strong> {item.date}</p>}
                  {item.time && <p style={styles.infoText}><strong>Time:</strong> {item.time}</p>}
                  {item.details && <p style={styles.infoText}>{item.details}</p>}
                </div>
              ))
            )}
          </div>
        )}

        {tab === "members" && (
          <div style={styles.panel}>
            <h2 style={styles.sectionTitle}>Members</h2>
            {members.length === 0 ? (
              <p style={styles.muted}>No members added yet.</p>
            ) : (
              members.map((item) => (
                <div key={item.id} style={styles.card}>
                  <h3 style={styles.cardTitle}>{item.name}</h3>
                  <p style={styles.infoText}><strong>Section:</strong> {item.section}</p>
                  {item.phone && <p style={styles.infoText}><strong>Phone:</strong> {item.phone}</p>}
                  {item.whatsapp && <p style={styles.infoText}><strong>WhatsApp:</strong> {item.whatsapp}</p>}
                </div>
              ))
            )}
          </div>
        )}

        {tab === "office" && (
          <div style={styles.panel}>
            <h2 style={styles.sectionTitle}>Office Bearers</h2>
            {officeBearers.length === 0 ? (
              <p style={styles.muted}>No office bearers added yet.</p>
            ) : (
              officeBearers.map((item) => (
                <div key={item.id} style={styles.card}>
                  <h3 style={styles.cardTitle}>{item.role}</h3>
                  <p style={styles.infoText}><strong>Name:</strong> {item.name}</p>
                  {item.phone && <p style={styles.infoText}><strong>Phone:</strong> {item.phone}</p>}
                  {item.whatsapp && <p style={styles.infoText}><strong>WhatsApp:</strong> {item.whatsapp}</p>}
                </div>
              ))
            )}
          </div>
        )}

        {tab === "noticeboard" && (
          <div style={styles.panel}>
            <h2 style={styles.sectionTitle}>Noticeboard</h2>
            {noticeboardItems.length === 0 ? (
              <p style={styles.muted}>No notices added yet.</p>
            ) : (
              noticeboardItems.map((item) => (
                <div key={item.id} style={styles.card}>
                  <h3 style={styles.cardTitle}>{item.title}</h3>
                  {item.date && <p style={styles.infoText}><strong>Date:</strong> {item.date}</p>}
                  <p style={styles.infoText}>{item.message}</p>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "tournament" && (
          <div style={styles.panel}>
            <h2 style={styles.sectionTitle}>Tournament</h2>
            {tournamentItems.length === 0 ? (
              <p style={styles.muted}>No tournament entries added yet.</p>
            ) : (
              tournamentItems.map((item) => (
                <div key={item.id} style={styles.card}>
                  <h3 style={styles.cardTitle}>{item.title}</h3>
                  {item.date && <p style={styles.infoText}><strong>Date:</strong> {item.date}</p>}
                  {item.details && <p style={styles.infoText}>{item.details}</p>}
                </div>
              ))
            )}
          </div>
        )}

        {tab === "admin" && (
          <div style={styles.panel}>
            {!adminUnlocked ? (
              <>
                <h2 style={styles.sectionTitle}>Admin Login</h2>
                <input
                  type="password"
                  placeholder="Enter Admin PIN"
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  style={styles.input}
                />
                <button onClick={handleAdminLogin} style={styles.button}>
                  Enter
                </button>
              </>
            ) : (
              <>
                <h2 style={styles.sectionTitle}>Admin Panel</h2>

                <div style={styles.adminBox}>
                  <h3 style={{ marginTop: 0 }}>Diary</h3>
                  <div style={styles.formBox}>
                    <div style={styles.grid2}>
                      <input
                        style={styles.input}
                        placeholder="Title"
                        value={diaryForm.title}
                        onChange={(e) => setDiaryForm({ ...diaryForm, title: e.target.value })}
                      />
                      <input
                        style={styles.input}
                        placeholder="Date"
                        value={diaryForm.date}
                        onChange={(e) => setDiaryForm({ ...diaryForm, date: e.target.value })}
                      />
                    </div>
                    <input
                      style={styles.input}
                      placeholder="Time"
                      value={diaryForm.time}
                      onChange={(e) => setDiaryForm({ ...diaryForm, time: e.target.value })}
                    />
                    <textarea
                      style={styles.textarea}
                      placeholder="Details"
                      value={diaryForm.details}
                      onChange={(e) => setDiaryForm({ ...diaryForm, details: e.target.value })}
                    />
                    <button style={styles.smallButton} onClick={saveDiary}>
                      {diaryForm.id ? "Update Diary Item" : "Add Diary Item"}
                    </button>
                    <button style={styles.deleteButton} onClick={resetDiaryForm}>Clear</button>
                  </div>

                  {sortedDiary.map((item) => (
                    <div key={item.id} style={styles.card}>
                      <strong>{item.title}</strong>
                      <div>
                        <button style={styles.smallButton} onClick={() => setDiaryForm(item)}>Edit</button>
                        <button
                          style={styles.deleteButton}
                          onClick={() => setDiaryItems((prev) => prev.filter((x) => x.id !== item.id))}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={styles.adminBox}>
                  <h3 style={{ marginTop: 0 }}>Members</h3>
                  <div style={styles.formBox}>
                    <input
                      style={styles.input}
                      placeholder="Member name"
                      value={memberForm.name}
                      onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                    />
                    <input
                      style={styles.input}
                      placeholder="Section"
                      value={memberForm.section}
                      onChange={(e) => setMemberForm({ ...memberForm, section: e.target.value })}
                    />
                    <div style={styles.grid2}>
                      <input
                        style={styles.input}
                        placeholder="Phone number"
                        value={memberForm.phone}
                        onChange={(e) => setMemberForm({ ...memberForm, phone: e.target.value })}
                      />
                      <input
                        style={styles.input}
                        placeholder="WhatsApp number"
                        value={memberForm.whatsapp}
                        onChange={(e) => setMemberForm({ ...memberForm, whatsapp: e.target.value })}
                      />
                    </div>
                    <button style={styles.smallButton} onClick={saveMember}>
                      {memberForm.id ? "Update Member" : "Add Member"}
                    </button>
                    <button style={styles.deleteButton} onClick={resetMemberForm}>Clear</button>
                  </div>

                  {members.map((item) => (
                    <div key={item.id} style={styles.card}>
                      <strong>{item.name}</strong>
                      <div>
                        <button style={styles.smallButton} onClick={() => setMemberForm(item)}>Edit</button>
                        <button
                          style={styles.deleteButton}
                          onClick={() => setMembers((prev) => prev.filter((x) => x.id !== item.id))}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={styles.adminBox}>
                  <h3 style={{ marginTop: 0 }}>Office Bearers</h3>
                  <div style={styles.formBox}>
                    <input
                      style={styles.input}
                      placeholder="Role"
                      value={officeForm.role}
                      onChange={(e) => setOfficeForm({ ...officeForm, role: e.target.value })}
                    />
                    <input
                      style={styles.input}
                      placeholder="Name"
                      value={officeForm.name}
                      onChange={(e) => setOfficeForm({ ...officeForm, name: e.target.value })}
                    />
                    <div style={styles.grid2}>
                      <input
                        style={styles.input}
                        placeholder="Phone number"
                        value={officeForm.phone}
                        onChange={(e) => setOfficeForm({ ...officeForm, phone: e.target.value })}
                      />
                      <input
                        style={styles.input}
                        placeholder="WhatsApp number"
                        value={officeForm.whatsapp}
                        onChange={(e) => setOfficeForm({ ...officeForm, whatsapp: e.target.value })}
                      />
                    </div>
                    <button style={styles.smallButton} onClick={saveOffice}>
                      {officeForm.id ? "Update Office Bearer" : "Add Office Bearer"}
                    </button>
                    <button style={styles.deleteButton} onClick={resetOfficeForm}>Clear</button>
                  </div>

                  {officeBearers.map((item) => (
                    <div key={item.id} style={styles.card}>
                      <strong>{item.role} - {item.name}</strong>
                      <div>
                        <button style={styles.smallButton} onClick={() => setOfficeForm(item)}>Edit</button>
                        <button
                          style={styles.deleteButton}
                          onClick={() =>
                            setOfficeBearers((prev) => prev.filter((x) => x.id !== item.id))
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={styles.adminBox}>
                  <h3 style={{ marginTop: 0 }}>Noticeboard</h3>
                  <div style={styles.formBox}>
                    <input
                      style={styles.input}
                      placeholder="Title"
                      value={noticeForm.title}
                      onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                    />
                    <input
                      style={styles.input}
                      placeholder="Date"
                      value={noticeForm.date}
                      onChange={(e) => setNoticeForm({ ...noticeForm, date: e.target.value })}
                    />
                    <textarea
                      style={styles.textarea}
                      placeholder="Notice message"
                      value={noticeForm.message}
                      onChange={(e) => setNoticeForm({ ...noticeForm, message: e.target.value })}
                    />
                    <button style={styles.smallButton} onClick={saveNotice}>
                      {noticeForm.id ? "Update Notice" : "Add Notice"}
                    </button>
                    <button style={styles.deleteButton} onClick={resetNoticeForm}>Clear</button>
                  </div>

                  {noticeboardItems.map((item) => (
                    <div key={item.id} style={styles.card}>
                      <strong>{item.title}</strong>
                      <div>
                        <button style={styles.smallButton} onClick={() => setNoticeForm(item)}>Edit</button>
                        <button
                          style={styles.deleteButton}
                          onClick={() =>
                            setNoticeboardItems((prev) => prev.filter((x) => x.id !== item.id))
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={styles.adminBox}>
                  <h3 style={{ marginTop: 0 }}>Tournament</h3>
                  <div style={styles.formBox}>
                    <input
                      style={styles.input}
                      placeholder="Tournament title"
                      value={tournamentForm.title}
                      onChange={(e) =>
                        setTournamentForm({ ...tournamentForm, title: e.target.value })
                      }
                    />
                    <input
                      style={styles.input}
                      placeholder="Date"
                      value={tournamentForm.date}
                      onChange={(e) =>
                        setTournamentForm({ ...tournamentForm, date: e.target.value })
                      }
                    />
                    <textarea
                      style={styles.textarea}
                      placeholder="Details"
                      value={tournamentForm.details}
                      onChange={(e) =>
                        setTournamentForm({ ...tournamentForm, details: e.target.value })
                      }
                    />
                    <button style={styles.smallButton} onClick={saveTournament}>
                      {tournamentForm.id ? "Update Tournament" : "Add Tournament"}
                    </button>
                    <button style={styles.deleteButton} onClick={resetTournamentForm}>Clear</button>
                  </div>

                  {tournamentItems.map((item) => (
                    <div key={item.id} style={styles.card}>
                      <strong>{item.title}</strong>
                      <div>
                        <button style={styles.smallButton} onClick={() => setTournamentForm(item)}>
                          Edit
                        </button>
                        <button
                          style={styles.deleteButton}
                          onClick={() =>
                            setTournamentItems((prev) => prev.filter((x) => x.id !== item.id))
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
