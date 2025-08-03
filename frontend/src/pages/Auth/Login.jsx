import React,{useContext, useState} from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/inputs/input'
import { Link } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATH } from '../../utils/apiPath'
import { UserContext } from '../../contexts/userContext'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) return setError('Please enter a valid email');
    if (!password) return setError('Please enter your password');

    setError('');
    setLoading(true);

    try {
      const res = await axiosInstance.post(API_PATH.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = res.data;

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
    <AuthLayout>
      <div className='w-full border-[1px] border-violet-300 rounded-2xl p-6 max-w-md mx-auto mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-2xl font-bold text-center text-black'>Welcome Back</h3>
        <p className='text-sm text-center text-slate-600 mt-2 mb-6'>
          Login to continue
        </p>

        <form onSubmit={handleLogin} className='space-y-6'>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label='Email'
            type='email'
            placeholder='john@example.com'
          />

          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label='Password'
            type='password'
            placeholder='Enter your password'
          />

          {error && (
            <p className='text-sm text-red-600 font-medium -mt-3'>{error}</p>
          )}

          <button
            type='submit'
            className={`btn-primary w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className='text-sm text-slate-700 text-center mt-4'>
            Don’t have an account?{' '}
            <Link
              to='/signup'
              className='font-semibold text-violet-600 underline'
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;