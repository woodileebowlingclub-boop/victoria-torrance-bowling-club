import React from "react";
import logo from "./assets/logo.png";

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #0b3d91, #1e5bb8, #4a7edc)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },

  container: {
    textAlign: "center",
    background: "#ffffff",
    padding: "40px 20px",
    borderRadius: "20px",
    width: "90%",
    maxWidth: "600px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
  },

  logo: {
    width: "260px", // KEEP SAME SIZE
    height: "auto",
    marginBottom: "25px",
  },

  title: {
    fontSize: "32px",        // BIGGER (main fix)
    fontWeight: "bold",
    color: "#0b3d91",
    marginBottom: "12px",
    lineHeight: "1.2",
  },

  subtitle: {
    fontSize: "20px",        // BIGGER (balanced under title)
    color: "#444",
  },
};

export default function App() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* LOGO */}
        <img src={logo} alt="Club Logo" style={styles.logo} />

        {/* TITLE */}
        <div style={styles.title}>
          Victoria Torrance Bowling Club
        </div>

        {/* SUBTITLE */}
        <div style={styles.subtitle}>
          Welcome to the club app
        </div>

      </div>
    </div>
  );
}
