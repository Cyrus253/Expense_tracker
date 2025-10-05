import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes, BrowserRouter as Router, Navigate } from "react-router-dom";
import UserProvider from "./contexts/userContext";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";
import RouteLoader from "./components/RouteLoader";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Dashboard/Home"));
const Income = lazy(() => import("./pages/Dashboard/Income"));
const Expense = lazy(() => import("./pages/Dashboard/Expense"));
const Login = lazy(() => import("./pages/Auth/Login"));
const SignUp = lazy(() => import("./pages/Auth/SignUp"));

const App = () => {
   const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fakeLoad = () => new Promise(r => setTimeout(r, 1500));
  fakeLoad().then(() => setLoading(false));
}, []);

  if (loading) return <Loader />
  return (
     <UserProvider>
      <Router>
        <RouteLoader delay={500}>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Root />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard" element={<Home />} />
              <Route path="/income" element={<Income />} />
              <Route path="/expense" element={<Expense />} />
            </Routes>
          </Suspense>
        </RouteLoader>
      </Router>

      <Toaster toastOptions={{ className: "", style: { fontSize: "13px" } }} />
    </UserProvider>
  );
};

export default App;

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};
