import { Route } from 'react-router-dom';
import { Link } from "react-router-dom";

const year = (new Date()).getFullYear()

export default function footer() {
    return (
        <div className="container">
            <footer className="py-3 my-4">
                <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                </ul>
                <p className="text-center text-muted">Built using React and Bootstrap 5</p>
                <p className="text-center text-muted">© {year} Joshua Duma</p>
            </footer>
        </div>
    );
} 