import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const AuthForm = ({
  email = '',
  password = '',
  name = '',
  onEmailChange,
  onPasswordChange,
  onNameChange,
  onSubmit,
  onGoogleAuth,
  title = 'Welcome',
  submitButtonText = 'Continue',
  showGoogleButton = true,
  isLoading = false,
  isGoogleLoading = false,
  showNameField = false,
  errors = {},
  mode = 'signin', // 'signin' or 'signup'
  setMode
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState({ email: false, password: false, name: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  const changeMode = () => {
    if (mode === "signin") {
      setMode("signup");
    } else if (mode === "signup") {
      setMode("signin");
    }
  };


  const getTitle = () => {
    return mode === 'signin' ? 'Welcome Back' : 'Create Account';
  };

  
  const getSubmitButtonText = () => {
    return mode === 'signin' ? 'Sign In' : 'Sign Up';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Glowing orb effect */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

        <div className="relative backdrop-blur-lg bg-gray-900/50 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Animated gradient border */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-10"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"></div>
          
          <div className="relative p-8">
            {/* Header */}
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl mb-4 shadow-lg"
              >
                <div className="w-8 h-8 bg-white rounded-lg"></div>
              </motion.div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {getTitle()}
              </h2>
              <p className="text-gray-400 mt-2">
                {mode === 'signin' 
                  ? 'Sign in to access your account' 
                  : 'Create a new account to get started'}
              </p>
            </div>

            {/* Google Button */}
            {showGoogleButton && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onGoogleAuth}
                disabled={isGoogleLoading}
                className="w-full flex items-center justify-center gap-3 p-4 mb-6 rounded-xl border border-gray-800 bg-gray-900 hover:bg-gray-800/50 transition-all duration-300 group"
              >
                <div className={`transition-transform duration-300 ${isGoogleLoading ? 'animate-spin' : 'group-hover:scale-110'}`}>
                  <FcGoogle className="text-2xl" />
                </div>
                <span className="text-gray-200 font-medium">
                  {isGoogleLoading ? 'Connecting...' : `Continue with Google ${mode === 'signin' ? 'Login' : 'Signup'}`}
                </span>
              </motion.button>
            )}

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
              <span className="px-4 text-gray-500 text-sm">or continue with email</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
             

              <div className="group">
                <div className="relative">
                  <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                    isFocused.email || email ? 'text-purple-400' : 'text-gray-500'
                  }`}>
                    <FiMail className="text-xl" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => onEmailChange(e.target.value)}
                    onFocus={() => setIsFocused(prev => ({ ...prev, email: true }))}
                    onBlur={() => setIsFocused(prev => ({ ...prev, email: false }))}
                    className="w-full pl-12 pr-4 py-4 bg-gray-900/80 border-2 border-gray-800 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300 text-white placeholder-gray-500"
                    placeholder="Email Address"
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2 ml-4 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                    {errors.email}
                  </motion.p>
                )}
              </div>

              <div className="group">
                <div className="relative">
                  <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                    isFocused.password || password ? 'text-purple-400' : 'text-gray-500'
                  }`}>
                    <FiLock className="text-xl" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => onPasswordChange(e.target.value)}
                    onFocus={() => setIsFocused(prev => ({ ...prev, password: true }))}
                    onBlur={() => setIsFocused(prev => ({ ...prev, password: false }))}
                    className="w-full pl-12 pr-12 py-4 bg-gray-900/80 border-2 border-gray-800 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300 text-white placeholder-gray-500"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <FiEyeOff className="text-xl" /> : <FiEye className="text-xl" />}
                  </button>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2 ml-4 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                    {errors.password}
                  </motion.p>
                )}
              </div>

              {/* Password Strength Indicator */}
              {mode === 'signup' && password && (
                <div className="space-y-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`flex-1 h-1 rounded-full transition-all duration-500 ${
                          password.length >= level * 3
                            ? level <= 2
                              ? 'bg-red-500'
                              : level === 3
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                            : 'bg-gray-800'
                        }`}
                      ></div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400">
                    {password.length < 6
                      ? 'Weak password'
                      : password.length < 10
                      ? 'Medium strength'
                      : 'Strong password'}
                  </p>
                </div>
              )}

           

              {errors.general && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
                >
                  <p className="text-red-400 text-sm text-center">{errors.general}</p>
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>{getSubmitButtonText()}</span>
                    <FiMail className="text-lg" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Footer with mode toggle */}
            <div className="mt-8 pt-6 border-t border-gray-800">
              <p className="text-center text-gray-500 text-sm">
                {mode === 'signin' 
                  ? "Don't have an account?" 
                  : "Already have an account?"}
                <button 
                  onClick={changeMode} 
                  className="text-purple-400 hover:text-purple-300 ml-2 font-medium transition-colors hover:underline"
                >
                  {mode === 'signin' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </div>

       
      </motion.div>
    </div>
  );
};

export default AuthForm;