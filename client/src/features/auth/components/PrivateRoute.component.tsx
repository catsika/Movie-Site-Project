import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import { Navigate } from "react-router-dom";
import { verifyJwt } from "../authSlice";
import jwtDecode from "jwt-decode";
import { DecodedJwt } from "../models/AsyncState.interface";

const PrivateRoute = ({ page }: { page: JSX.Element }) => {
  const currentUrl = window.location.href;
  const slug = new URL(currentUrl).pathname;
  const { isSuccess, jwt } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [authorizedPage, setAuthorizedPage] = useState<JSX.Element | null>(
    null
  );
  const [authorizationComplete, setAuthorizationComplete] = useState(false);

  useEffect(() => {
    const verifyAndSaveJwt = async (token: string) => {
      await dispatch(verifyJwt(token));
      localStorage.setItem("isAuthenticated", String(true));
    };

    const localStorageJwt = localStorage.getItem("jwt");
    const isAuthenticatedLocalStorage =
      localStorage.getItem("isAuthenticated") === "true";

    const verifyToken = async () => {
      if (!jwt && !localStorageJwt && !isAuthenticatedLocalStorage) {
        // Neither jwt nor localStorageJwt exists, throw unauthorized error
        setAuthorizedPage(<Navigate replace to="/login" />);
      } else if (!jwt && localStorageJwt) {
        // jwt doesn't exist, but localStorageJwt exists
        const parsedJwt = JSON.parse(localStorageJwt);
        await verifyAndSaveJwt(parsedJwt.token);
      } else if (jwt && jwt.token) {
        await verifyAndSaveJwt(jwt.token);
      }

      setLoading(false);
      setAuthorizationComplete(true);
    };

    verifyToken();
  }, [jwt, isSuccess, dispatch]);

  useEffect(() => {
    const isAuthenticatedLocalStorage =
      localStorage.getItem("isAuthenticated") === "true";
    const localStorageJwt = JSON.parse(localStorage.getItem("jwt") || "{}");

    const checkAuthorizedPage = async () => {
      if (
        isAuthenticatedLocalStorage &&
        localStorageJwt &&
        localStorageJwt.token
      ) {
        // Assuming the decoded jwt has a "role" property containing the user's role
        const decodedJwt: DecodedJwt = jwtDecode(localStorageJwt.token);

        if (
          slug.startsWith("/admin/") &&
          decodedJwt.user.role?.toLowerCase() !== "admin"
        ) {
          if (!slug.startsWith("/admin/login")) {
            setAuthorizedPage(<Navigate replace to="/login" />);
          } else {
            // Handle /admin/login route separately
            setAuthorizedPage(page);
          }
        } else {
          setAuthorizedPage(page);
        }
      } else {
        // Not authorized, redirect to login page
        setAuthorizedPage(<Navigate replace to="/login" />);
      }
    };

    if (authorizationComplete) {
      checkAuthorizedPage();
    }
  }, [slug, page, authorizationComplete]);

  if (loading) {
    return null; // Render a loading state while checking authorization
  }

  return authorizedPage;
};

export default PrivateRoute;
