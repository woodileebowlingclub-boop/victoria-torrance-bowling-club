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
    padding: "30px",
    borderRadius: "16px",
    width: "90%",
    maxWidth: "500px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
  },

  logo: {
    width: "250px",
    height: "auto",
    marginBottom: "20px",
  },

  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#0b3d91",
    marginBottom: "10px",
  },

  subtitle: {
    fontSize: "16px",
    color: "#555",
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
