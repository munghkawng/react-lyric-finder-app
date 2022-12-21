import Navbar from "../NavBar";
import { Outlet } from "react-router-dom";

function ShareLayout() {
  return (
    <>
      <Navbar />

      <div className="container min-vh-100">
        <Outlet />
      </div>
    </>
  );
}

export default ShareLayout;
