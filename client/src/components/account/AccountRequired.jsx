import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Auth from "../../utils/auth";

import { useState, useEffect } from "react";

export default function AccountRequired({ show, setShow, loginFn }) {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignupForm, setShowSignupForm] = useState(false);

  useEffect(() => {
    return () => setShow(false);
  }, []);

  if (!show) return <></>;

  return (
    <>
      <LoginForm
        show={showLogin}
        setShowSignupForm={setShowSignupForm}
        onHide={() => setShowLogin(false)}
        afterLogin={loginFn}
        verifyLogin="You must be signed in to cast this spell."
      />

      <SignupForm
        show={showSignupForm}
        setShowLogin={setShowLogin}
        onHide={() => setShowSignupForm(false)}
        afterLogin={loginFn}
        verifyLogin="You must be signed in to cast this spell."
      />
    </>
  );
}
