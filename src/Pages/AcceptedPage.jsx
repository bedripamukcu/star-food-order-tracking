import React, { useEffect, useState } from "react";
import OrderSection from "../components/OrderSection";
import FirestoreService from "../services/FirestoreService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AcceptedPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const orderNumbers = useSelector((state) => state.order.orderNumbers);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const fs = new FirestoreService();
        const acceptedOrders = await fs.get("accepted");
        setOrders(acceptedOrders);
      } catch (err) {
        console.log(err);
      }
    };

    getOrders();
  }, []);

  const handleMove = () => {
    navigate("/neworder");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          padding: "20px",
          marginBottom: "-50px",
        }}
      >
        <div className="d-flex align-items-center ">
          <svg
            width="18"
            height="17"
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.3333 9.12315H1.66667C1.29867 9.12315 1 8.8957 1 8.61545C1 8.3352 1.29867 8.10776 1.66667 8.10776H16.3333C16.7013 8.10776 17 8.3352 17 8.61545C17 8.8957 16.7013 9.12315 16.3333 9.12315Z"
              fill="black"
              stroke="black"
            />
            <path
              d="M16.3333 2.26924H1.66667C1.29867 2.26924 1 1.98493 1 1.63462C1 1.28431 1.29867 1 1.66667 1H16.3333C16.7013 1 17 1.28431 17 1.63462C17 1.98493 16.7013 2.26924 16.3333 2.26924Z"
              fill="black"
              stroke="black"
            />
            <path
              d="M16.3333 15.977H1.66667C1.29867 15.977 1 15.6927 1 15.3424C1 14.9921 1.29867 14.7078 1.66667 14.7078H16.3333C16.7013 14.7078 17 14.9921 17 15.3424C17 15.6927 16.7013 15.977 16.3333 15.977Z"
              fill="black"
              stroke="black"
            />
          </svg>
          <div className="custom-header ">Accepted </div>
        </div>
      </div>
      <br />
      <div
        style={{
          color: "black",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", width: "100%", padding: "20px" }}>
          <div className="d-flex align-items-center">
            <div
              style={{
                background: "#f7f7f7",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "30px",
                marginRight: "40px",
                width: "232px",
                height: "50px",
                top: "108px",
                left: "432px",
                radius: "5px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.3333 9.12315H1.66667C1.29867 9.12315 1 8.8957 1 8.61545C1 8.3352 1.29867 8.10776 1.66667 8.10776H16.3333C16.7013 8.10776 17 8.3352 17 8.61545C17 8.8957 16.7013 9.12315 16.3333 9.12315Z"
                  fill="black"
                  stroke="black"
                />
                <path
                  d="M16.3333 2.26924H1.66667C1.29867 2.26924 1 1.98493 1 1.63462C1 1.28431 1.29867 1 1.66667 1H16.3333C16.7013 1 17 1.28431 17 1.63462C17 1.98493 16.7013 2.26924 16.3333 2.26924Z"
                  fill="black"
                  stroke="black"
                />
                <path
                  d="M16.3333 15.977H1.66667C1.29867 15.977 1 15.6927 1 15.3424C1 14.9921 1.29867 14.7078 1.66667 14.7078H16.3333C16.7013 14.7078 17 14.9921 17 15.3424C17 15.6927 16.7013 15.977 16.3333 15.977Z"
                  fill="black"
                  stroke="black"
                />
              </svg>

              <div className="custom-header-1 ">
                Showing {orderNumbers[0]} Orders{" "}
              </div>
            </div>
          </div>{" "}
          <button
            className="btn btn-primary btn-sm move-button"
            onClick={handleMove}
            style={{ marginLeft: "700px" }}
          >
            Add New Order
          </button>
        </div>
      </div>

      <hr
        style={{ borderTop: "1px solid black", margin: "12px 120px 0 20px" }}
      />

      <div style={{ margin: "10px 70px 10px -20px" }}>
        {orders &&
          orders.map((o) => {
            return <OrderSection order={o} status="cooking" />;
          })}
      </div>
    </>
  );
};

export default AcceptedPage;
