import Header from "./Header";
import Sidebar from "./Sidebar";
import Subheader from "./Subheader";

const Layout = ({ children }) => {
  return (
    <div className="main-content">
      <Sidebar />
      <Header />
      <Subheader />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
