import React, { useEffect, useState } from 'react';
import learningPortalImg from "../../assets/image/learningportal.svg";
import useTitle from '../../hooks/useTitle';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../features/auth/authApi';

const Registration = () => {
    useTitle("Student Registration");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [register, { data, isLoading, error: responseError }] = useRegisterMutation();

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
        if (password !== confirmPassword) {
            setError("Password Didnt Match");
        }
        else {
            register({
                name,
                email,
                password,
                role: "student"

            });
        }
    };

    return (
        <section onSubmit={handleSubmit} className="py-6 bg-primary h-screen grid place-items-center">
            <div className="mx-auto max-w-md px-5 lg:px-0">
                <div>
                    <img className="h-12 mx-auto" src={learningPortalImg} alt="" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                        Create Your New Account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" action="#" method="POST">
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="name" className="sr-only">Name</label>
                            <input id="name" name="name" type="name" autoComplete="name" required
                                className="login-input rounded-t-md" placeholder="Student Name" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input id="email-address" name="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)}
                                className="login-input " placeholder="Email address" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)}
                                className="login-input" placeholder="Password" />
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                            <input id="confirm-password" name="confirm-password" type="password"
                                autoComplete="confirm-password" required className="login-input rounded-b-md" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password" />
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                            Create Account
                        </button>
                    </div>
                    {error !== "" && <div style={{ color: "white", fontWeight: "bold", fontSize: "15px", padding: "8px ", margin: "10px 0", borderRadius: "5px", backgroundColor: "#fc4242" }}>{error}</div>}
                </form>
            </div>
        </section>
    );
};

export default Registration;