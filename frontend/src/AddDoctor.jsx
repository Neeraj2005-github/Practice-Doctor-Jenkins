import { useState } from "react";
import axios from "axios";
import { API_URL } from "./config";

export default function AddDoctor() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileno: "",
    specialization: "",
    qualification: "",
    medicallicense: "",
    yearsofexperience: "",
    address: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post(`${API_URL}/adddoctor`, formData);
    setMessage("Doctor added successfully");
    setError("");
    setFormData({
      name: "",
      email: "",
      mobileno: "",
      specialization: "",
      qualification: "",
      medicallicense: "",
      yearsofexperience: "",
      address: ""
    });
  } catch (err) {
    // If backend returns object, extract message
    if (err.response && err.response.data) {
      // Check if it's an object with 'message'
      const data = err.response.data;
      setError(data.message || JSON.stringify(data));
    } else {
      setError(err.message || "Unexpected error");
    }
    setMessage("");
  }
};

 return (
  <div className="container">
    <h3>Add Doctor</h3>
    {message && <p style={{ color: "green" }}>{message}</p>}
    {error && <p style={{ color: "red" }}>{error}</p>}
    <form onSubmit={handleSubmit}>
      {["name","email","mobileno","specialization","qualification","medicallicense","yearsofexperience","address"].map(field => (
        <div key={field} className="form-group">
          <label>{field.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}</label>

          {field === "specialization" ? (
            <select
              id={field}
              value={formData[field]}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select Specialization</option>
              <option value="General Medicine">General Medicine</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Pediatrics">Pediatrics</option>
            </select>
          ) : (
            <input
              type="text"
              id={field}
              value={formData[field]}
              onChange={handleChange}
              className="form-control"
              required
            />
          )}
        </div>
      ))}
      <button type="submit">Add Doctor</button>
    </form>
  </div>
);
}