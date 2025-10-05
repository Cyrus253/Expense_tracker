import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loader from "./Loader";

const RouteLoader = ({ children, delay = 500 }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true); 

    const timer = setTimeout(() => {
      setLoading(false); 
    }, delay);

    return () => clearTimeout(timer);
  }, [location.pathname, delay]);

  return loading ? <Loader /> : children;
};

export default RouteLoader;
