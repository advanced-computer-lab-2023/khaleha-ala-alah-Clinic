import React from "react";
import styles from "../Elements/Header.module.css"; // Link to the CSS file for styles
import logopng from "../Images/LOGOCLINIC.png";
import settingsIcon from "../Images/settings.png";
import alertIcon from "../Images/alert.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useWebSocket } from "../WebSocketContext";
import { useAuth } from "../AuthContext";
import { BellOutlined, MessageOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import axios from "axios";
import ToggleButton from "../Components/ToggleButton";
import WalletImage from "../Images/wallet.png";

const Header = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownVisibleAlert, setDropdownVisibleAlert] = useState(false);
  const [numOfNotifications, setnumOfNotifications] = useState(8);
  const [dropdownVisibleMessages, setDropdownVisibleMessages] = useState(false);
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const [messages, setMessages] = useState([]);
  const socket = useWebSocket();
  const initialized = useRef(false);
  const { role } = useAuth();
  const [currentPatient, setCurrentPatient] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/messages/notifications", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (role === "doctor") {
          setMessages(res.data.messages);
          if (res.data.messages.length > 0) {
            setHasNewMessages(true);
          }
        } else if (role === "patient") {
          const doctorMessages = res.data.messages.filter(
            (message) => message.senderRole === "doctor"
          );
          setMessages(doctorMessages);
          if (doctorMessages.length > 0) {
            setHasNewMessages(true);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
    const fetchCurrentPatient = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/patients/currentPatient`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          console.log("Current patient fetched successfully:");
          console.log(data);
          return data;
        } else {
          console.error("Failed to fetch current patient:");
          console.error(data);
          return null;
        }
      } catch (error) {
        console.error("Failed to fetch current patient:");
        console.error(error);
        return null;
      }
    };
    fetchCurrentPatient().then((data) => {
      console.log(data.data.user.walletValue);
      setCurrentPatient(data.data.user);
    });
  }, []);
  useEffect(() => {
    if (!initialized.current) {
      if (socket) {
        initialized.current = true;
        socket.on("getMessage", (data) => {
          axios
            .post(
              "http://localhost:4000/users/getUser",
              {
                userID: data.senderId,
              },
              {
                headers: {
                  authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((res) => {
              if (role === "doctor") {
                const message = {
                  senderId: data.senderId,
                  senderName: res.data.user.name,
                  senderRole: res.data.user.role,
                  receiverId: res.data.myID,
                };
                setMessages((prev) => [...prev, message]);
                setHasNewMessages(true);
              } else if (role === "patient") {
                if (res.data.user.role === "doctor") {
                  const message = {
                    senderId: data.senderId,
                    senderName: res.data.user.name,
                    senderRole: res.data.user.role,
                    receiverId: res.data.myID,
                  };
                  setMessages((prev) => [...prev, message]);
                  setHasNewMessages(true);
                }
              }
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    }
  }, [role]);
  const toggleDropdownforMessages = () => {
    setDropdownVisibleMessages(!dropdownVisibleMessages);
    setHasNewMessages(false);
  };

  const handleMessageItemClick = (message) => {
    const updatedMessages = messages.filter(
      (message) => message._id !== message._id
    );
    setMessages(updatedMessages);
    const senderId = message.senderId;
    navigate(`/chat`, { state: { senderId } });
    setDropdownVisibleMessages(false);
  };

  const toggleDropdownforSettings = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleDropdownforNotification = () => {
    // setDropdownVisibleAlert(!dropdownVisibleAlert);
    navigate("/notification");
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handlePassword = () => {
    navigate("/changePassword");
  };

  const handleUserProfile = () => {
    navigate("/patientUserProfile");
  };

  const handleEditAccount = () => {
    navigate("/patientEditAcc");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarLogo}>
          <img src={logopng} alt="Logo" />
        </div>
        <ToggleButton />
        <div className={styles.navbarRight}>
          <div className={styles.walletContainer}>
            <img src={WalletImage} alt="Wallet" style={{ width: "35px" }} />
            <p className={styles.walletValue}>
              EGP {currentPatient ? currentPatient.walletValue : "Loading ..."}
            </p>
          </div>
          <a
            href="#messages"
            className={styles.navbarLink}
            onClick={toggleDropdownforMessages}
          >
            {hasNewMessages && (
              <Badge dot>
                <MessageOutlined style={{ fontSize: "20px" }} />
              </Badge>
            )}
            {!hasNewMessages && (
              <MessageOutlined style={{ fontSize: "20px" }} />
            )}
          </a>
          {dropdownVisibleMessages && (
            <div className={styles.dropdownMenu}>
              {messages.map((message, index) => (
                <button
                  className={styles.dropdownItem}
                  key={index}
                  onClick={() => handleMessageItemClick(message)}
                >
                  {message.senderName}
                </button>
              ))}
            </div>
          )}
          <a
            href="#notifications"
            className={styles.navbarLink}
            onClick={toggleDropdownforNotification}
          >
            <span className={styles.notificationBadge}>
              {numOfNotifications}
            </span>
            <img src={alertIcon} alt="Alerts" />
          </a>
          {/* {dropdownVisibleAlert && (
            <div className={styles.dropdownMenu}>
              <button className={styles.dropdownItem}>Notification 1</button>
              <button className={styles.dropdownItem}>Notification 2</button>
              <button className={styles.dropdownItem}>Notification 3</button>
            </div>
          )} */}
          <a
            href="#settings"
            className={styles.navbarLink}
            onClick={toggleDropdownforSettings}
          >
            <img src={settingsIcon} alt="Settings" />
          </a>
          {dropdownVisible && (
            <div className={styles.dropdownMenu}>
              <button
                className={styles.dropdownItem}
                onClick={handleEditAccount}
              >
                Edit Account
              </button>
              <button
                className={styles.dropdownItem}
                onClick={handleUserProfile}
              >
                User Profile
              </button>
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

export default Header;
