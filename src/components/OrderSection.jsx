import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import FirestoreService from "../services/FirestoreService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateOrderNumbers } from "../redux/orderSlice";
import { Timestamp } from "./../firebase";
import "./ordersec.css";

const OrderSection = ({ order, status }) => {
  const navigate = useNavigate();
  const componentRef = useRef();
  const dispatch = useDispatch();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const firestoreTimestamp = order.createdAt;
  const javascriptDate = firestoreTimestamp.toDate();
  const formattedDate = javascriptDate.toLocaleString();
  const handleMove = async () => {
    try {
      const fs = new FirestoreService();
      await fs.updateStatus(order.orderNumber, status);
      const statusCounts = await fs.getAllStatusCounts();
      dispatch(updateOrderNumbers(statusCounts));

      navigate(`/${status}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section ref={componentRef}>
      <div className="svg-a">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "80px",
            marginLeft: "40px",
            marginRight: "40px",
          }}
        >
          <div className="order-info">
            <h6>Order number</h6>
            <h6 className="order-value">{order.orderNumber}</h6>
          </div>
          <div className="order-info">
            <h6>Date&Time</h6>

            <h6 className="order-value">{formattedDate}</h6>
          </div>
          <div className="order-info">
            <h6>Name</h6>
            <h6 className="order-value"> {order.name}</h6>
          </div>
          <div className="order-info">
            <h6>Contact</h6>
            <h6 className="order-value">{order.contact}</h6>
          </div>
          <div className="order-info">
            <h6>Trans Type</h6>
            {order.type === "Delivery" ? (
              <button
                className="btn btn-primary btn-sm "
                style={{ fontSize: "15px", color: "white" }}
              >
                Delivery
              </button>
            ) : (
              <button
                className="btn btn-sm "
                style={{
                  fontSize: "15px",
                  color: "white",
                  backgroundColor: "orange",
                }}
              >
                Takeaway
              </button>
            )}
          </div>
          <div className="order-info">
            <h6>Amount</h6>
            <h6 className="order-value">{order.total}$</h6>
          </div>
        </div>

        <div
          style={{
            fontSize: "15px",
            color: "gray",
            display: "flex",
            flexDirection: "column",
            marginBottom: "50px",
            marginTop: "20px",
            marginLeft: "40px",
            marginRight: "40px",
          }}
        >
          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ marginRight: "10px" }}>Ordered Items</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {order.selectedItems?.map((i, index) => (
                <div
                  key={index}
                  style={{
                    color: "black",
                    fontFamily: "SF Pro Display",
                    borderRadius: "5px",
                    margin: "2px",
                    padding: "2px 10px",
                    backgroundColor: "#ccc",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {i.value}
                  <span style={{ marginLeft: "5px", fontWeight: "bold" }}>
                    x{i.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <br />
        <br />
        <div
          style={{
            color: "gray",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              marginBottom: "20px",
              marginLeft: "40px",
              marginRight: "40px",
            }}
          >
            <h6 style={{ fontSize: "17px", color: "gray" }}>
              Additional information from customer
            </h6>
            <div style={{ marginTop: "10px" }}>
              <h6
                style={{
                  marginBottom: "1px",
                  fontSize: "15px",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                {order.message}
              </h6>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "45px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40px"
              height="36px"
              fill="currentColor"
              class="bi bi-printer"
              viewBox="0 0 16 16"
              onClick={handlePrint}
              onMouseEnter={(e) => {
                e.target.style.fill = "blue";
              }}
              onMouseLeave={(e) => {
                e.target.style.fill = "currentColor";
              }}
              style={{ marginRight: "30px" }}
            >
              <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
              <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" />
            </svg>
            {status && (
              <button
                className="btn btn-primary btn-sm move-button"
                onClick={handleMove}
              >
                Move to {status}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSection;
