import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { Link } from "react-router-dom";


export const Notification = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        const fetchInitialNotifications = async () => {
            try{
                fetch('http://localhost:4000/notifications', {
                  headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json",
                  },
                  method: 'GET',
                });
              }
              catch(error){
                console.error("there is network error to fetch notfications", error);
              }
        };

        fetchInitialNotifications();

        // Initialize the socket connection
        const socket = io('http://localhost:4000'); // Adjust the URL to your server
        console.log("hahahahahaha" + socket);
        console.log(socket);
        // Listen for notifications
        socket.on('notification', (newNotification) => {
            console.log('New notification received:', newNotification);
            setNotifications(prevNotifications => [...prevNotifications, newNotification]);
        });
        console.log();

        // Clean up the socket connection when the component unmounts
        
        return () => {
            console.log('lallalalalalal');
            socket.disconnect();}
    }, []);

    return (
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>{notification.message}</li> // Adjust depending on your notification structure
                ))}
            </ul>
        </div>
    );
};

//export default Notification;