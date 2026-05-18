import React from "react";
import { BrainCircuit } from "lucide-react";

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const theme = {
    background: isDarkMode
      ? "rgba(3, 7, 18, 0.9)"
      : "rgba(255, 255, 255, 0.9)",

    border: isDarkMode
      ? "rgba(168, 85, 247, 0.15)"
      : "#e5e7eb",

    text: isDarkMode ? "#ffffff" : "#111827",

    buttonBg: isDarkMode
      ? "rgba(31, 41, 55, 0.9)"
      : "#f3f4f6",

    buttonBorder: isDarkMode
      ? "rgba(168, 85, 247, 0.25)"
      : "#d1d5db",
  };

  const isMobile = window.innerWidth < 768;

  return (
    <div
      style={{
        height: "90px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "0 20px" : "0 150px",
        backgroundColor: theme.background,
        borderBottom: `1px solid ${theme.border}`,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <BrainCircuit size={34} color="#a855f7" />

        <span
          style={{
            fontSize: isMobile ? "2rem" : "2.8rem",
            fontWeight: "800",
            color: theme.text,
            letterSpacing: "-0.03em",
            userSelect: "none",
          }}
        >
          Codeify
        </span>
      </div>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        title="Toggle Theme"
        style={{
          width: isMobile ? "52px" : "62px",
          height: isMobile ? "52px" : "62px",
          borderRadius: "16px",
          border: `1px solid ${theme.buttonBorder}`,
          backgroundColor: theme.buttonBg,
          cursor: "pointer",
          fontSize: isMobile ? "1.6rem" : "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: theme.text,
          boxShadow: isDarkMode
            ? "0 0 25px rgba(168, 85, 247, 0.18)"
            : "0 4px 12px rgba(0, 0, 0, 0.08)",
          transition: "all 0.3s ease",
        }}
      >
        {isDarkMode ? "☀️" : "🌙"}
      </button>
    </div>
  );
};

export default Navbar;