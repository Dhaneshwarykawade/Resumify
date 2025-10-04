import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => (
    <div
        style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)",
            color: "#1e293b",
            fontFamily: "Segoe UI, sans-serif",
        }}
    >
        <h1 style={{ fontSize: "6rem", margin: 0, fontWeight: 700, color: "#6366f1" }}>
            404
        </h1>
        <h2 style={{ fontSize: "2rem", margin: "1rem 0" }}>
            Oops! Page Not Found
        </h2>
        <p style={{ fontSize: "1.1rem", marginBottom: "2rem", color: "#64748b" }}>
            The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
            to="/"
            style={{
                padding: "0.75rem 2rem",
                background: "#6366f1",
                color: "#fff",
                borderRadius: "999px",
                textDecoration: "none",
                fontWeight: 500,
                boxShadow: "0 2px 8px rgba(99,102,241,0.15)",
                transition: "background 0.2s",
            }}
        >
            Go Home
        </Link>
    </div>
);

export default ErrorPage;