import { useState } from "react";
import "./Careers.css";
import heroImage from "../assets/care.png";

const Careers = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(""); // 'uploading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    const allowed = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowed.includes(selected.type)) {
      setErrorMsg('Only PDF and DOC/DOCX files are allowed');
      setFile(null);
      return;
    }

    if (selected.size > 5 * 1024 * 1024) {
      setErrorMsg('File size must be under 5MB');
      setFile(null);
      return;
    }

    setErrorMsg("");
    setFile(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setErrorMsg("Please select a file first");
      return;
    }

    setStatus("uploading");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await fetch("http://localhost:5000/api/careers", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setStatus("success");
        setFile(null);
        // Reset file input
        document.getElementById("resumeUpload").value = "";
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Something went wrong");
        setStatus("error");
      }
    } catch (err) {
      setErrorMsg("Could not connect to server");
      setStatus("error");
    }
  };

  return (
    <div className="ca-wrapper">

      {/* NAVBAR SPACER */}
      <div className="navbar-spacer"></div>

      {/* HERO */}
      <section
        className="ca-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="ca-overlay"></div>

        <div className="career-container">
          <h1>Join Our Team</h1>
          <p>We're always looking for talented individuals. Upload your resume to apply.</p>

          <form onSubmit={handleSubmit}>
            <label className="upload-btn" htmlFor="resumeUpload">
              {file ? `📄 ${file.name}` : "Upload Resume"}
            </label>
            <input
              type="file"
              id="resumeUpload"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />

            {file && (
              <button
                type="submit"
                className="upload-btn"
                disabled={status === "uploading"}
                style={{ marginTop: "12px", display: "block" }}
              >
                {status === "uploading" ? "Sending..." : "Submit Resume"}
              </button>
            )}
          </form>

          {status === "success" && (
            <p style={{ color: "#4ade80", marginTop: "12px" }}>
              ✅ Resume submitted successfully! We'll be in touch.
            </p>
          )}
          {(status === "error" || errorMsg) && (
            <p style={{ color: "#f87171", marginTop: "12px" }}>
              ❌ {errorMsg}
            </p>
          )}
        </div>

      </section>
    </div>
  );
};

export default Careers;