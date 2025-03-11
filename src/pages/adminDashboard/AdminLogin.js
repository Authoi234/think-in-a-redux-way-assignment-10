import React, { useEffect, useState } from 'react';
import learningPortalImg from "../../assets/image/learningportal.svg";
import useTitle from '../../hooks/useTitle';
import { useNavigate } from 'react-router-dom';
import { useAdminLoginMutation } from '../../features/auth/authApi';

const AdminLogin = () => {
    useTitle("Admin Login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [adminLogin, { data, isLoading, error: responseError }] = useAdminLoginMutation();

    useEffect(() => {
        if (responseError?.data) {
            setError(responseError.data);
        }
        if (data?.accessToken && data?.user) {
            navigate("/admin/dashboard");
        }
    }, [data, responseError, navigate]);


    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (email === 'admin@learnwithsumit.com') {
            adminLogin({ email, password });
        } else {
            setError("Login, /login");
        }
    };

    return (
        <section className="py-6 bg-[#080e1b] min-h-screen grid place-items-center">
            <div className="mx-auto max-w-md px-5 lg:px-0 text-whtie" >
                <div>
                    <img className="h-12 mx-auto" src={learningPortalImg} alt='' />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                        Sign in to Admin Account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label for="email-address" className="sr-only">Email address</label>
                            <input id="email-address" name="email" type="email" autocomplete="email" required value={email} onChange={e => setEmail(e.target.value)}
                                className="login-input rounded-t-md" placeholder="Email address" />
                        </div>
                        <div>
                            <label for="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" autocomplete="current-password" required value={password} onChange={e => setPassword(e.target.value)}
                                className="login-input rounded-b-md" placeholder="Password" />
                        </div>
                    </div>

                    <div className="flex items-center justify-end">
                        <div className="text-sm">
                            <a href="#" className="font-medium text-violet-600 hover:text-violet-500" onClick={() => window.confirm("You have to remember to your own. Yesterday is history, tomorrow is mistry but today is a gift, thats why it is called the present")}>
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                            Sign in
                        </button>
                        {error !== "" && <div style={{ color: "white", fontWeight: "bold", fontSize: "15px", padding: "8px ", margin: "10px 0", borderRadius: "5px", backgroundColor: "#fc4242" }}>{error}</div>}
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AdminLogin;