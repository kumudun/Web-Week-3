import logo from '../assets/images/logo.svg';
import PageLinks from './PageLinks';
import SocialLinks from './SocialLinks';
function Header() {
  return (
    <div>
      <header className="header">
        <nav className="navbar">
          <div className="nav-center">
            <div className="nav-header">
              <img src={logo} className="nav-logo" alt="backroads" />
              <button type="button" className="nav-toggle"
                id="nav-toggle">
                <i className="fas fa-bars"></i>
              </button>
            </div>
            <PageLinks parentClass='nav-links' itemClass='nav-link' />
            <SocialLinks parentClass="nav-icons" itemClass="nav-icon" />
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
