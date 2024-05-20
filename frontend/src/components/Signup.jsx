import {React,useState} from 'react'
import {Navigate, useNavigate} from 'react-router-dom';

import axios from 'axios';
import { BiLogoFirefox } from "react-icons/bi";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

import { IoMdMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import './Signup.css'

const Signup = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { username, email, password, confirmPassword } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, { username, email, password });
      console.log("submitted");
      console.log(res.data);
      const { token } = res.data;

      // Store the token in local storage
      localStorage.setItem('token', token);

      // Navigate to the tasks page or another appropriate page
      navigate('/task-manager');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <>
    <div className='topii'> </div>

    <div className='containers'>
      <div className='content'>
        <h2><BiLogoFirefox className='logo' />Task Manager</h2>

        <div className='text-sci'>
          <div className='social-icons'>
            <a href='#home'><FaLinkedin className='iconss' /></a>
            <a href='#home'><FaInstagramSquare className='iconss' /></a>
            <a href='#home'><FaGithub className='iconss' /></a>
            <a href='#home'><FaFacebook className='iconss' /></a>
          </div>
        </div>
      </div>

      <div className='logreg-box'>
        <div className='form-box login'>
          <form onSubmit={onSubmit}>
            <h2>Sign Up</h2>
            <div className='input-box'>
              <span className='icon'><IoMdMail /></span>
              <input type='text' placeholder='Username' name='username' value={username} onChange={onChange} required />
              <label>Username</label>
            </div>

            <div className='input-box'>
              <span className='icon'><IoMdMail /></span>
              <input type='email' placeholder='Email' name='email' value={email} onChange={onChange} required />
              <label>Email</label>
            </div>

            <div className='input-box'>
              <span className='icon'><FaLock /></span>
              <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} minLength="6" required />
              <label>Password</label>
            </div>

            <div className='input-box'>
              <span className='icon'><FaLock /></span>
              <input type="password" placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={onChange} minLength="6" required />
              <label>Confirm Password</label>
            </div>

            <button type="submit" className='butn'>Sign Up</button>

            <div className='login-register'>
              <p>Already have an Account?<a href='/login' className='register-link'>Sign In</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>
  )
}

export default Signup