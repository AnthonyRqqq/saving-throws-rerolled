import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Auth from "../utils/auth";
import { LoginForm, SignupForm } from "./account";

export default function Nav() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const navigate = useNavigate();
  const currentPage = useLocation().pathname;

  const nvaItems = [{ label: "Saving Throws", path: "/" }];

  return (
    <>
      <LoginForm
        show={showLogin}
        setShowSignupForm={setShowSignupForm}
        onHide={() => setShowLogin(false)}
      />
      <SignupForm
        show={showSignupForm}
        setShowLogin={setShowLogin}
        onHide={() => setShowSignupForm(false)}
      />

      <ul className="nav-menu">
        {/* Link to login page, changes to logout button if user logged in */}
        {!Auth.loggedIn() ? (
          <li className="nav-item">
            <Link
              to={currentPage}
              onClick={() => setShowLogin(true)}
              className={`${
                currentPage === "/login" ? "nav-link active-link" : "nav-link"
              } link-item`}
            >
              Login / Signup
            </Link>
          </li>
        ) : (
          <li className="nav-item">
            <Link
              to="/"
              className={`${
                currentPage === "/" ? "nav-link active-link" : "nav-link"
              } link-item`}
              onClick={() => Auth.logout()}
            >
              Logout
            </Link>
          </li>
        )}
        {navItems.map((item, idx) => (
          <li className="nav-item" key={idx}>
            <a
              href={item.path}
              onClick={(e) => {
                e.preventDefault();
                navigate(item.path);
              }}
              className="hover-lighten focus-lighten"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
