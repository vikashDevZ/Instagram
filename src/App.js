/* eslint-disable */

import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DASHBOARD, LOGIN, PROFILE, SIGNUP } from "./constants/routes";
import useAuthListner from "./hooks/use-auth-listner";
import UserContext from "./context/user";

import ProtectedRoute from "./helpers/protectedRoute";
import RedirectLogdUser from "./helpers/redirectLogdUser";

const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/Singup"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound.js"));

const Dashboard = lazy(() => import("./pages/dashboard.js"));

//clo please

function App() {
  const { user } = useAuthListner();
  console.log("user", user);

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route element={<RedirectLogdUser user={user} />}>
              <Route exact path={SIGNUP} element={<SignUp />} />
              <Route exact path={LOGIN} element={<Login />} />
            </Route>
            <Route element={<ProtectedRoute user={user} />}>
              <Route exact path={DASHBOARD} element={<Dashboard />} />
              <Route exact path={PROFILE} element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
