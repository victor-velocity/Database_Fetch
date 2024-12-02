import React, { useState } from 'react';
import styled from 'styled-components';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (result.success) {
                setMessage('Login successful!');
                window.location.href = '/';
            } else {
                setMessage('Invalid username or password.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <StyledWrapper>
            <div className="container">
                <div className="heading">Sign In</div>
                <form onSubmit={handleSubmit} className="form">
                    <input
                        required
                        className="input"
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <input
                        required
                        className="input"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <span className="forgot-password">
                        <a href="#">Forgot Password?</a>
                    </span>
                    <button type="submit" className="login-button">
                        Sign In
                    </button>
                </form>
                {message && (
                    <p
                        style={{
                            textAlign: 'center',
                            color: 'red',
                            marginTop: '10px',
                        }}
                    >
                        {message}
                    </p>
                )}
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  .container {
    max-width: 350px;
    background: linear-gradient(0deg, #fff 0%, #f4f7fb 100%);
    border-radius: 40px;
    padding: 25px 35px;
    border: 5px solid #fff;
    box-shadow: rgba(133, 189, 215, 0.9) 0px 30px 30px -20px;
    margin: 20px auto;
  }

  .heading {
    text-align: center;
    font-weight: 900;
    font-size: 30px;
    color: #1089d3;
  }

  .form {
    margin-top: 20px;
  }

  .input {
    width: 100%;
    background: white;
    border: none;
    padding: 15px 20px;
    border-radius: 20px;
    margin-top: 15px;
    box-shadow: #cff0ff 0px 10px 10px -5px;
    border: 2px solid transparent;
  }

  .input::placeholder {
    color: #aaa;
  }

  .input:focus {
    outline: none;
    border: 2px solid #12b1d1;
  }

  .forgot-password {
    display: block;
    margin-top: 10px;
    margin-left: 10px;
  }

  .forgot-password a {
    font-size: 11px;
    color: #0099ff;
    text-decoration: none;
  }

  .login-button {
    display: block;
    width: 100%;
    font-weight: bold;
    background: linear-gradient(45deg, #1089d3 0%, #12b1d1 100%);
    color: white;
    padding: 15px;
    margin: 20px auto;
    border-radius: 20px;
    box-shadow: rgba(133, 189, 215, 0.9) 0px 20px 10px -15px;
    border: none;
    transition: all 0.2s ease-in-out;
  }

  .login-button:hover {
    transform: scale(1.03);
    box-shadow: rgba(133, 189, 215, 0.9) 0px 23px 10px -20px;
  }

  .login-button:active {
    transform: scale(0.95);
    box-shadow: rgba(133, 189, 215, 0.9) 0px 15px 10px -10px;
  }
`;

export default LoginForm;
