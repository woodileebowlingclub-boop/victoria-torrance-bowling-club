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
    width: "260px",
    height: "auto",
    marginBottom: "25px",
  },

  title: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#0b3d91",
    marginBottom: "12px",
    lineHeight: "1.2",
  },

  subtitle: {
    fontSize: "20px",
    color: "#444",
  },
};

export default function App() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <img src={logo} alt="Club Logo" style={styles.logo} />

        <div style={styles.title}>
          Victoria Torrance Bowling Club
        </div>

        <div style={styles.subtitle}>
          Welcome to the club app
        </div>
      </div>
    </div>
  );
}
