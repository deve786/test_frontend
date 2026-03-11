
import "./Careers.css";
import heroImage from "../assets/care.png";

const Careers = () => {
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
      <p>We’re always looking for talented individuals. Upload your resume to apply.</p>
      
      <label className="upload-btn" htmlFor="resumeUpload">
        Upload Resume
      </label>
      <input type="file" id="resumeUpload" name="resume" />
    </div>
 
      </section>
    </div>
     
  );
};

export default Careers;
