import React from "react";
import styles from "../Elements/NavBar.module.css"; // Link to the CSS file for styles
import logopng from "../Images/logooo.png";
import settingsIcon from "../Images/settings.png";
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
    return sectionName === "familyMembers" || sectionName === "appointments"; // Assume 'home' has subsections for this example
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
              selectedSection === "familyMembers"
                ? styles.navbarLinkSelected
                : styles.navbarLinkSection
            }
            onMouseEnter={() => handleSectionMouseEnter("familyMembers")}
            onMouseLeave={() => handleSectionMouseLeave()}
            onClick={(e) =>
              handleSectionClick(e, "familyMembers", "/familyMembers")
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
                  onClick={(e) =>
                    handleSectionClick(
                      e,
                      "AddFamilyMember",
                      "/addFamilyMemberUsingEmail"
                    )
                  }
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

          <div
            className={
              selectedSection === "appointments"
                ? styles.navbarLinkSelected
                : styles.navbarLinkSection
            }
            onMouseEnter={() => handleSectionMouseEnter("appointments")}
            onMouseLeave={() => handleSectionMouseLeave()}
            onClick={() => handleSectionClick("appointments", "/appointments")}
          >
            Appointments {hasSubsections("appointments") && <span>▼</span>}
            {/* Dropdown Menu */}
            {hoveredSection === "appointments" && (
              <div
                className={styles.homeDropdownMenu}
                onMouseEnter={() => setHoveredSection("appointments")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <div
                  className={
                    selectedSubSection === "viewAppointments"
                      ? styles.dropdownItemSelected
                      : styles.dropdownItem
                  }
                  onClick={(e) =>
                    handleSectionClick(e, "home", "/appointments")
                  }
                >
                  View Your Appointments
                </div>{" "}
                <div
                  className={styles.dropdownItem}
                  onClick={() => handleSectionClick("about", "/about")}
                >
                  Add Family Member Using National ID
                </div>{" "}
                <div
                  className={styles.dropdownItem}
                  onClick={(e) =>
                    handleSectionClick(
                      e,
                      "AddFamilyMember",
                      "/addFamilyMemberUsingEmail"
                    )
                  }
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
