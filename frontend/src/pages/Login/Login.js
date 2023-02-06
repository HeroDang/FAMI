import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';

import * as accountService from '@/services/accountService';
import useToken from '@/hooks/useToken';
import images from '@/assets/images';
import Image from '@/components/Image';

const cx = classNames.bind(styles);

// async function loginUser(credentials) {
//  return fetch('http://localhost:8080/login', {
//    method: 'POST',
//    headers: {
//      'Content-Type': 'application/json'
//    },
//    body: JSON.stringify(credentials)
//  })
//    .then(data => data.json())
// }

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    // const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    // const [isError, setIsError] = useState(false);
    const [submitted, setSubmited] = useState(false);
    const [message, setMessage] = useState('loi');
    // const { token, setToken } = useToken();

    useEffect(() => {
        localStorage.clear();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const token = await loginUser({
        //   username,
        //   password
        // });
        // setToken(token);

        accountService
            .login({
                username,
                password,
            })
            .then((token) => {
                localStorage.setItem('token', JSON.stringify(token));
                setIsLogin(true);
                // setToken(token);
            });
    };

    // const handleSubmit = async (e) => {
    //     setSubmited(true);
    //     // setLoading(true);
    //     e.preventDefault();
    //     // if (username.trim() && password.trim()) {
    //     const token = await accountService.login({
    //         username,
    //         password,
    //     });
    //     setToken(token);
    //     // console.log(token);
    //     // if (_token.error) {
    //     //     setMessage('Username or password invalid');
    //     //     setToken(_token);
    //     //     setIsError(true);
    //     // } else {
    //     //     setToken(_token);
    //     //     // setIsLogin(true);
    //     //     console.log(token);
    //     //     // if (_token.account) {
    //     //     //     setToken(_token);
    //     //     //     // setIsLogin(true);
    //     //     //     console.log(token);
    //     //     // } else {
    //     //     //     console.log('loi');
    //     //     // }
    //     // }
    //     // }
    //     // setLoading(false);
    // };

    return (
        <div className={cx('login-wrapper')}>
            {/* {loading && <p>Loading</p>} */}
            {isLogin && <Navigate to="/" replace={true} />}

            <div className={cx('image-group')}>
                <Image src={images.title} alt="FAMI" className={cx('title')} />
                <Image src={images.largeLogo} alt="Large Logo" className={cx('large-logo')} />
            </div>

            <div className={cx('login-form')}>
                <Image src={images.backgroundLogin} alt="backgroundLogin" className={cx('background')} />
                <form onSubmit={handleSubmit} className={cx('form')}>
                    <h1 style={{ zIndex: 10, textAlign: 'center', marginBottom: '10px' }}>Login</h1>
                    <label>
                        <p>Username</p>
                        <input type="text" onChange={(e) => setUserName(e.target.value)} />
                        {submitted && !username && <p className={cx('invalid')}>Username is require</p>}
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} />
                        {submitted && !password && <p className={cx('invalid')}>Password is require</p>}
                    </label>
                    {/* {isError && <p className={cx('error-title')}>{message}</p>} */}
                    <div className={cx('btn-login')}>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

Login.propTypes = {
    setToken: PropTypes.func,
};
