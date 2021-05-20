import { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Products",
      link: "products",
    },

    {
      title: "Contact Us",
      link: "/",
    },
    {
      title: "Log In",
      link: "/",
    },
  ];

  const handleScroll = () => {
    window.scrollY > 0 ? setScrolled(true) : setScrolled(false);
  };

  const logoClick = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`nav-menu-icon ${menuOpen ? "active" : "not-active"}`}
        id="nav-menu-icon"
        onClick={() => setMenuOpen((menuOpen) => !menuOpen)}
      >
        <span className="hb-line"></span>
        <span className="hb-line"></span>
        <span className="hb-line"></span>
      </div>
      <nav className={`${scrolled ? "scrolled" : ""}`}>
        <div className={`nav-main`}>
          <span onClick={logoClick} className="nav-brand">
            {/* <Logo className='nav-brand-logo' /> */}
            <span className="nav-brand-text">IntelliMart</span>
          </span>
          <ul className="nav-links">
            {links.map((link, index) => {
              return (
                <a
                  className="nav-link"
                  href={link.link}
                  key={index}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.title}
                  <div className="underline"></div>
                </a>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
