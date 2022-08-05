import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateOrUpdatePage from "./pages/CreateOrUpdatePage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createorupdate" element={<CreateOrUpdatePage />} />
        <Route path="/createorupdate/:id" element={<CreateOrUpdatePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
