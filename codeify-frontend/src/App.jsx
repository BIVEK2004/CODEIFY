import React, { useState, useMemo } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Editor from "@monaco-editor/react";
import Select from "react-select";

const App = () => {
  const options = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "c", label: "C" },
    { value: "csharp", label: "C#" },
    { value: "go", label: "Go" },
    { value: "php", label: "PHP" },
    { value: "ruby", label: "Ruby" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "json", label: "JSON" },
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [code, setCode] = useState("// Write your code here...");
  const [response, setResponse] = useState("Your response will appear here...");
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Responsive check
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 768 : false;

  // Theme object
  const theme = useMemo(
    () => ({
      background: isDarkMode
        ? "linear-gradient(135deg, #030712 0%, #0f172a 45%, #312e81 100%)"
        : "#f8fafc",

      panel: isDarkMode
        ? "rgba(17, 24, 39, 0.88)"
        : "#ffffff",

      card: isDarkMode
        ? "rgba(3, 7, 18, 0.95)"
        : "#ffffff",

      editorBackground: isDarkMode
        ? "#111827"
        : "#ffffff",

      border: isDarkMode
        ? "rgba(168, 85, 247, 0.22)"
        : "#d1d5db",

      text: isDarkMode ? "#ffffff" : "#111827",
      subText: isDarkMode ? "#d1d5db" : "#374151",

      buttonBg: isDarkMode
        ? "rgba(39, 39, 42, 0.9)"
        : "#f3f4f6",

      buttonBorder: isDarkMode
        ? "rgba(168, 85, 247, 0.25)"
        : "#d1d5db",

      accent: "#a855f7",

      shadow: isDarkMode
        ? "0 10px 40px rgba(0, 0, 0, 0.35)"
        : "0 10px 30px rgba(0, 0, 0, 0.06)",
    }),
    [isDarkMode]
  );

  async function reviewCode() {
    try {
      setLoading(true);
      setResponse("Reviewing your code...");

      const response = await fetch("http://localhost:8000/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
          language: selectedOption.value,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResponse(data.review);
      } else {
        setResponse(`Error: ${data.message || "Failed to generate review."}`);
      }
    } catch (error) {
      console.error(error);
      setResponse(
        "Error generating review. Make sure the backend server is running on http://localhost:5000"
      );
    } finally {
      setLoading(false);
    }
  }

  // React Select Styles
  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: theme.editorBackground,
      borderColor: state.isFocused ? theme.accent : theme.border,
      boxShadow: "none",
      minHeight: "50px",
      borderRadius: isMobile ? "10px" : "10px 0 0 10px",
      color: theme.text,
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: theme.editorBackground,
      color: theme.text,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? isDarkMode
          ? "#1f2937"
          : "#f3f4f6"
        : state.isSelected
        ? isDarkMode
          ? "#374151"
          : "#e5e7eb"
        : theme.editorBackground,
      color: theme.text,
      cursor: "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: theme.text,
    }),
    input: (provided) => ({
      ...provided,
      color: theme.text,
    }),
  };

  return (
    <>
      <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          height: isMobile ? "auto" : "calc(100vh - 90px)",
          background: theme.background,
          color: theme.text,
          transition: "all 0.3s ease",
        }}
      >
        {/* LEFT PANEL */}
        <div
          style={{
            width: isMobile ? "100%" : "50%",
            height: isMobile ? "auto" : "calc(100vh - 90px)",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: theme.panel,
            backdropFilter: "blur(12px)",
            boxShadow: theme.shadow,
            borderRight: isMobile ? "none" : `1px solid ${theme.border}`,
            borderBottom: isMobile ? `1px solid ${theme.border}` : "none",
          }}
        >
          {/* Controls */}
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <div style={{ flex: isMobile ? "none" : 4 }}>
              <Select
                value={selectedOption}
                onChange={setSelectedOption}
                options={options}
                styles={selectStyles}
                isSearchable
              />
            </div>

            <div style={{ flex: isMobile ? "none" : 1 }}>
              <button
                onClick={reviewCode}
                disabled={loading}
                style={{
                  width: "100%",
                  height: "50px",
                  background:
                    "linear-gradient(135deg, #c084fc 0%, #9333ea 50%, #7e22ce 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: isMobile ? "10px" : "0 10px 10px 0",
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "15px",
                  boxShadow: isDarkMode
                    ? "0 0 20px rgba(168, 85, 247, 0.35)"
                    : "none",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "Reviewing..." : "Review"}
              </button>
            </div>
          </div>

          {/* Editor */}
          <div
            style={{
              flex: 1,
              height: isMobile ? "400px" : "100%",
              border: isDarkMode
                ? "1px solid rgba(168, 85, 247, 0.25)"
                : `1px solid ${theme.border}`,
              borderRadius: "16px",
              overflow: "hidden",
              background: isDarkMode
                ? "linear-gradient(145deg, #111827, #0b1120)"
                : "#ffffff",
              boxShadow: isDarkMode
                ? `
                  0 0 30px rgba(168, 85, 247, 0.12),
                  0 12px 40px rgba(0, 0, 0, 0.45),
                  inset 0 1px 0 rgba(255,255,255,0.03)
                `
                : "0 8px 24px rgba(0,0,0,0.06)",
            }}
          >
            <Editor
              height="100%"
              theme={isDarkMode ? "vs-dark" : "light"}
              language={selectedOption.value}
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 15,
                fontFamily: "'Fira Code', monospace",
                fontLigatures: true,
                scrollBeyondLastLine: false,
                wordWrap: "on",
                smoothScrolling: true,
                cursorBlinking: "smooth",
                padding: {
                  top: 20,
                  bottom: 20,
                },
              }}
            />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div
          style={{
            width: isMobile ? "100%" : "50%",
            height: isMobile ? "auto" : "calc(100vh - 90px)",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: theme.panel,
            backdropFilter: "blur(12px)",
            boxShadow: theme.shadow,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
              gap: "12px",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: isMobile ? "2rem" : "2.4rem",
                fontWeight: 800,
                color: theme.text,
              }}
            >
              Response
            </h2>

            <button
              onClick={() =>
                setResponse("Your response will appear here...")
              }
              style={{
                backgroundColor: theme.buttonBg,
                color: theme.text,
                border: `1px solid ${theme.buttonBorder}`,
                padding: "10px 18px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Clear
            </button>
          </div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              backgroundColor: theme.border,
              marginBottom: "20px",
            }}
          />

          {/* Response Box */}
          <div
            style={{
              flex: 1,
              height: isMobile ? "350px" : "100%",
              backgroundColor: theme.card,
              border: `1px solid ${theme.border}`,
              borderRadius: "12px",
              padding: "20px",
              overflowY: "auto",
              color: theme.subText,
              lineHeight: 1.8,
              whiteSpace: "pre-wrap",
              boxShadow: isDarkMode
                ? "0 0 30px rgba(168, 85, 247, 0.12)"
                : "0 8px 24px rgba(0,0,0,0.06)",
            }}
          >
            {loading ? (
              <div
                style={{
                  color: theme.accent,
                  fontWeight: 600,
                }}
              >
                Reviewing your code...
              </div>
            ) : (
              response
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;