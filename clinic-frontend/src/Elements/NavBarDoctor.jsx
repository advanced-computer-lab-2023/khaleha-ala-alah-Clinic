import React from "react";
import styles from "../Elements/NavBar.module.css"; // Link to the CSS file for styles
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = ({ selectedSection, selectedSubSection = "" }) => {
  const navigate = useNavigate();
  const [hoveredSection, setHoveredSection] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const handleSectionMouseEnter = (section) => {
    clearTimeout(hoverTimeout); // Clear any existing timeout
    setHoveredSection(section);
  };

  const handleSectionMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredSection(null);
    }, 130); // Delay of 500ms
    setHoverTimeout(timeout);
  };

  const handleSectionClick = (event, section, route) => {
    event.stopPropagation();
    //setSelectedSection(section);
    navigate(route);
  };
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handlePassword = () => {
    navigate("/changePassword");
  };

  const hasSubsections = (sectionName) => {
    // Logic to determine if a section has subsections
    // For example:
    return (
      sectionName === "familyMembers" ||
      sectionName === "appointments" ||
      sectionName === "packages"
    ); // Assume 'home' has subsections for this example
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarLinks}>
          {/* Example for Home section */}
          <div
            className={
              selectedSection === "home"
                ? styles.navbarLinkSelected
                : styles.navbarLinkSection
            }
            onMouseEnter={() => handleSectionMouseEnter("home")}
            onMouseLeave={() => handleSectionMouseLeave()}
            onClick={(e) => handleSectionClick(e, "home", "/")}
          >
            Home {hasSubsections("home") && <span>▼</span>}
            {/* Dropdown Menu */}
            {hoveredSection === "home" && (
              <div
                className={styles.homeDropdownMenu}
                onMouseEnter={() => setHoveredSection("home")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {/* Unique className */}
                {/* ... dropdown items ... */}
              </div>
            )}
          </div>

          <div
            className={
              selectedSection === "viewMyPatients"
                ? styles.navbarLinkSelected
                : styles.navbarLinkSection
            }
            onMouseEnter={() => handleSectionMouseEnter("viewMyPatients")}
            onMouseLeave={() => handleSectionMouseLeave()}
            onClick={(e) =>
              handleSectionClick(e, "viewMyPatients", "/viewallmypatients")
            }
          >
            View Patients {hasSubsections("viewMyPatients") && <span>▼</span>}
          </div>
          <div
            className={
              selectedSection === "viewappointments"
                ? styles.navbarLinkSelected
                : styles.navbarLinkSection
            }
            onMouseEnter={() => handleSectionMouseEnter("viewappointments")}
            onMouseLeave={() => handleSectionMouseLeave()}
            onClick={(e) =>
              handleSectionClick(e, "viewappointments", "/doctorAppointments")
            }
          >
            View My Appointments {hasSubsections("viewappointments") && <span>▼</span>}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
