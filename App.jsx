import React, { useState } from 'react';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    // send login information and result to server for verification
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password, result }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          // login successful, redirect to dashboard
          window.location.href = '/dashboard';
        } else {
          setError(result.error);
        }
      });
  }

  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  const operation = Math.random() < 0.5 ? '+' : '-';
  const question = `${num1} ${operation} ${num2} = `;

  return (
    <form onSubmit={handleSubmit}>
      <label>
       <h1>Username:
        <input
          type="text"
          value={username}
          onChange={event => setUsername(event.target.value)}
        /></h1>
      </label>
      <br />
      <label><h1>
        Password:
        <input
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        /></h1>
      </label>
      <br />
      <label><h1>
        {question}
        <input
          type="text"
          value={result}
          onChange={event => setResult(event.target.value)}
        /></h1>
      </label>
      <br />
      {error && <p>{error}</p>}
        <button type="submit">Log In</button>
    </form>
  );
}

export default LoginForm;
