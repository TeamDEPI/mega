import { Outlet } from "react-router-dom";
import Nav from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";

function PublicLayout() {
  return (
    <>
      {/* <Nav /> */}
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default PublicLayout;
