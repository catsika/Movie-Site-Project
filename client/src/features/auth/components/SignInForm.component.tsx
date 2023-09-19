import {
  Box,
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FC, FormEvent, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { CustomButton, CustomInputField } from "./styled.components";
import useInput from "../../../hooks/input/use-input";
import { validateEmail } from "../../../shared/utils/validation/email";
import { validatePasswordLength } from "../../../shared/utils/validation/length";
import { OldUser } from "../models/OldUser";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import { signin, reset } from "../authSlice";
import DoneIcon from "@mui/icons-material/Done";

export const SignInFormComponent: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const currentUrl = new URL(window.location.href);
  const slug = currentUrl.pathname;
  const backgroundImage = isMobile
    ? undefined
    : "url(https://assets.nflxext.com/ffe/siteui/vlv3/d282a426-b01a-424c-9b83-2c2445e4b61a/2b5787d0-3e69-48c4-ae5d-2d03a7b4c4c2/GH-en-20230626-popsignuptwoweeks-perspective_alpha_website_small.jpg)";

  const dispatch = useAppDispatch();
  const { isSuccess, isLoading } = useAppSelector((state) => state.auth);
  const [signInError, setSignInError] = useState<string | undefined>(undefined);

  const {
    text: email,
    shouldDisplayError: emailHasError,
    textChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(validateEmail);

  const {
    text: password,
    shouldDisplayError: passwordHasError,
    textChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(validatePasswordLength);

  const sendRequest = async (user: OldUser) => {
    try {
      const response = await dispatch(signin(user));
      // Handle successful response
      if (response.payload) {
        if (
          typeof response.payload === "string" &&
          response.payload.includes("Invalid")
        ) {
          setSignInError(response.payload);
        }
      }
    } catch (error: any) {
      // Handle error
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const timeoutId = setTimeout(() => {
        dispatch(reset());
        if (slug === "/admin/login") {
          navigate("/admin/dashboard");
        } else {
          navigate("/stream");
        }
      }, 1000);

      return () => clearTimeout(timeoutId); // Clean up the timeout on component unmount
    }
  }, [isSuccess, dispatch]);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailHasError || passwordHasError) return;

    if (email.length === 0 || password.length === 0) return;

    const oldUser: OldUser = {
      email,
      password,
    };
    if (slug === "/admin/login") {
      oldUser.type = "admin";
    }
    sendRequest(oldUser);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // Center horizontally
          alignItems: "center",
          // Center vertically
          height: "100vh",
          width: "100vw",
          [theme.breakpoints.down("sm")]: {
            width: "99%",
          },
        }}
      >
        <Box
          sx={{
            padding: 5,
            borderRadius: "20px",
            backgroundColor: "rgba(7, 9, 7, 0.8)",
            width: "350px",
            height: "600px",
            marginTop: 2,
            //
            [theme.breakpoints.down("sm")]: {
              position: "absolute",
              width: "85vw",
              height: "100vh",
              backgroundColor: "#000000",
              borderRadius: "0px",
            },
          }}
        >
          <form onSubmit={onSubmitHandler}>
            <Grid
              container
              direction="column"
              sx={{ marginBottom: 5, marginTop: 4 }}
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  color: "white",
                  fontWeight: 400,
                  letterSpacing: 1,
                  marginBottom: 3,
                }}
              >
                {slug && slug === "/admin/login" ? "Admin Login" : "Sign In"}
              </Typography>
              <CustomInputField
                value={email}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                error={emailHasError || !!signInError}
                id="email"
                name="email"
                variant="filled"
                type="email"
                label="Email"
                required={true}
              />

              <CustomInputField
                value={password}
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                error={passwordHasError || !!signInError}
                helperText={!!signInError ? signInError : ""}
                id="password"
                name="password"
                variant="filled"
                type="password"
                label="Password"
                required={true}
              />

              <CustomButton
                variant="contained"
                type="submit"
                disabled={
                  isLoading || isSuccess || emailHasError || passwordHasError
                }
              >
                {isLoading ? (
                  <CircularProgress sx={{ color: "white" }} size={20} />
                ) : isSuccess ? (
                  <>
                    <DoneIcon sx={{ color: "white" }} fontSize="large" />
                  </>
                ) : (
                  "Sign in"
                )}
              </CustomButton>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 2,
                }}
              >
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Remember me"
                  sx={{
                    "& .MuiSvgIcon-root": { fontSize: "0.8rem" },
                    "& .MuiTypography-root": {
                      fontSize: "0.8rem",
                      color: "whitesmoke",
                    },
                  }}
                />
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "whitesmoke",
                    marginBottom: 4,
                  }}
                >
                  Forgot password?
                </span>
              </div>

              <Divider
                variant="middle"
                sx={{
                  margin: "16px 0",
                  borderBottom: "1px solid white",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: "white", marginTop: 1 }}
                >
                  Don't have an account?
                </Typography>
              </Divider>

              <CustomButton
                variant="contained"
                onClick={() => navigate("/signup")}
                sx={{
                  backgroundColor: "gray",
                  height: "40px",
                  marginTop: "2px",
                }}
              >
                Create an account
              </CustomButton>

              <div style={{ marginTop: 5 }}>
                <small style={{ color: "gray" }}>
                  This page is protected by Google reCAPTCHA to ensure you're
                  not a bot. Learn more.
                </small>
              </div>
            </Grid>
          </form>
        </Box>
        {!isMobile && (
          <Box
            sx={{
              position: "absolute", // Position the pseudo-element
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              backgroundImage: backgroundImage,
              filter: "blur(5px)", // Apply blur effect
              zIndex: -1, // Push the pseudo-element behind the main box
            }}
          />
        )}
      </Box>
    </div>
  );
};
