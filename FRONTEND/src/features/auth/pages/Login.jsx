import { Link, useNavigate } from 'react-router';
import '../auth.form.scss'


function Login() {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit} >
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter password" />
                    </div>
                    <button className="button primary-button ">Login</button>
                </form>

                <p>Do not have an account? <Link to={'/Register'} >Register</Link></p>
            </div>
        </main>
    )
}

export default Login;