import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      <main className="flex-grow">
        <Outlet />
      </main>

      <ToastContainer />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
