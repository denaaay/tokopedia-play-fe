import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Auth.css';

function Auth({title, baseUrl}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        let link = '';

        if (title === "Login") {
            link = `${baseUrl}/login`
        } else {
            link = `${baseUrl}/register`
        }

        try {
            const response = await fetch(link, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.status === 200 || response.status === 201) {
            // Login berhasil, lakukan pengecekan session di frontend
                const data = await response.json();
                localStorage.setItem('sessionToken', data.token);
                localStorage.setItem('username', data.username);
                navigate('/');
                window.location.reload();
            } else {
            // Tampilkan pesan kesalahan
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            alert("error during login", error);
        }
        };
    
    return(
        <div className='auth-body'>
            <div className="auth">
                <h4>{title}</h4>
                <form onSubmit={handleSubmit} className='auth-form'>
                    <div className='form-auth'>
                        <label> Username : </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}/>
                        <label> Password : </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    
                    <button className='form-button' type="submit">{title}</button>
                </form>
                <div className='form-advance'>
                    {title === "Login"
                        ? <p>Didn't have an account? <span><a href="/register">Register</a></span>!</p>
                        : <p>Already have an account? <span><a href="/login">Login</a></span>!</p>}
                </div>
            </div>
        </div>
    );
}

export default Auth;