import { useEffect, useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "./config";

export default function ViewDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");

  const [editingDoctor, setEditingDoctor] = useState(null); // selected doctor to update
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

  const displayDoctors = async () => {
    try {
      const response = await axios.get(`${API_URL}/viewalldoctors`);
      setDoctors(response.data);
    } catch (err) {
      setError("Failed to fetch doctors data: " + err.message);
    }
  };

  useEffect(() => { displayDoctors(); }, []);

  const deleteDoctor = async (id) => {
    try {
      await axios.delete(`${API_URL}/deletedoctor?id=${id}`);
      toast.success("Doctor deleted successfully");
      displayDoctors();
    } catch (err) {
      toast.error("Deletion failed: " + err.message);
    }
  };

  const handleEditClick = (doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      email: doctor.email,
      mobileno: doctor.mobileno,
      specialization: doctor.specialization,
      qualification: doctor.qualification,
      medicallicense: doctor.medicallicense,
      yearsofexperience: doctor.yearsofexperience,
      address: doctor.address
    });
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/updatedoctor/${editingDoctor.id}`, formData);
      toast.success("Doctor updated successfully");
      setEditingDoctor(null);
      displayDoctors();
    } catch (err) {
      toast.error("Update failed: " + err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3 style={{ textAlign: "center", fontWeight: "bolder" }}>Doctors</h3>
      <ToastContainer position="top-center" autoClose={4000} />
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Mobile</th><th>Specialization</th>
            <th>Qualification</th><th>Medical License</th><th>Years Exp.</th><th>Address</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.id}</td>
              <td>{doctor.name}</td>
              <td>{doctor.email}</td>
              <td>{doctor.mobileno}</td>
              <td>{doctor.specialization}</td>
              <td>{doctor.qualification}</td>
              <td>{doctor.medicallicense}</td>
              <td>{doctor.yearsofexperience}</td>
              <td>{doctor.address}</td>
              <td>
                <Button variant="outlined" onClick={() => handleEditClick(doctor)}>Update</Button>
                <Button variant="outlined" color="error" style={{ marginLeft: "5px" }} onClick={() => deleteDoctor(doctor.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingDoctor && (
        <div style={{ marginTop: "30px", border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
          <h4>Update Doctor ID: {editingDoctor.id}</h4>
          <form onSubmit={handleUpdate}>
            {Object.keys(formData).map(field => (
  <div key={field} style={{ marginBottom: "10px" }}>
    <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>

    {field === "specialization" ? (
      <select
        id={field}
        value={formData[field]}
        onChange={handleChange}
        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
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
        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        required
      />
    )}
  </div>
))}

            <button type="submit" style={{ padding: "10px 20px", background: "#4A90E2", color: "white", border: "none", borderRadius: "5px" }}>Update</button>
          </form>
        </div>
      )}
    </div>
  );
}
