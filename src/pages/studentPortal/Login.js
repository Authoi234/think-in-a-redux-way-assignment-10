import React, { useEffect, useState } from 'react';
import learningPortalImg from "../../assets/image/learningportal.svg";
import useTitle from './../../hooks/useTitle';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../features/auth/authApi';

const Login = () => {
    useTitle("Student Login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [login, { data, isLoading, error: responseError }] = useLoginMutation();

    useEffect(() => {
        if (responseError?.data) {
            setError(responseError.data);
        }
        if (data?.accessToken && data?.user) {
            navigate("/StudentPortal/course");
        }
    }, [data, responseError, navigate]);


    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (email === 'admin@learnwithsumit.com') {
            setError("Admin Login, /admin/login");
        } else {
            login({ email, password });
        }
    };

    return (
        <section className="py-6 bg-[#080e1b] min-h-screen grid place-items-center text-black" onSubmit={handleSubmit}>
            <div className="mx-auto max-w-md px-5 lg:px-0">
                <div>
                    <img className="h-12 mx-auto" src={learningPortalImg} alt='' />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                        Sign in to Student Account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" action="#" method="POST">
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input id="email-address" name="email" type="email" autoComplete="email" required
                                className="login-input rounded-t-md" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} className="login-input rounded-b-md" placeholder="Password" />
                        </div>
                    </div>

                    <div className="flex items-center justify-end">
                        <div className="text-sm">
                            <Link to="./registration" className="font-medium text-violet-600 hover:text-violet-500">
                                Create New Account
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                            Sign in
                        </button>
                    </div>
                    {error !== "" && <div style={{ color: "white", fontWeight: "bold", fontSize: "15px", padding: "8px ", margin: "10px 0", borderRadius: "5px", backgroundColor: "#fc4242" }}>{error}</div>}
                </form>
            </div>
        </section>
    );
};

export default Login;