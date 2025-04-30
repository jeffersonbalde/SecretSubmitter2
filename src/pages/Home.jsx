import { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { encodeJWT, decodeJWT } from '../utils/jwt';

const Home = () => {
  const [role, setRole] = useState('guest');
  const [message, setMessage] = useState('');
  const [secrets, setSecrets] = useState([]);
  const [secret, setSecret] = useState('');
  const inputRef = useRef(null);

  const defaultPayload = {
    role: 'guest',
    key: '!R3alS3cretK3y',
  };

  const defaultToken = encodeJWT(defaultPayload);

  useEffect(() => {
    const token = Cookies.get('token');

    if (!token) {
      Cookies.set('token', defaultToken, { path: '/' });
      setRole('guest');
      return;
    }

    const decoded = decodeJWT(token);

    if (!decoded || typeof decoded !== 'object' || !decoded.role || !decoded.key) {
      setMessage('Oops! Hacker detected!');
      setRole('hacker');
      return;
    }

    if (decoded.role === 'admin' && decoded.key === 'jwt_hackz_r_fun') {
      setRole('admin');
      const stored = JSON.parse(localStorage.getItem('user-secrets') || '[]');
      setSecrets(stored);
      return;
    }

    if (decoded.role === 'admin' && decoded.key !== 'jwt_hackz_r_fun') {
      setMessage("Ohh, you're the fake admin!");
      setRole('fake-admin');
      return;
    }

    if (decoded.role === 'guest' && decoded.key === '!R3alS3cretK3y') {
      setRole('guest');
      return;
    }

    setMessage('Oops! Hacker detected!');
    setRole('hacker');
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (secret.trim() === '') {
      alert('Please enter a secret.');
      inputRef.current?.focus();
      return;
    }

    const existingSecrets = JSON.parse(localStorage.getItem('user-secrets') || '[]');
    const updatedSecrets = [...existingSecrets, secret];
    localStorage.setItem('user-secrets', JSON.stringify(updatedSecrets));
    alert('Thank you for submitting your secret!');
    setSecret('');
    inputRef.current?.focus();
  };

  return (
    <div style={{ padding: '1.5rem', textAlign: 'center' }}>
      <h1
        style={{
          fontSize: '1.875rem',
          fontWeight: 'bold',
          marginBottom: '1.5rem',
        }}
      >
        Secret Submitter 2
      </h1>

      {role === 'admin' && (
        <div>
          <h2
            style={{ fontSize: '1.5rem', fontWeight: '600', color: '#22c55e' }}
          >
            Admin Panel
          </h2>
          {secrets.length > 0 && (
            <div style={{ marginTop: '1rem', color: '#f59e0b' }}>
              <p>🧾 Submitted Secrets:</p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {secrets.map((s, i) => (
                  <li key={i}>
                    <strong>•</strong> {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p style={{ marginTop: '1rem' }}>
            WkRTaDRne2p3dF9uMHZlcmlmeV80ZG0xbn0=
          </p>
        </div>
      )}

      {role !== 'admin' && (
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center',
            marginTop: '1rem',
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Enter your secret..."
            style={{
              border: '1px solid #ccc',
              padding: '0.5rem',
              width: '50%',
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Submit
          </button>
        </form>
      )}

      {role !== 'admin' && message && (
        <p style={{ color: 'red', fontWeight: 'bold', marginTop: '1rem' }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Home;