
import { Route, Routes, Link, BrowserRouter } from 'react-router-dom';
export default function nav() {
    return (
        <div>
            <div className="container">
                <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                    <Link to="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                        Social Media
                    </Link>

                    <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        <li><Link className="nav-link px-2 link-dark" to="/">Home</Link></li>
                        <li><Link className="nav-link px-2 link-dark" to="/user_post_summary">User Post Summary</Link></li>
                        <li><a className="nav-link px-2 link-dark" href="https://github.com/JoshuaDuma/Buzzer-Full-Stack-Development-Assessment">GitHub</a></li>
                    </ul>
                </header>
            </div>
        </div>
    );
}