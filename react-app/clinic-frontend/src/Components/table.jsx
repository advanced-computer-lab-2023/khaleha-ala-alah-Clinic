import React, { useState, useEffect } from "react";
//import "./appointments.module.css";
import styles from "./table.module.css";

import { Table, Button, Tag } from "antd";

const Tables = ({ columns, data }) => {
  return (
    <div style={{ width: 92 + "vw" }}>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id" // Ensure you have a unique key for each row
        pagination={{ pageSize: 7 }} // Adjust pagination as needed
        rowClassName={styles.tableRow}
        // Add any other props as per your requirement
      />
    </div>
  );
};

export default Tables;
