import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import NewOrderPage from "./Pages/NewOrderPage";
import AcceptedPage from "./Pages/AcceptedPage";
import CookingPage from "./Pages/CookingPage";
import ParcelReadyPage from "./Pages/ParcelReadyPage";
import DeliveredPage from "./Pages/DeliveredPage";
import CompletedPage from "./Pages/CompletedPage";
import LeftSidebar from "./components/sidebar/LeftSidebar/LeftSidebar";
import Sidebar from "./components/sidebar/OrdersSidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="flex-container">
          <div className="flex-item" style={{ position: "fixed" }}>
            <LeftSidebar />
          </div>
          <div className="flex-item sidebar-container" style={{ position: "fixed", marginLeft: "85px" }}>
            <Sidebar />
          </div>
          <div className="flex-item content-container" style={{ marginLeft: "360px" }}>
            <Routes>
              <Route path="/" element={<AcceptedPage />} />
              <Route path="/neworder" element={<NewOrderPage />} />
              <Route path="/accepted" element={<AcceptedPage />} />
              <Route path="/cooking" element={<CookingPage />} />
              <Route path="/parcelready" element={<ParcelReadyPage />} />
              <Route path="/delivered" element={<DeliveredPage />} />
              <Route path="/completed" element={<CompletedPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
