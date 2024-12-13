'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './register.css';





const RegisterPage = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('Customer');
  const [error, setError] = useState('');
  const router = useRouter();

  // Basic validation for form fields
  const validateForm = () => {
    if (!firstname || !lastname || !email || !password) {
      setError('All fields are required');
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const response = await fetch(`${window.location.origin}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstname, lastname, email, password, account_type: accountType }),
    });

    const data = await response.json();

    if (response.ok) {
      router.push(`${window.location.origin}/login`);
    } else {
      setError(data.message || 'Something went wrong');
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Account Type</label>
          <select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
            <option value="Customer">Customer</option>
            <option value="Artisan">Artisan</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
