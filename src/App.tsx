import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Login, Search, Success } from "./screens";
import "./App.css";
import { Layout } from "./screens/Layout/Layout";
import { ComplaintsList } from "./components/organisms/ComplaintsList";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/complaints" element={<ComplaintsList />} />
          <Route path="/success" element={<Success />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
