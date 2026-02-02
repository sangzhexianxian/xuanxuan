import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import { useState } from "react";
import { AuthContext } from '@/contexts/authContext';
import { Toaster } from 'sonner';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // 默认已登录

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 text-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Toaster 
          position="top-center"
          theme="dark"
        />
      </div>
    </AuthContext.Provider>
  );
}
