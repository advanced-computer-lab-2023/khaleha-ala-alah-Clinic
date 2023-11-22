import React from "react";
import styles from "../Elements/NavBar.module.css"; // Link to the CSS file for styles
import logopng from "../Images/logooo.png";
import settingsIcon from "../Images/settings.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState("home"); // Default selected section
  const [selectedSubSection, setSelectedSubSection] =
    useState("viewFamilyMembers"); // Default selected section
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

  const handleSectionClick = (section, route) => {
    setSelectedSection(section);
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
    return sectionName === "home" || sectionName === "familyMembers"; // Assume 'home' has subsections for this example
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarLogo}>
          <img src={logopng} alt="Logo" />
        </div>
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
            onClick={() => handleSectionClick("home", "/home")}
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
                <div
                  className={styles.dropdownItem}
                  onClick={() => handleSectionClick("about", "/about")}
                >
                  About Us
                </div>{" "}
              </div>
            )}
          </div>
          <div
            className={
              selectedSection === "notifications"
                ? styles.navbarLinkSelected
                : styles.navbarLinkSection
            }
            onMouseEnter={() => handleSectionMouseEnter("notifications")}
            onMouseLeave={() => handleSectionMouseLeave()}
            onClick={() =>
              handleSectionClick("notifications", "/notifications")
            }
          >
            Notifications {hasSubsections("notifications") && <span>▼</span>}
            {/* Dropdown Menu */}
            {hoveredSection === "notifications" && (
              <div
                className={styles.homeDropdownMenu}
                onMouseEnter={() => setHoveredSection("notifications")}
                onMouseLeave={() => setHoveredSection(null)}
              ></div>
            )}
          </div>
          <div
            className={
              selectedSection === "familyMembers"
                ? styles.navbarLinkSelected
                : styles.navbarLinkSection
            }
            onMouseEnter={() => handleSectionMouseEnter("familyMembers")}
            onMouseLeave={() => handleSectionMouseLeave()}
            onClick={() =>
              handleSectionClick("familyMembers", "/familyMembers")
            }
          >
            Family Members {hasSubsections("familyMembers") && <span>▼</span>}
            {/* Dropdown Menu */}
            {hoveredSection === "familyMembers" && (
              <div
                className={styles.homeDropdownMenu}
                onMouseEnter={() => setHoveredSection("familyMembers")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <div
                  className={
                    selectedSubSection === "viewFamilyMembers"
                      ? styles.dropdownItemSelected
                      : styles.dropdownItem
                  }
                  onClick={() => handleSectionClick("home", "/")}
                >
                  View Your Family Members
                </div>{" "}
                <div
                  className={styles.dropdownItem}
                  onClick={() => handleSectionClick("about", "/about")}
                >
                  Add Family Member Using National ID
                </div>{" "}
                <div
                  className={styles.dropdownItem}
                  onClick={() => handleSectionClick("about", "/about")}
                >
                  Add Family Member Using Email
                </div>{" "}
                <div
                  className={styles.dropdownItem}
                  onClick={() => handleSectionClick("about", "/about")}
                >
                  Add Family Member Using Phone Number
                </div>{" "}
              </div>
            )}
          </div>
          <a href="#notifications" className={styles.navbarLink}>
            Appointments
          </a>
        </div>
        <div className={styles.navbarRight}>
          <a
            href="#settings"
            className={styles.navbarLink}
            onClick={toggleDropdown}
          >
            <img src={settingsIcon} alt="Settings" />
          </a>
          {dropdownVisible && (
            <div className={styles.dropdownMenu}>
              <button className={styles.dropdownItem}>My Account</button>
              <button className={styles.dropdownItem} onClick={handlePassword}>
                Change Password
              </button>
              <button className={styles.dropdownItem} onClick={handleLogout}>
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
