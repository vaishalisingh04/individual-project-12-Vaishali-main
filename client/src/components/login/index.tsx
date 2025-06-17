import React, { ChangeEvent, useState } from 'react';
import './index.css';
import useLoginContext from '../../hooks/useLoginContext';

/**
 * Login Component contains a form that allows the user to input their username, which is then submitted
 * to the application's context through the useLoginContext hook.
 */
const Login = () => {
  const [username, setUsername] = useState<string>(''); // State to hold the username input

  // Use the useLoginContext hook to get the setUser function
  const { setUser } = useLoginContext();

  // Handle input change event
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value); // Update the username state with the input value
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setUser({ username }); // Set the user context with the entered username
  };

  return (
    <div className='container'>
      <h2>Welcome to FakeStackOverflow!</h2>
      <h4>Please enter your username.</h4>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={username} // Bind the input value to the username state
          onChange={handleInputChange} // Attach the input change handler
          placeholder='Enter your username'
          required
          className='input-text'
        />
        <button type='submit' className='login-button'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
