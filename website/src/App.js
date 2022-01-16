import logo from './logo.svg';
import './App.css';
import { Outlet, Link } from "react-router-dom";
import nav from './routes/nav'
import footer from './routes/footer'
function App() {
  return (
    <div>
    {nav()}
    <Outlet />
    {footer()}
    </div>
  );
}

export default App;
