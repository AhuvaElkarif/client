import React, { useState } from "react";
import { HiEyeOff, HiEye } from "react-icons/hi";
import { useToggle } from "./UseToggle";
import { Link } from "react-router-dom";

const PasswordReset = () => {
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [errorState, setErrorState] = useState("");
  const [eye, setEye] = useToggle(false);
  const strongRejex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");

  function handleNewPassword(event) {
    setnewPassword(event.target.value);

    if (strongRejex.test(event.target.value)) {
      setErrorState("");
    } else {
      setErrorState(
        "סיסמא חייבת להכיל לפחות אות אחת באנגלית ומספר"
      );
    }
  }
  function handleconfirmPassword(event) {
    setconfirmPassword(event.target.value);

    if (newPassword !== event.target.value) {
      setErrorState("הסיסמא לא מתאימה");
    } else {
      setErrorState("");
    }
  }

  return (
    <div>
      <div className=" form-box card  padding-one flex-gap vertical-card  card-shadow">
        <div className="medium-text bold-text">אתחול סיסמא</div>
        <form>
          <label className="small-text bold-text">סיסמא חדשה</label>
          <div className="input-box-container bg-white">
            <input
              type="text"
              value={newPassword}
              onChange={handleNewPassword}
            ></input>
          </div>
          <br />

          <label type="text" className="small-text bold-text">
            Confirm password
          </label>

          <div className="input-box-container bg-white">
            <input
              type={eye ? "text" : "password"}
              value={confirmPassword}
              onChange={handleconfirmPassword}
            ></input>
            <div onClick={setEye}>
              {eye ? <HiEyeOff color="grey" /> : <HiEye color="grey" />}
            </div>
          </div>

          <br />
          <div className="smallest-text red">{errorState}</div>
          <br />
          <Link class="primary-btn link-btn curved-edge-btn" to="/login">
            המשך
          </Link>
        </form>
      </div>
    </div>
  );
}
export default PasswordReset;