import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
import User from './routes/user.js'
import Home from './routes/home.js'

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<User />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);