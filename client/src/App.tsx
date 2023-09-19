import { ThemeProvider } from "@emotion/react";
import { theme } from "./shared/utils/theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home.page";
import { SignInPage } from "./pages/SignIn.page";
import SignUpPage from "./pages/SignUp.page";
import NotFoundPage from "./pages/NotFound.page";
import StreamPage from "./pages/Stream.page";
import PrivateRoute from "./features/auth/components/PrivateRoute.component";
import { AdminSignIn } from "./pages/AdminSignIn.page";
import { AdminDashboard } from "./pages/AdminDashboard.page";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route
            path="/admin/login"
            element={<PrivateRoute page={<AdminSignIn />} />}
          />
          <Route
            path="/admin/dashboard"
            element={<PrivateRoute page={<AdminDashboard />} />}
          />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/stream"
            element={<PrivateRoute page={<StreamPage />} />}
          />
          <Route path="/streams" element={<StreamPage />} />
          <Route path="*" element={<NotFoundPage />} /> {/* Fallback route */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
