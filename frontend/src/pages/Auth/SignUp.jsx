import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
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
    <AuthLayout>
      <div className='w-full border-[1px] border-violet-300 rounded-2xl p-6 max-w-lg mx-auto mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-bold text-center p-6 text-black'>Create an Account</h3>

        <form onSubmit={handleSignup} className='space-y-6'>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              label='Full Name'
              type='text'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder='John Doe'
            />
            <Input
              label='Email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='john@example.com'
            />
            <div className='col-span-2'>
              <Input
                label='Password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter your password'
              />
            </div>
          </div>

          {error && (
            <p className='text-sm text-red-600 font-medium -mt-2'>{error}</p>
          )}

          <button
            type='submit'
            className={`btn-primary w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>

          <p className='text-sm text-slate-700 text-center mt-4'>
            Already have an account?{' '}
            <Link
              to='/login'
              className='font-semibold text-violet-600 underline'
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;