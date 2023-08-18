import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import FirestoreService from "../services/FirestoreService";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import CustomCheckboxOption from "../components/checkbox/CustomCheckboxOption";
import CustomMultiValueLabel from "../components/checkbox/CustomMultiValueLabel";
import { useDispatch } from "react-redux";
import { updateOrderNumbers } from "../redux/orderSlice";
const NewOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    createdAt: new Date(),
    orderNumber: null,
    type: "Delivery",
  });

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemNames, setSelectedItemNames] = useState([]);
  const options = [
    {
      value: "Beef Stroganoff",
      label: "Beef Stroganoff",
      price: "20$",
      quantity: 1,
    },
    { value: "Salad", label: "Salad", price: "24$", quantity: 1 },
    { value: "Reuben", label: "Reuben", price: "28$", quantity: 1 },
    { value: "Sandwich", label: "Sandwich", price: "24$", quantity: 1 },
    {
      value: "Walldorf Salad",
      label: "Walldorf Salad",
      price: "25$",
      quantity: 1,
    },
    { value: "French Fries", label: "French Fries", price: "22$", quantity: 1 },
  ];
  const calculateTotalAmount = () => {
    let total = 0;
    selectedItems.forEach((item) => {
      total += parseInt(item.price.replace("$", "")) * item.quantity;
    });
    return total;
  };

  const getOrderNumber = async () => {
    const newOrderNum = await FirestoreService.getLastOrderNum();
    setFormData((prevData) => ({
      ...prevData,
      orderNumber: newOrderNum,
    }));
  };
  useEffect(() => {
    getOrderNumber();
  }, []);
  //###########
  const handleItemSelect = (selectedOptions) => {
    setSelectedItems(selectedOptions);

    const selectedNames = selectedOptions.map((option) => option.label);
    setSelectedItemNames(selectedNames);

    // Form data içinde seçilen öğeleri güncelle
    const updatedFormData = {
      ...formData,
      selectedItems: selectedOptions,
    };
    setFormData(updatedFormData);
  };

  const handleQuantityChange = (index, change) => {
    const updatedItems = [...selectedItems];

    // added array
    if (!updatedItems[index]) {
      updatedItems[index] = {
        ...options.find((option) => option.label === selectedItemNames[index]),
        quantity: 0,
      };
    }
    updatedItems[index].quantity += change;

    if (updatedItems[index].quantity <= 0) {
      updatedItems.splice(index, 1); // Remove the item with quantity
    }

    setSelectedItems(updatedItems);
    setSelectedItemNames(updatedItems.map((item) => item.label)); // Update the names
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAdd = async () => {
    // #########
    if (
      formData.name === undefined ||
      formData.contact === undefined ||
      formData.message === undefined ||
      formData.selectedItems.length === 0
    ) {
      alert("Please fill in all the blank fields. ");
      return;
    }
    try {
      const fs = new FirestoreService();
      formData.status = "accepted";
      formData.total = calculateTotalAmount();
      const isSuccessful = await fs.post(formData);
      if (isSuccessful) {
        alert("Sipariş başarıyla oluşturuldu");
        const statusCounts = await fs.getAllStatusCounts();
        dispatch(updateOrderNumbers(statusCounts));
        navigate("/accepted");
      } else {
        alert("Sipariş oluşturulamadı");
      }
    } catch (error) {
      console.error("Sipariş eklenirken hata oluştu: ", error);
    }
  };

  const handleCancel = () => {
    setFormData({
      createdAt: new Date(),
      orderNumber: null,
      type: "Delivery",
    });
    setSelectedItems([]);
    setSelectedItemNames([]);
    getOrderNumber();
  };

  const colourStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "white",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#f0f0f0" : "white",
      color: state.isSelected ? "white" : "black",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "white",
      color: "white",
    }),
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div style={{ width: "50%", padding: "20px" }}>
        <div className="flex-fill pr-3">
          <div className="d-flex align-items-center">
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
            <div className="custom-header">Create Order</div>
          </div>

          <div className="mt-4 custom-style">
            <span style={{ color: "black", marginRight: "50px" }}>
              Order Number :
            </span>
            <span style={{ color: "gray" }}>{formData.orderNumber}</span>
          </div>

          <div className="mt-4 custom-style">
            <span style={{ color: "black", marginRight: "70px" }}>
              {" "}
              Date&Time: :
            </span>
            <span style={{ color: "gray" }}>
              {formData.createdAt.toLocaleString()}
            </span>
          </div>

          <div className="d-flex flex-column ">
            <div className="mr-md-3 mb-3 mt-5">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label className="custom-style">Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </div>

            <div className="mr-md-3 mb-3">
              <Form.Group controlId="exampleForm.ControlInput2">
                <Form.Label className="custom-style">Contact</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Contact"
                  name="contact"
                  value={formData.contact || ""}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </div>
          </div>

          <Form.Group controlId="transType">
            <Form.Label style={{ fontSize: "23px" }}>Trans Type</Form.Label>
            <Form className="mb-3 fw-normal" onChange={handleInputChange}>
              {["Delivery", "Takeaway"].map((label, index) => (
                <Form.Check
                  inline
                  label={label}
                  name="type"
                  type="radio"
                  id={`inline-radio-${index}`}
                  key={`inline-radio-${index}`}
                  value={label}
                  checked={formData.type === label}
                  style={{ marginRight: "80px", fontWeight: "440" }}
                />
              ))}
            </Form>
          </Form.Group>

          <Form.Label className="custom-style mt-3">
            Message to Client
          </Form.Label>
          <FloatingLabel controlId="floatingTextarea2" label="Comments">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
              name="message"
              value={formData.message || ""}
              onChange={handleInputChange}
            />
          </FloatingLabel>

          <Form.Label className="custom-style mt-4">Order Items</Form.Label>
          <div className="card flex justify-content-center">
            <Select
              options={options}
              isMulti
              styles={colourStyles}
              closeMenuOnSelect={false}
              placeholder="Select ıtems"
              components={{
                Option: CustomCheckboxOption,
                MultiValueLabel: CustomMultiValueLabel,
              }}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: "lightblue",
                },
              })}
              onChange={handleItemSelect}
              value={selectedItems}
            />
            <ul>
              {selectedItemNames.map((item, index) => (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      flex: "1",
                      fontFamily: "SF Pro Display",
                      fontSize: "18px",
                      fontWeight: 400,
                      marginRight: "15px",
                    }}
                  >
                    {item}
                  </div>
                  <div
                    style={{
                      fontFamily: "SF Pro Display",
                      fontSize: "18px",
                      fontWeight: 400,
                      marginRight: "15px",
                      marginTop: "5px",
                    }}
                  >
                    {selectedItems[index] && selectedItems[index].price}
                  </div>
                  <span
                    style={{
                      border: "2px solid #0B69FF",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "5px",
                      padding: "1px 8px",
                      marginRight: "15px",
                      marginTop: "5px",
                      height: "25px",
                    }}
                  >
                    <button
                      className="btn btn-sm"
                      onClick={() => handleQuantityChange(index, -1)}
                      style={{ marginRight: "2px", padding: "0" }}
                    >
                      -
                    </button>
                    <span
                      className="mx-1"
                      style={{
                        fontFamily: "SF Pro Display",
                        fontSize: "18px",
                        fontWeight: 400,
                        lineHeight: "21px",
                        letterSpacing: "0.05em",
                        textAlign: "left",
                      }}
                    >
                      {selectedItems[index]?.quantity || 0}
                    </span>
                    <button
                      className="btn btn-sm"
                      onClick={() => handleQuantityChange(index, 1)}
                      style={{
                        marginLeft: "2px",
                        marginRight: "0",
                        padding: "0",
                      }}
                    >
                      +
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="d-1" id="create-right">
        <div className="delivery">
          <h4 className="custom-s1 fw-bold">Delivery Details</h4>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
              marginTop: "30px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Form.Label style={{ color: "gray" }}>Order Items</Form.Label>
              {selectedItems.map((item, index) => (
                <span key={index} style={{ color: "black" }}>
                  {item.label}
                </span>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "gray",
              }}
            >
              <Form.Label style={{ color: "gray" }}>Number</Form.Label>
              {selectedItems.map((item, index) => (
                <span key={index} style={{ color: "black" }}>
                  {item.quantity}
                </span>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "gray",
              }}
            >
              <Form.Label style={{ color: "gray" }}>Cost</Form.Label>
              {selectedItems.map((item, index) => (
                <span key={index} style={{ color: "black" }}>
                  {(
                    parseInt(item.price.replace("$", "")) * item.quantity
                  ).toFixed(2)}
                  $
                </span>
              ))}
            </div>
          </div>

          <div></div>
        </div>

        <div
          className="totalamount1"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <h5 className="custom-s2">Total Amount:</h5>
          <h5 className="custom-s2">{calculateTotalAmount()}$</h5>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: "10px",
            marginRight: "35px",
          }}
        >
          {formData.name === undefined ||
          formData.contact === undefined ||
          formData.message === undefined ||
          selectedItems.length === 0 ? (
            <>
              <button
                type="button"
                style={{
                  border: "none",
                  width: "50%",
                  background: "#2A71FA",
                  color: "white",
                }}
                className="btn btn-success btn-lg"
                onClick={handleAdd}
              >
                Add Order
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg me-2 text-secondary"
                style={{
                  width: "50%",
                  background: "transparent",
                  borderColor: "#6c757d",
                  color: "#6c757d",
                }}
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                type="button"
                style={{ background: "#0DC74E", border: "none", width: "50%" }}
                className="btn btn-success btn-lg"
                onClick={handleAdd}
              >
                Add Order
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewOrderPage;
