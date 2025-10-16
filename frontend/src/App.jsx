import { BrowserRouter } from "react-router-dom";
import DoctorNavbar from "./NavBar.jsx";
import './frontend.css';

function App() {
  return (
    <BrowserRouter>
      <DoctorNavbar />
    </BrowserRouter>
  );
}

export default App;
