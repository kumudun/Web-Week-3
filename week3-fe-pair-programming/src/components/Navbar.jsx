
import logo from '../assets/images/logo.svg'

const Navbar = () => {
  return (
    <>
  {/* Navbar section starts */}
  <div>
    <nav className="navbar">
      <div className="nav-center">
        <div className="nav-header">
          <img src={logo} className="nav-logo" alt="backroads" />
          <button type="button" className="nav-toggle" id="nav-toggle">
            <i className="fas fa-bars" />
          </button>
        </div>
        <ul className="nav-links" id="nav-links">
          <li>
            <a href="#home" className="nav-link">
              home
            </a>
          </li>
          <li>
            <a href="#about" className="nav-link">
              about
            </a>
          </li>
          <li>
            <a href="#services" className="nav-link">
              services
            </a>
          </li>
          <li>
            <a href="#tours" className="nav-link">
              tours
            </a>
          </li>
        </ul>
        <ul className="nav-icons">
          <li>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
              className="nav-icon"
            >
              <i className="fab fa-facebook" />
            </a>
          </li>
          <li>
            <a
              href="https://www.x.com"
              target="_blank"
              rel="noreferrer"
              className="nav-icon"
            >
              <i className="fab fa-x-twitter" />
            </a>
          </li>
          <li>
            <a
              href="https://www.squarespace.com/"
              target="_blank"
              rel="noreferrer"
              className="nav-icon"
            >
              <i className="fab fa-squarespace" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
    {/* Navbar section ends */}
  </div>
</>

  );
};

export default Navbar;
