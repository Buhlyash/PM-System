import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import SideBar from "./components/SideBar";
import LoginRegisterScreen from "./screens/LoginRegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import MainScreen from "./screens/MainScreen";
import { useSelector } from "react-redux";

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <div style={{ display: "flex", height: "100%", minHeight: "400px" }}>
      <Router>
        {userInfo && <SideBar />}
        <div style={{ flex: "1" }}>
              <Routes>
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/" element={<LoginRegisterScreen />} />
                <Route path="/projects/:id" element={<HomeScreen userInfo={userInfo}/>} />
                <Route path="/main" element={<MainScreen />} />
              </Routes>
          {userInfo && <Footer />}
        </div>
      </Router>
    </div>
  );
}

export default App;
