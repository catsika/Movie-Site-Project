import { ThemeProvider } from "@emotion/react";
import { theme } from "./shared/utils/theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignInPage } from "./pages/SignIn.page";
import SignUpPage from "./pages/SignUp.page";
import StreamPage from "./pages/Stream.page";
import PrivateRoute from "./features/auth/components/PrivateRoute.component";
import { AdminSignIn } from "./pages/AdminSignIn.page";
import { AdminDashboard } from "./pages/AdminDashboard.page";
import ViewComponent from "./features/view/components/View.component";
import FeaturedPage from "./pages/Featured.page";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute page={<StreamPage />} />} />
          <Route
            path="/featured"
            element={<PrivateRoute page={<FeaturedPage />} />}
          />
          <Route path="/admin/*">
            <Route
              path="login"
              element={<PrivateRoute page={<AdminSignIn />} />}
            />
            <Route
              path="dashboard"
              element={<PrivateRoute page={<AdminDashboard />} />}
            />
          </Route>
          {/* Nest the registration routes */}
          <Route path="/registration/*">
            <Route path="signup" element={<SignUpPage />} />
            <Route path="signin" element={<SignInPage />} />
          </Route>
          {/* Fix the title route */}
          <Route
            path="/title/:id"
            element={<PrivateRoute page={<ViewComponent />} />}
          />
          <Route path="*" element={<PrivateRoute page={<StreamPage />} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
