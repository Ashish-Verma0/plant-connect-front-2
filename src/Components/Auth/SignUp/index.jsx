import { Grid, TextField, Button, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const height = 50;

  const [signupData, setSignupData] = useState({
    name: "",
    mobile_number: "",
    email: "",
    designation: "Managing Director",
  });
  // useNavigate is for navigation to other component
  let navigate = useNavigate();
  // password& setpassword is for storing paasword body data
  const [password, setPassword] = useState("");
  // isValid & setIsValid is for signup form button disable and state will be false
  const [isValid, setIsValid] = useState(false);
  // isValidPassword &setIsValidPassword is for password field button disable and state will be false
  const [isValidPassword, setIsValidPassword] = useState(false);
  // error & seterror state is for showing error on frontend
  const [error, setError] = useState("");
  // loading & setLoading button is use for button condition firstly it will be in false condition when api hits for submitting data to backend then setLoading button will be true
  const [loading, setLoading] = useState(false);
  // currentScreen& setCurrentScreen state is for showing diiferent  diiferent jsxscreens main screen is signupform screen
  const [currentScreen, setCurrentScreen] = useState("main");

  const [isConfirmDisabled, setIsConfirmDisabled] = useState(false);

  //EFFECTS
  // useEffect(() => {
  //   if (password.length === 6) {
  //     handleSubmit();
  //   } else {
  //   }
  // }, [password]);

  useEffect(() => {
    const { name, mobile_number, email } = signupData;
    // useEffect setIsValid is for checking all fields filled or not then button will be activate
    setIsValid(name && mobile_number && email);
    // setIsValidPassword is also for checking field and check password length == 6 then button will be activate
    setIsValidPassword(Boolean(password) && password.length === 6);
    setIsConfirmDisabled(false);
  }, [signupData, password]);

  // useEffect(() => {
  //   setIsConfirmDisabled(false);
  // }, [password]);

  //FUNCTIONS BELOW
  const emailValidation = () => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return !(!signupData.email || regex.test(signupData.email) === false);
  };

  const phonelValidation = () => {
    // const reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i;
    const reg = /^[789][0-9]{9}$/;
    return !(
      !signupData.mobile_number || reg.test(signupData.mobile_number) === false
    );
    // signupData.mobileNumber.length === 10;
  };

  //ALL ENTRIES
  // in handleChange we are targeting the values
  // const handleChange = (type, value) => {
  //   // if error comes setError is used for removing error display by setError field CheckBlank setError("")
  //   if (error) setError("");
  //   setSignupData({ ...signupData, [type]: value });
  // };
  const handleChange = (type, value) => {
    // if error comes setError is used for removing error display by setError field CheckBlank setError("")
    if (error) setError("");
    if (type === "mobile_number") {
      if (
        value.startsWith(0) ||
        (value !== "" && !value.match(/[0-9]/)) ||
        value.match(/[a-z]/i)
      ) {
      } else {
        setSignupData((prevState) => ({ ...prevState, mobile_number: value }));
      }
    } else {
      setSignupData({ ...signupData, [type]: value });
    }
  };
  // handle password is targeting password fields value
  const handlepassword = (value = "") => {
    // if (password?.length && `${value}`.length < `${password}`.length) {
    //   return setPassword();
    // }
    if (error) setError("");
    setPassword(value);
  };

  //SIGNUP PAGE
  // handle check is for submitting signup page data to backend and checking whether the user is already exist or not
  const handleCheck = async (e) => {
    // emailValidation & phonelValidation is use for checking email & phone number length
    const isPhoneValid = phonelValidation(); // true || false
    const isEmailValid = emailValidation(); // true || false
    setIsConfirmDisabled(true);
    if (isPhoneValid && isEmailValid) {
      setLoading(true);
      try {
        // SERVER_URL is imported from utils folder targeting endpoint.js
        // const url = SERVER_URL + "ms1/signup/checkInfo";

        // const response = await axios.post(url, signupData);

        setLoading(false);
        // if (response.status === 202) {
        setError("Designation taken");
        // }
        // else {
        setLoading(false);
        // if response status come 200 ok then it will render to screen passwordpage
        // setCurrentScreen("password");
        // }
      } catch (err) {
        setError(err.message);
        setIsConfirmDisabled(true);
      }
    } else {
      setError(
        isPhoneValid
          ? "Invalid Email. Please try again."
          : "Invalid mobile number. Please try again."
      );
    }
  };

  const resendcredentials = async () => {
    try {
      // const url = SERVER_URL + "ms1/signup/newuser/resendcredentials";
      // const response = await axios.post(url, {
      //   mobileNumber: signupData.mobile_number,
      // });
      // if (response.status === 201) {
      // setTimeout(() => {
      // setCurrentScreen("credentialsresend");
      // }, 3000);
      // }
    } catch (err) {
      // setError(err.response.message);
    }
  };

  //PASSCODE PAGE
  // handleSubmit api is for submitting password page data to backend
  const handleSubmit = async (e) => {
    try {
      setIsConfirmDisabled(true);
      // const url = SERVER_URL + "ms1/signup/newuser";
      // ...signupData is destructuring signupData & password data field sending to backend & passcode is written bcoz backend is recieving as passcode body key name
      // const resp = await axios.post(url, { ...signupData, passcode: password });

      // if response comes ok then it render to success screen
      // setCurrentScreen("success");
      // settime out is use for after displaying success message automatically navigate to login page
      // setTimeout(() => {
      //   navigate("/login");
      // }, 3000);
    } catch (err) {
      // Handle Error Here

      setError(err.response.data);
    }
  };

  const ErrorComponent = () => {
    return (
      <Grid container style={{ marginTop: "1rem" }}>
        <Alert
          variant="standard"
          severity="error"
          style={{
            width: "100%",
            height: "24px",
            alignItems: "center",
          }}
        >
          <strong>{error}</strong>
        </Alert>
      </Grid>
    );
  };
  const checkMobile = (event) => {
    const value = event.target.value;
  };

  const mainJSX = () => (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            marginTop: "5rem",
            maxWidth: "350px",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" style={{ color: "#217F6D" }}>
            Agr<span style={{ color: "#215D7F" }}>i</span>Net
          </Typography>
          <Typography
            variant="h5"
            style={{
              color: "black",
              marginTop: "2rem",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            Register MOVCDNER MD
          </Typography>
          <div>
            <Typography
              style={{
                color: "#666B80",
                // marginTop: "0.25rem",
                fontWeight: 400,
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              Passcode required for registration.
            </Typography>
          </div>
          <TextField
            fullWidth
            id="name"
            label="Name"
            variant="outlined"
            // signupData is state in which it is storing name field
            value={signupData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            style={{ marginTop: "1rem" }}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Mobile Number"
            // type="number"
            onKeyDown={checkMobile}
            variant="outlined"
            inputProps={{
              maxLength: "10",
            }}
            // signupData is state in which it is storing name mobilenumber
            value={signupData.mobile_number}
            onChange={(e) => {
              handleChange("mobile_number", e.target.value);
            }}
            style={{ marginTop: "1.5rem" }}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Email"
            variant="outlined"
            // signupData is state in which it is storing name email
            value={signupData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            style={{ marginTop: "1.5rem" }}
          />
          <TextField
            className="designation-disabled"
            fullWidth
            disabled
            id="outlined-disabled"
            label="Designation"
            variant="outlined"
            defaultValue="Managing Director"
            style={{
              backgroundColor: "#F5F6FA",
              marginTop: "1.5rem",
              // color: "black",
            }}
          />
          <LoadingButton
            fullWidth
            size="large"
            variant="outlined"
            // first the button will be disabled when all fields filled then it will activate
            disabled={!isValid || isConfirmDisabled}
            // handleCheck is for submittting signup form data to backend
            onClick={handleCheck}
            loading={loading}
            style={{
              marginTop: "1.5rem",
              backgroundColor:
                !isValid || isConfirmDisabled ? "#8B8FA3" : "#217F6D",
              borderColor:
                !isValid || isConfirmDisabled ? "#8B8FA3" : "#217F6D",
              color: "white",
            }}
          >
            Confirm
          </LoadingButton>
          {error && <ErrorComponent />}
        </div>
      </div>
    </>
  );

  const passwordJSX = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ maxWidth: "340px", marginTop: "10rem" }}>
        <Typography
          variant="h4"
          style={{
            textAlign: "center",
            color: "#217F6D",
          }}
        >
          Agr<span style={{ color: "#215D7F" }}>i</span>Net
        </Typography>
        <Typography variant="h6" style={{ marginTop: "3rem" }}>
          Enter Passcode
        </Typography>
        <Typography style={{ color: "#666B80" }}>
          Enter Passcode provided by developers.
        </Typography>
        {/* <OTPInput
          otpType="number"
          OTPLength={6}
          value={password}
          onChange={handlepassword}
          style={{ marginTop: "1rem" }}
        /> */}
        <LoadingButton
          size="large"
          fullWidth
          variant="outlined"
          // first the button will be disabled when field filled then it will activate
          disabled={!isValidPassword || isConfirmDisabled}
          // handlesubmit is for submittting signup form data to backend
          onClick={handleSubmit}
          loading={loading}
          style={{
            backgroundColor:
              !isValidPassword || isConfirmDisabled ? "#8B8FA3" : "#217F6D",
            borderColor:
              !isValidPassword || isConfirmDisabled ? "#8B8FA3" : "#217F6D",
            color: "white",
            marginTop: "1.5rem",
            fontFamily: "inter",
          }}
        >
          confirm
        </LoadingButton>
        {error && <ErrorComponent />}
      </div>
    </div>
  );

  const successJSX = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <Typography
          variant="h4"
          style={{
            textAlign: "center",
            color: "#217F6D",
          }}
        >
          MOV<span style={{ color: "#215D7F" }}>CD</span>NER
        </Typography>
        <Typography variant="h6" style={{ marginTop: "3rem" }}>
          Congratulations!
        </Typography>
        <Typography style={{ marginTop: ".55rem" }}>
          You have been successfully registered with <br />
          Movcdner. Login credentials have been <br />
          messaged on your mobile number.
        </Typography>
        <Button
          fullWidth
          size="large"
          onClick={() => {
            navigate("/login");
          }}
          variant="outlined"
          style={{
            marginTop: "1rem",
            borderColor: "#217F6D",
            backgroundColor: "#217F6D",
            color: "white",
            fontFamily: "inter",
          }}
        >
          Continue to Login
        </Button>

        <Grid
          container
          style={{
            marginTop: ".5rem",
          }}
        >
          <Grid
            item
            style={{
              paddingTop: ".18rem",
              color: "#666B80",
              fontWeight: "500",
            }}
          >
            <small>Didn't receive login credentials?</small>
          </Grid>
          <Grid item>
            <Button
              size="small"
              onClick={resendcredentials}
              style={{
                color: "#217F6D",
                fontWeight: "500",
                backgroundColor: "#fff",
              }}
            >
              request resend
            </Button>
          </Grid>
        </Grid>

        {error && <ErrorComponent />}
      </div>
    </div>
  );

  const credentialsresendJSX = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <Typography
          variant="h4"
          style={{
            textAlign: "center",
            color: "#217F6D",
          }}
        >
          Agr<span style={{ color: "#215D7F" }}>i</span>Net
        </Typography>
        <Typography variant="h6" style={{ marginTop: "3rem" }}>
          Credentials Resent!
        </Typography>
        <Typography style={{ marginTop: ".55rem", color: "#666B80" }}>
          Login credentials have messaged <br /> on your registered number. If
          you still
          <br />
          haven't received them please contact
          <br /> helpline.
        </Typography>
        <Button
          size="large"
          fullWidth
          onClick={() => {
            navigate("/login");
          }}
          variant="outlined"
          style={{
            marginTop: "1rem",
            borderColor: "#217F6D",
            backgroundColor: "#217F6D",
            color: "white",
            fontFamily: "inter",
          }}
        >
          Continue to Login
        </Button>

        {error && <ErrorComponent />}
      </div>
    </div>
  );

  return (
    // mainJSX is signup form screen, passwordJSX is password screen, successJSX is dispaying success screen
    <>
      {currentScreen === "main" && mainJSX()}
      {currentScreen === "password" && passwordJSX()}
      {currentScreen === "success" && successJSX()}
      {currentScreen === "credentialsresend" && credentialsresendJSX()}
    </>
  );
};

export default Signup;
