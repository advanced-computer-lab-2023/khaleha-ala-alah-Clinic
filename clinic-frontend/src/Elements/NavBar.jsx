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
    return sectionName === "familyMembers" || sectionName === "packages"; // Assume 'home' has subsections for this example
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
                  onClick={(e) =>
                    handleSectionClick(e, "home", "/familyMembers")
                  }
                >
                  View Your Family Members
                </div>{" "}
                <div
                  className={
                    selectedSubSection === "addFamilyMember"
                      ? styles.dropdownItemSelected
                      : styles.dropdownItem
                  }
                  onClick={(e) =>
                    handleSectionClick(e, "about", "/addFamilyMember")
                  }
                >
                  Add New Family Member
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
            onClick={(e) =>
              handleSectionClick(e, "appointments", "/appointments")
            }
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
              </div>
            )}
          </div>

          <div
            className={
              selectedSection === "packages"
                ? styles.navbarLinkSelected
                : styles.navbarLinkSection
            }
            onMouseEnter={() => handleSectionMouseEnter("packages")}
            onMouseLeave={() => handleSectionMouseLeave()}
            onClick={(e) =>
              handleSectionClick(e, "packages", "/managePackages")
            }
          >
            Packages {hasSubsections("packages") && <span>▼</span>}
            {/* Dropdown Menu */}
            {hoveredSection === "packages" && (
              <div
                className={styles.homeDropdownMenu}
                onMouseEnter={() => setHoveredSection("packages")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <div
                  className={
                    selectedSubSection === "yourPackages"
                      ? styles.dropdownItemSelected
                      : styles.dropdownItem
                  }
                  onClick={(e) =>
                    handleSectionClick(e, "home", "/myselfPackages")
                  }
                >
                  Manage Your Packages
                </div>{" "}
                <div
                  className={
                    selectedSubSection === "familyMemberPackages"
                      ? styles.dropdownItemSelected
                      : styles.dropdownItem
                  }
                  onClick={(e) =>
                    handleSectionClick(e, "home", "/familyMemberPackages")
                  }
                >
                  Manage Your Family Member Packages
                </div>{" "}
              </div>
            )}
          </div>
          <div
            className={
              selectedSection === "prescriptions"
                ? styles.navbarLinkSelected
                : styles.navbarLinkSection
            }
            onMouseEnter={() => handleSectionMouseEnter("prescriptions")}
            onMouseLeave={() => handleSectionMouseLeave()}
            onClick={(e) =>
              handleSectionClick(e, "prescriptions", "/prescriptions")
            }
          >
            Prescriptions {hasSubsections("prescriptions") && <span>▼</span>}
          </div>
          <div
            className={
              selectedSection === "viewAllDoctors"
                ? styles.navbarLinkSelected
                : styles.navbarLinkSection
            }
            onMouseEnter={() => handleSectionMouseEnter("viewAllDoctors")}
            onMouseLeave={() => handleSectionMouseLeave()}
            onClick={(e) =>
              handleSectionClick(e, "viewAllDoctors", "/viewAllDoctors")
            }
          >
            View & Search Doctors{" "}
            {hasSubsections("viewAllDoctors") && <span>▼</span>}
          </div>
          <div
            className={
              selectedSection === "chat"
                ? styles.navbarLinkSelected
                : styles.navbarLinkSection
            }
            onMouseEnter={() => handleSectionMouseEnter("chat")}
            onMouseLeave={() => handleSectionMouseLeave()}
            onClick={(e) => handleSectionClick(e, "chat", "/chat")}
          >
            Chat {hasSubsections("chat") && <span>▼</span>}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
