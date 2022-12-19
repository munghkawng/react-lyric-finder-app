import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="bg-light p-5">
      <div className="d-flex justify-content-center mb-3">
        <Link to="#" className="px-3 text-decoration-none border-end">
          Privacy Policy
        </Link>
        <Link to="#" className="px-3 text-decoration-none border-end">
          Term
        </Link>
        <Link to="#" className="px-3 text-decoration-none">
          Contact Us
        </Link>
      </div>
      <p className="text-lead text-center">
        Copyright © MUNG All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
