import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/inputs/input'
import { Link } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector'
import { API_PATH } from '../../utils/apiPath'
import axiosInstance from '../../utils/axiosInstance'
import { UserContext } from '../../contexts/userContext'
import uplaodImage from '../../utils/uplaodImage'

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!fullName) return setError('Please enter your full name');
    if (!validateEmail(email)) return setError('Please enter a valid email');
    if (!password || password.length < 6)
      return setError('Password must be at least 6 characters');

    setError('');
    setLoading(true);

    try {
      let profileImageUrl = '';

      if (profilePic) {
        const res = await uploadImage(profilePic);
        profileImageUrl = res.imageUrl || '';
      }

      const response = await axiosInstance.post(API_PATH.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        updateUser(user);
        navigate('/dashboard');
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

 return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-pink-200 via-pink-100 to-indigo-200">
      {/* 🔮 Bubble animation background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>

      {/* Signup card */}
      <div className="relative w-full max-w-md bg-white border border-violet-200 rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
        <h3 className="text-2xl md:text-3xl font-bold text-center text-pink-500 mb-8">
          Create an Account
        </h3>

        <form onSubmit={handleSignup} className="space-y-6">
          <Input
            label="Full Name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
          />

          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />

          {error && (
            <p className="text-sm text-red-600 font-medium -mt-2">{error}</p>
          )}

          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold transition-all duration-200
              bg-pink-500 text-white hover:bg-pink-800 shadow-md
              ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          <p className="text-sm text-slate-700 text-center mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold  text-pink-500 hover:text-pink-700 underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );

};

export default SignUp;