import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { LoadingOutlined } from "@ant-design/icons";
const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />{" "}
        </div>

        <div className="col">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Admin Dashboard</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;