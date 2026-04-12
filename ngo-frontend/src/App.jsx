import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Branch from "./pages/Branch";
import Donate from "./pages/Donate";
import Admission from "./pages/Admission";
import Discharge from "./pages/Discharge";
import Records from "./pages/Records";
import DonationForm from "./pages/DonationForm";
import MyDonations from "./pages/MyDonations";
import AdminDonations from "./pages/AdminDonations";
import Volunteer from "./pages/Volunteer";
import UserSignup from "./pages/UserSignup";
import UserLogin from "./pages/UserLogin";

// ✅ IMPORT GALLERY
import Gallery from "./components/Gallery";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/user-login" element={<UserLogin />} />

        {/* ✅ IMPORTANT */}
        <Route path="/gallery" element={<Gallery />} />

        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/branch/:id" element={<Branch />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/donate/:type" element={<DonationForm />} />
        <Route path="/my-donations" element={<MyDonations />} />
        <Route path="/admin/donations" element={<AdminDonations />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/branch/:id/admission" element={<Admission />} />
        <Route path="/branch/:id/discharge" element={<Discharge />} />
        <Route path="/branch/:id/records" element={<Records />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;