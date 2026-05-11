import React, { useMemo, useState } from "react";
import logo from "./assets/logo.png";

const CLUB_PIN = "1234";
const ADMIN_PIN = "2059";
const CLUB_NAME = "Victoria Bowling Club, Torrance";

function nextId(items) {
  return items.length ? Math.max(...items.map((x) => x.id)) + 1 : 1;
}

function phoneLink(number) {
  if (!number) return "";
  return `tel:${number.replace(/\s/g, "")}`;
}

function whatsappLink(number) {
  if (!number) return "";
  let clean = number.replace(/\s/g, "").replace("+", "");
  if (clean.startsWith("0")) clean = "44" + clean.slice(1);
  return `https://wa.me/${clean}`;
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
    background: "#fff",
    borderRadius: 18,
    padding: 26,
    textAlign: "center",
  },
  header: {
    background: "linear-gradient(135deg, #1b2f72 0%, #355f9d 55%, #68c1e6 100%)",
    color: "#fff",
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
  },
  headerRow: { display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" },
  logo: {
    width: 78,
    height: 78,
    objectFit: "contain",
    background: "#fff",
    borderRadius: "50%",
    padding: 4,
  },
  title: { margin: 0, fontSize: 30 },
  subtitle: { margin: "6px 0 0 0" },
  tabs: { display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" },
  tab: (active) => ({
    padding: "11px 18px",
    borderRadius: 10,
    border: active ? "2px solid #fff" : "2px solid #cfd6dc",
    background: active ? "#1b2f72" : "#f4f7fa",
    color: active ? "#fff" : "#1f1f1f",
    fontWeight: "bold",
    cursor: "pointer",
  }),
  panel: {
    background: "#fff",
    borderRadius: 18,
    padding: 22,
    marginBottom: 18,
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
    minHeight: 90,
    background: "#fff",
    color: "#000",
  },
  button: {
    marginTop: 12,
    padding: "12px 16px",
    borderRadius: 10,
    border: "none",
    background: "#1b2f72",
    color: "#fff",
    fontWeight: "bold",
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
  formBox: {
    background: "#eef7fc",
    border: "1px solid #cfe0ea",
    borderRadius: 14,
    padding: 14,
    marginBottom: 18,
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 12,
  },
  whatsapp: {
    color: "#128C7E",
    fontWeight: "bold",
    textDecoration: "none",
  },
};

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

  const [memberForm, setMemberForm] = useState({ id: null, name: "", section: "", phone: "", whatsapp: "" });
  const [diaryForm, setDiaryForm] = useState({ id: null, title: "", date: "", time: "", details: "" });
  const [officeForm, setOfficeForm] = useState({ id: null, role: "", name: "", phone: "", whatsapp: "" });
  const [noticeForm, setNoticeForm] = useState({ id: null, title: "", message: "", date: "" });
  const [tournamentForm, setTournamentForm] = useState({ id: null, title: "", date: "", details: "" });

  const sortedDiary = useMemo(() => {
    return [...diaryItems].sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
  }, [diaryItems]);

  const resetMemberForm = () => setMemberForm({ id: null, name: "", section: "", phone: "", whatsapp: "" });
  const resetDiaryForm = () => setDiaryForm({ id: null, title: "", date: "", time: "", details: "" });
  const resetOfficeForm = () => setOfficeForm({ id: null, role: "", name: "", phone: "", whatsapp: "" });
  const resetNoticeForm = () => setNoticeForm({ id: null, title: "", message: "", date: "" });
  const resetTournamentForm = () => setTournamentForm({ id: null, title: "", date: "", details: "" });

  const saveMember = () => {
    if (!memberForm.name) return;
    setMembers((prev) =>
      memberForm.id ? prev.map((x) => (x.id === memberForm.id ? memberForm : x)) : [...prev, { ...memberForm, id: nextId(prev) }]
    );
    resetMemberForm();
  };

  const saveDiary = () => {
    if (!diaryForm.title) return;
    setDiaryItems((prev) =>
      diaryForm.id ? prev.map((x) => (x.id === diaryForm.id ? diaryForm : x)) : [...prev, { ...diaryForm, id: nextId(prev) }]
    );
    resetDiaryForm();
  };

  const saveOffice = () => {
    if (!officeForm.role || !officeForm.name) return;
    setOfficeBearers((prev) =>
      officeForm.id ? prev.map((x) => (x.id === officeForm.id ? officeForm : x)) : [...prev, { ...officeForm, id: nextId(prev) }]
    );
    resetOfficeForm();
  };

  const saveNotice = () => {
    if (!noticeForm.title || !noticeForm.message) return;
    setNoticeboardItems((prev) =>
      noticeForm.id ? prev.map((x) => (x.id === noticeForm.id ? noticeForm : x)) : [...prev, { ...noticeForm, id: nextId(prev) }]
    );
    resetNoticeForm();
  };

  const saveTournament = () => {
    if (!tournamentForm.title) return;
    setTournamentItems((prev) =>
      tournamentForm.id ? prev.map((x) => (x.id === tournamentForm.id ? tournamentForm : x)) : [...prev, { ...tournamentForm, id: nextId(prev) }]
    );
    resetTournamentForm();
  };

  if (!loggedIn) {
    return (
      <div style={styles.page}>
        <div style={styles.loginPanel}>
          <img src={logo} alt="logo" style={styles.logo} />
          <h1>{CLUB_NAME}</h1>
          <input
            type="password"
            placeholder="Enter Members PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            style={styles.input}
          />
          <button
            style={styles.button}
            onClick={() => {
              if (pin === CLUB_PIN) setLoggedIn(true);
              else setMessage("Incorrect members PIN");
            }}
          >
            Enter
          </button>
          {message && <p>{message}</p>}
        </div>
      </div>
    );
  }

  const AdminUnlockBox = () =>
    !adminUnlocked ? (
      <div style={styles.formBox}>
        <h3>Unlock Admin Editing</h3>
        <input
          type="password"
          placeholder="Enter Admin PIN"
          value={adminPin}
          onChange={(e) => setAdminPin(e.target.value)}
          style={styles.input}
        />
        <button
          style={styles.button}
          onClick={() => {
            if (adminPin === ADMIN_PIN) {
              setAdminUnlocked(true);
              setMessage("");
            } else {
              setMessage("Wrong admin PIN");
            }
          }}
        >
          Unlock Editing
        </button>
        {message && <p>{message}</p>}
      </div>
    ) : null;

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
          {["home", "diary", "members", "office", "noticeboard", "tournament", "admin"].map((x) => (
            <button key={x} style={styles.tab(tab === x)} onClick={() => setTab(x)}>
              {x === "office" ? "Office Bearers" : x.charAt(0).toUpperCase() + x.slice(1)}
            </button>
          ))}
        </div>

        {tab === "home" && (
          <div style={styles.panel}>
            <h2>Welcome</h2>
            <p>Welcome to the {CLUB_NAME} app.</p>
            <p>Use the tabs above to view club information.</p>
          </div>
        )}

        {tab === "diary" && (
          <div style={styles.panel}>
            <h2>Diary</h2>
            <AdminUnlockBox />

            {adminUnlocked && (
              <div style={styles.formBox}>
                <input style={styles.input} placeholder="Title" value={diaryForm.title} onChange={(e) => setDiaryForm({ ...diaryForm, title: e.target.value })} />
                <input style={styles.input} placeholder="Date" value={diaryForm.date} onChange={(e) => setDiaryForm({ ...diaryForm, date: e.target.value })} />
                <input style={styles.input} placeholder="Time" value={diaryForm.time} onChange={(e) => setDiaryForm({ ...diaryForm, time: e.target.value })} />
                <textarea style={styles.textarea} placeholder="Details" value={diaryForm.details} onChange={(e) => setDiaryForm({ ...diaryForm, details: e.target.value })} />
                <button style={styles.smallButton} onClick={saveDiary}>{diaryForm.id ? "Update Diary Item" : "Add Diary Item"}</button>
                <button style={styles.deleteButton} onClick={resetDiaryForm}>Clear</button>
              </div>
            )}

            {sortedDiary.length === 0 ? <p>No diary entries added yet.</p> : sortedDiary.map((item) => (
              <div key={item.id} style={styles.card}>
                <h3>{item.title}</h3>
                {item.date && <p><strong>Date:</strong> {item.date}</p>}
                {item.time && <p><strong>Time:</strong> {item.time}</p>}
                {item.details && <p>{item.details}</p>}
                {adminUnlocked && (
                  <>
                    <button style={styles.smallButton} onClick={() => setDiaryForm(item)}>Edit</button>
                    <button style={styles.deleteButton} onClick={() => setDiaryItems((prev) => prev.filter((x) => x.id !== item.id))}>Delete</button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "members" && (
          <div style={styles.panel}>
            <h2>Members</h2>
            <AdminUnlockBox />

            {adminUnlocked && (
              <div style={styles.formBox}>
                <input style={styles.input} placeholder="Member name" value={memberForm.name} onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })} />
                <input style={styles.input} placeholder="Section" value={memberForm.section} onChange={(e) => setMemberForm({ ...memberForm, section: e.target.value })} />
                <input style={styles.input} placeholder="Phone number" value={memberForm.phone} onChange={(e) => setMemberForm({ ...memberForm, phone: e.target.value })} />
                <input style={styles.input} placeholder="WhatsApp number" value={memberForm.whatsapp} onChange={(e) => setMemberForm({ ...memberForm, whatsapp: e.target.value })} />
                <button style={styles.smallButton} onClick={saveMember}>{memberForm.id ? "Update Member" : "Add Member"}</button>
                <button style={styles.deleteButton} onClick={resetMemberForm}>Clear</button>
              </div>
            )}

            {members.length === 0 ? <p>No members added yet.</p> : members.map((item) => (
              <div key={item.id} style={styles.card}>
                <h3>{item.name}</h3>
                {item.section && <p><strong>Section:</strong> {item.section}</p>}
                {item.phone && <p><strong>Phone:</strong> <a href={phoneLink(item.phone)}>{item.phone}</a></p>}
                {item.whatsapp && <p><strong>WhatsApp:</strong> <a style={styles.whatsapp} href={whatsappLink(item.whatsapp)} target="_blank" rel="noreferrer">{item.whatsapp}</a></p>}
                {adminUnlocked && (
                  <>
                    <button style={styles.smallButton} onClick={() => setMemberForm(item)}>Edit</button>
                    <button style={styles.deleteButton} onClick={() => setMembers((prev) => prev.filter((x) => x.id !== item.id))}>Delete</button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "office" && (
          <div style={styles.panel}>
            <h2>Office Bearers</h2>
            <AdminUnlockBox />

            {adminUnlocked && (
              <div style={styles.formBox}>
                <input style={styles.input} placeholder="Role" value={officeForm.role} onChange={(e) => setOfficeForm({ ...officeForm, role: e.target.value })} />
                <input style={styles.input} placeholder="Name" value={officeForm.name} onChange={(e) => setOfficeForm({ ...officeForm, name: e.target.value })} />
                <input style={styles.input} placeholder="Phone number" value={officeForm.phone} onChange={(e) => setOfficeForm({ ...officeForm, phone: e.target.value })} />
                <input style={styles.input} placeholder="WhatsApp number" value={officeForm.whatsapp} onChange={(e) => setOfficeForm({ ...officeForm, whatsapp: e.target.value })} />
                <button style={styles.smallButton} onClick={saveOffice}>{officeForm.id ? "Update Office Bearer" : "Add Office Bearer"}</button>
                <button style={styles.deleteButton} onClick={resetOfficeForm}>Clear</button>
              </div>
            )}

            {officeBearers.length === 0 ? <p>No office bearers added yet.</p> : officeBearers.map((item) => (
              <div key={item.id} style={styles.card}>
                <h3>{item.role}</h3>
                <p><strong>Name:</strong> {item.name}</p>
                {item.phone && <p><strong>Phone:</strong> <a href={phoneLink(item.phone)}>{item.phone}</a></p>}
                {item.whatsapp && <p><strong>WhatsApp:</strong> <a style={styles.whatsapp} href={whatsappLink(item.whatsapp)} target="_blank" rel="noreferrer">{item.whatsapp}</a></p>}
                {adminUnlocked && (
                  <>
                    <button style={styles.smallButton} onClick={() => setOfficeForm(item)}>Edit</button>
                    <button style={styles.deleteButton} onClick={() => setOfficeBearers((prev) => prev.filter((x) => x.id !== item.id))}>Delete</button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "noticeboard" && (
          <div style={styles.panel}>
            <h2>Noticeboard</h2>
            <AdminUnlockBox />

            {adminUnlocked && (
              <div style={styles.formBox}>
                <input style={styles.input} placeholder="Title" value={noticeForm.title} onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })} />
                <input style={styles.input} placeholder="Date" value={noticeForm.date} onChange={(e) => setNoticeForm({ ...noticeForm, date: e.target.value })} />
                <textarea style={styles.textarea} placeholder="Message" value={noticeForm.message} onChange={(e) => setNoticeForm({ ...noticeForm, message: e.target.value })} />
                <button style={styles.smallButton} onClick={saveNotice}>{noticeForm.id ? "Update Notice" : "Add Notice"}</button>
                <button style={styles.deleteButton} onClick={resetNoticeForm}>Clear</button>
              </div>
            )}

            {noticeboardItems.length === 0 ? <p>No notices added yet.</p> : noticeboardItems.map((item) => (
              <div key={item.id} style={styles.card}>
                <h3>{item.title}</h3>
                {item.date && <p><strong>Date:</strong> {item.date}</p>}
                <p>{item.message}</p>
                {adminUnlocked && (
                  <>
                    <button style={styles.smallButton} onClick={() => setNoticeForm(item)}>Edit</button>
                    <button style={styles.deleteButton} onClick={() => setNoticeboardItems((prev) => prev.filter((x) => x.id !== item.id))}>Delete</button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "tournament" && (
          <div style={styles.panel}>
            <h2>Tournament</h2>
            <AdminUnlockBox />

            {adminUnlocked && (
              <div style={styles.formBox}>
                <input style={styles.input} placeholder="Tournament title" value={tournamentForm.title} onChange={(e) => setTournamentForm({ ...tournamentForm, title: e.target.value })} />
                <input style={styles.input} placeholder="Date" value={tournamentForm.date} onChange={(e) => setTournamentForm({ ...tournamentForm, date: e.target.value })} />
                <textarea style={styles.textarea} placeholder="Details" value={tournamentForm.details} onChange={(e) => setTournamentForm({ ...tournamentForm, details: e.target.value })} />
                <button style={styles.smallButton} onClick={saveTournament}>{tournamentForm.id ? "Update Tournament" : "Add Tournament"}</button>
                <button style={styles.deleteButton} onClick={resetTournamentForm}>Clear</button>
              </div>
            )}

            {tournamentItems.length === 0 ? <p>No tournament entries added yet.</p> : tournamentItems.map((item) => (
              <div key={item.id} style={styles.card}>
                <h3>{item.title}</h3>
                {item.date && <p><strong>Date:</strong> {item.date}</p>}
                {item.details && <p>{item.details}</p>}
                {adminUnlocked && (
                  <>
                    <button style={styles.smallButton} onClick={() => setTournamentForm(item)}>Edit</button>
                    <button style={styles.deleteButton} onClick={() => setTournamentItems((prev) => prev.filter((x) => x.id !== item.id))}>Delete</button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "admin" && (
          <div style={styles.panel}>
            <h2>Admin</h2>
            <AdminUnlockBox />
            {adminUnlocked && (
              <p>Admin editing is unlocked. Go into Diary, Members, Office Bearers, Noticeboard or Tournament to add, edit or delete entries.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
