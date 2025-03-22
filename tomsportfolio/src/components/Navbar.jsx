import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            <Link className="navbar-brand" to="/">My Portfolio</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav">
                    <li className="nav-item"><Link className="nav-link" to="/resume">Resume</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/text-demo">Text Demo</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/hobbies">Hobbies</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/coding-nightmares">Coding Nightmares</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
