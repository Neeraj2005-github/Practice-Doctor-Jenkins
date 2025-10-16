import { Routes, Route, Link } from 'react-router-dom';
import './doctor.css';
import AddDoctor from './AddDoctor';
import ViewDoctors from './ViewDoctors';

export default function DoctorNavbar() {

  const handleLogout = () => {
    sessionStorage.removeItem('doctor'); // clear any saved doctor data
    window.location.href = '/'; // redirect to main page
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">Doctor Panel</div>
        <ul className="nav-links">
          <li><Link to="/adddoctor">Add Doctor</Link></li>
         <li><Link to="/ViewDoctors">View Doctors</Link></li>

          <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
        </ul>
      </nav>
 <Routes>
        <Route path="/adddoctor" element={<AddDoctor />} exact />
        <Route path="/ViewDoctors" element={<ViewDoctors />} exact />
 


      </Routes>
    </div>
  );
}
