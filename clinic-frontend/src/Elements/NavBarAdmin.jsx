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
      sectionName === "manageusers" ||
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
              selectedSection === "manageadmins"
                ? styles.navbarLinkSelected
                : styles.navbarLinkSection
            }
            onMouseEnter={() => handleSectionMouseEnter("manageadmins")}
            onMouseLeave={() => handleSectionMouseLeave()}
            onClick={(e) =>
              handleSectionClick(e, "manageadmins", "/deleteAdminDoctorPatient")
            }
          >
            Manage Admins {hasSubsections("manageadmins") && <span>▼</span>}
          </div>

          <div
            className={
              selectedSection === "manageusers"
                ? styles.navbarLinkSelected
                : styles.navbarLinkSection
            }
            onMouseEnter={() => handleSectionMouseEnter("manageusers")}
            onMouseLeave={() => handleSectionMouseLeave()}
            onClick={(e) =>
              handleSectionClick(e, "manageusers", "/familyMembers")
            }
          >
            Manage Users {hasSubsections("manageusers") && <span>▼</span>}
            {/* Dropdown Menu */}
            {hoveredSection === "manageusers" && (
              <div
                className={styles.homeDropdownMenu}
                onMouseEnter={() => setHoveredSection("manageusers")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <div
                  className={
                    selectedSubSection === "managedoctors"
                      ? styles.dropdownItemSelected
                      : styles.dropdownItem
                  }
                  onClick={(e) =>
                    handleSectionClick(e, "home", "/ManageDoctor")
                  }
                >
                  Manage Doctors
                </div>{" "}
                <div
                  className={
                    selectedSubSection === "managepatients"
                      ? styles.dropdownItemSelected
                      : styles.dropdownItem
                  }
                  onClick={(e) =>
                    handleSectionClick(e, "about", "/deletePatient")
                  }
                >
                  Manage Patients
                </div>{" "}
              </div>
            )}
          </div>

          <div
            className={
              selectedSection === "managependingdoctors"
                ? styles.navbarLinkSelected
                : styles.navbarLinkSection
            }
            onMouseEnter={() => handleSectionMouseEnter("managependingdoctors")}
            onMouseLeave={() => handleSectionMouseLeave()}
            onClick={(e) =>
              handleSectionClick(e, "managependingdoctors", "/viewPendingDoctors")
            }
          >
            Manage Pending Doctors {hasSubsections("managependingdoctors") && <span>▼</span>}
          </div>

          <div
            className={
              selectedSection === "healthpackages"
                ? styles.navbarLinkSelected
                : styles.navbarLinkSection
            }
            onMouseEnter={() => handleSectionMouseEnter("healthpackages")}
            onMouseLeave={() => handleSectionMouseLeave()}
            onClick={(e) =>
              handleSectionClick(e, "healthpackages", "/packages")
            }
          >
            Manage Health Packages {hasSubsections("healthpackages") && <span>▼</span>}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default NavBar;
