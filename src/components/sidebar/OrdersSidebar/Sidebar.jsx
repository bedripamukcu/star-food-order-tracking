import React, { useEffect, useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FirestoreService from "../../../services/FirestoreService";
import { updateOrderNumbers } from "../../../redux/orderSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const orderNumbers = useSelector((state) => state.order.orderNumbers);

  useEffect(() => {
    const getCounts = async () => {
      const fs = new FirestoreService();
      const statusCounts = await fs.getAllStatusCounts();
      dispatch(updateOrderNumbers(statusCounts));
    };

    getCounts();
  }, []);
  const menuItems = [
    { label: "New Order", route: "/neworder", key: "newOrder" },
    {
      label: "Accepted",
      route: "/accepted",
      key: "accepted",
      number: orderNumbers[0],
    },
    {
      label: "Cooking",
      route: "/cooking",
      key: "cooking",
      number: orderNumbers[1],
    },
    {
      label: "Parcel Ready",
      route: "/parcelready",
      key: "parcelReady",
      number: orderNumbers[2],
    },
    {
      label: "Delivered",
      route: "/delivered",
      key: "delivered",
      number: orderNumbers[3],
    },
    {
      label: "Completed",
      route: "/completed",
      key: "completed",
      number: orderNumbers[4],
    },
  ];

  const [menuItemColors, setMenuItemColors] = useState({});

  const handleMenuItemClick = (key) => {
    setMenuItemColors((prevColors) => ({
      ...prevColors,
      [key]: !prevColors[key],
    }));
  };

  const handleMouseEnter = (key) => {
    setMenuItemColors((prevColors) => ({
      ...prevColors,
      [key]: true,
    }));
  };

  const handleMouseLeave = (key) => {
    setMenuItemColors((prevColors) => ({
      ...prevColors,
      [key]: false,
    }));
  };

  return (
    <div
      className="sidebar"
      style={{
        display: "flex",
        height: "100vh",
        overflow: "scroll initial",
        border: "1px",
      }}
    >
      <CDBSidebar textColor="#000000" backgroundColor="#e7e7e7">
        <h1 className=" sidebar-header1">Orders</h1>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            {menuItems.map((item) => (
              <NavLink
                key={item.key}
                exact
                to={item.route}
                activeClassName="activeClicked"
              >
                <div
                  onMouseEnter={() => handleMouseEnter(item.key)}
                  onMouseLeave={() => handleMouseLeave(item.key)}
                  style={{ width: "254px", height: "42.02px" }}
                >
                  <CDBSidebarMenuItem
                    onClick={() => handleMenuItemClick(item.key)}
                    style={{
                      color: menuItemColors[item.key] ? "#007bff" : "inherit",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ display: "block" }}>{item.label}</span>
                      <span style={{ display: "block" }}>{item.number}</span>
                    </div>
                  </CDBSidebarMenuItem>
                </div>
              </NavLink>
            ))}
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}></CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
