import './Footer.css';
import { Link, useLocation } from 'react-router-dom';

function Footer() {
    const location = useLocation();

    return (
        <footer className="footer">
            <div className="footer-links">
                <Link to="/about">About</Link>
                <Link to="/help">Help</Link>
                <Link to="/privacy">Privacy Policy</Link>
            </div>
            <p className="footer-copy">&copy; 2024 GameTracker. All rights reserved.</p>
        </footer>
    );
}

export default Footer;