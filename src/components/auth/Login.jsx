import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/reducers/auth/loginSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');

  const loginStatus = useSelector((state) => state.login.status);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const login = {
      user: {
        email,
        password,
      },
    };
    dispatch(loginUser(login));

    setEmail('');
    setPass('');
  };

  useEffect(() => {
    if (loginStatus === 'success') {
      navigate('/trade');
    }
  }, [loginStatus, navigate]);
  return (
    <div className="flex flex-col justify-center items-center mx-auto h-screen">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
              <input
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-red-500 text-xs italic">Please enter your email.</p>
            </label>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
              <input
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPass(e.target.value)}
              />
              <p className="text-red-500 text-xs italic">Please choose a password.</p>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
