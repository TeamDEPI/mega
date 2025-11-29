import { Outlet } from "react-router-dom";
import Nav from "../components/Navbar";
import Header from "../components/Header";

function PublicLayout() {
  return (
    <>
      {/* <Nav /> */}
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default PublicLayout;
