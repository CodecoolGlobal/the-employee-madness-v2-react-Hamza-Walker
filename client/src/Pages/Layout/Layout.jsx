import { Outlet, Link } from "react-router-dom";

import "./Layout.css";

const Layout = () => (
  <div className="Layout">
    <nav>
      <ul>
        <li className="grow">
          <Link to="/">Employees</Link>
        </li>
        <li>
          <Link to="/create">
            <button type="button">Create Employee</button>
          </Link>
        </li>
        <li>
          <Link to="/years-of-experience/0">
            <button type="button">Filter Employee By Experience</button>
          </Link>
        </li>
      </ul>
    </nav>
    <Outlet />
  </div>
);

export default Layout;
