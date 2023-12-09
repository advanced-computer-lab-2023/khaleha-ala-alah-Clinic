import React from 'react';
import '../Elements/ServiceItem.css'; // Import the CSS
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FileDoneOutlined, PlusOutlined } from "@ant-design/icons/lib";
import { useState } from 'react';
const ServiceItem = ({ imgSrc, title, description , method, message}) => {
  
  const [showOverlay , setShowOverlay ] = useState(false);
  const navigate = useNavigate();

  // const handleClick = () => {
  //   setShowOverlay (true);
  // };

  return (
    <div className="service-item" >
      <div className="image-container">
        <img src={imgSrc} alt={title} className="service-image" />
      </div>
      <h3 className="service-title">{title}</h3>
      <p className="service-description">{description}</p>
      <div style={{
        paddingTop: '70px',
        marginLeft: '11rem'
      }}>
      <button className="button-Style" onClick={() => {method(title , message)}} >
        Details <FileDoneOutlined className="ml-2" />
      </button>
      </div>

     
      
    </div>
  );
};

export default ServiceItem;