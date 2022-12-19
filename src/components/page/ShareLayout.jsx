import Navbar from "../NavBar";
import { Outlet } from "react-router-dom";
function ShareLayout() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
}

export default ShareLayout;
