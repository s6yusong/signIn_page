import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {setForm, signIn} from '../actions'
import './LogIn.css';

const formValid = (formData, formErrors) => {
  let valid = true;

  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  Object.values(formData).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};



function LogIn() {
  const [formData, setformsData] = useState({
    firstName: null,
    lastName: null,
    nickName: null,
    email: null,
    street: null,
    zip: null,
    houseNumber: null,
    city: null,
    password: null,
    repeatPassword: null,
  });
  const [displayAddress, setDisplayAddress] = useState(true);
  const [validForm, setValidForm] = useState(false);
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    nickName: "",
    email: "",
    street: "",
    zip: "",
    houseNumber: "",
    city: "",
    password: "",
    repeatPassword: "",
  });

  const dispatch = useDispatch();

  const emailRegex = RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

  const zipRegex = RegExp(
      /(^\d{5}$)|(^\d{5}-\d{4}$)/
  );

  const atLeastTwoDigitsRegex = RegExp(
      /[0-9].*[0-9]/
  );


  const handleSubmit = evt => {
    evt.preventDefault();

    if (formValid(formData, formErrors)) {
      dispatch(setForm(formData));
      dispatch(signIn());
      console.log('Success');
    } else {
      console.error("error!");
    }
  };
  const handleChange = e => {
    e.preventDefault();
    const {name, value} = e.target;
    const errors = {...formErrors};
    const form = {...formData};

    switch (name) {
      case "firstName":
        form.firstName = value;
        errors.firstName = value.length < 2 ? "minimum 2 characaters required" : "";
        break;
      case "lastName":
        form.lastName = value;
        errors.lastName = value.length < 2 ? "minimum 2 characaters required" : "";
        break;
      case "nickName":
        form.nickName = value;
        errors.nickName = value.length < 1 ? "minimum 1 characaters required" : "";
        break;
      case "email":
        form.email = value;
        errors.email = emailRegex.test(value) ? "" : "invalid email address";
        break;
      case "password":
        form.password = value;
        errors.password = atLeastTwoDigitsRegex.test(value) &&
            value.length >= 6 ? "" : "minimum 6 characaters required, it must include two numbers.";
        errors.repeatPassword =
            form.repeatPassword !== value ? "Your password and confirmation password do not match." : "";
        break;
      case "repeatPassword":
        form.repeatPassword = value;
        errors.repeatPassword =
            form.password !== value ? "Your password and confirmation password do not match." : "";
        break;
      case "street":
        form.street = value;
        errors.street =
            value.length < 4 ? "minimum 4 characaters required" : "";
        break;
      case "city":
        form.city = value;
        errors.city =
            value.length < 4 ? "minimum 4 characaters required" : "";
        break;
      case "houseNumber":
        form.houseNumber = value;
        errors.houseNumber =
            value.length < 1 ? "minimum 1 characaters required" : "";
        break;
      case "zip":
        form.zip = value;
        errors.zip = zipRegex.test(value) ? "" : "Please revise your five-digit Zip Code.";
        break;
      default:
        break;
    }
    setformsData(form);
    setFormErrors(errors);
  };

  useEffect(() => {
    setValidForm(formValid(formData, formErrors));
  }, [formData, formErrors]);

  return (
      <div className="wrapper">
        <div className="container">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group-names">
              <div style={{display: 'flex'}}>
                <div className="firstName">
                  <label htmlFor="firstName">First Name</label>
                  <input
                      className={formErrors.firstName.length > 0 ? "error" : null}
                      placeholder="First Name"
                      type="text"
                      name="firstName"
                      noValidate
                      onChange={handleChange}
                  />
                  {formErrors.firstName.length > 0 && (
                      <span className="errorMessage">{formErrors.firstName}</span>
                  )}
                </div>
                <div className="lastName">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                      className={formErrors.lastName.length > 0 ? "error" : null}
                      placeholder="Last Name"
                      type="text"
                      name="lastName"
                      noValidate
                      onChange={handleChange}
                  />
                  {formErrors.lastName.length > 0 && (
                      <span className="errorMessage">{formErrors.lastName}</span>
                  )}
                </div>
              </div>
              <div className="nickName">
                <label htmlFor="nickName">Nick Name</label>
                <input
                    className={formErrors.nickName.length > 0 ? "error" : null}
                    placeholder="Nick Name"
                    type="text"
                    name="nickName"
                    noValidate
                    onChange={handleChange}
                />
                {formErrors.nickName.length > 0 && (
                    <span className="errorMessage">{formErrors.nickName}</span>
                )}
              </div>
            </div>
            <div className="form-group-address">
              <label>
                Show Adress
                <input
                    name="address"
                    type="checkbox"
                    checked={displayAddress}
                    onChange={() => setDisplayAddress(!displayAddress)}
                />
              </label>
              <div className="address-container" style={ displayAddress ? {} : { display: 'none'}}>
                <div style={{display: 'flex'}}>
                  <div className="street">
                    <label htmlFor="street">Street</label>
                    <input
                        className={formErrors.street.length > 0 ? "error" : null}
                        placeholder="Street"
                        type="text"
                        name="street"
                        noValidate
                        onChange={handleChange}
                    />
                    {formErrors.street.length > 0 && (
                        <span className="errorMessage">{formErrors.street}</span>
                    )}
                  </div>

                  <div className="houseNumber">
                    <label htmlFor="houseNumber">House Number</label>
                    <input
                        className={formErrors.houseNumber.length > 0 ? "error" : null}
                        placeholder="House Number"
                        type="text"
                        name="houseNumber"
                        noValidate
                        onChange={handleChange}
                    />
                    {formErrors.houseNumber.length > 0 && (
                        <span className="errorMessage">{formErrors.houseNumber}</span>
                    )}
                  </div>
                </div>

                <div style={{display: 'flex'}}>
                  <div className="zip">
                    <label htmlFor="zip">Zip</label>
                    <input
                        className={formErrors.zip.length > 0 ? "error" : null}
                        placeholder="Zip"
                        type="text"
                        name="zip"
                        noValidate
                        onChange={handleChange}
                    />
                    {formErrors.zip.length > 0 && (
                        <span className="errorMessage">{formErrors.zip}</span>
                    )}
                  </div>

                  <div className="city">
                    <label htmlFor="city">City</label>
                    <input
                        className={formErrors.city.length > 0 ? "error" : null}
                        placeholder="City"
                        type="text"
                        name="city"
                        noValidate
                        onChange={handleChange}
                    />
                    {formErrors.city.length > 0 && (
                        <span className="errorMessage">{formErrors.city}</span>
                    )}
                  </div>
                </div>

              </div>
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                  className={formErrors.email.length > 0 ? "error" : null}
                  placeholder="Email"
                  type="email"
                  name="email"
                  noValidate
                  onChange={handleChange}
              />
              {formErrors.email.length > 0 && (
                  <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                  className={formErrors.password.length > 0 ? "error" : null}
                  placeholder="Password"
                  type="password"
                  name="password"
                  noValidate
                  onChange={handleChange}
              />
              {formErrors.password.length > 0 && (
                  <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="repeatPassword">
              <label htmlFor="repeatPassword">Repeat Password</label>
              <input
                  className={formErrors.password.length > 0 ? "error" : null}
                  placeholder="Repeat Password"
                  type="password"
                  name="repeatPassword"
                  noValidate
                  onChange={handleChange}
              />
              {formErrors.repeatPassword.length > 0 && (
                  <span className="errorMessage">{formErrors.repeatPassword}</span>
              )}
            </div>
            <div className="createAccount">
              <button type="submit" disabled={!validForm}>Submit</button>
            </div>
          </form>
        </div>
      </div>
  );
}

export default LogIn;
