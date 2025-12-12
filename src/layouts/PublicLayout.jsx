import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function PublicLayout() {
  return (
    <>
      <Header />
      <main className="md:mt-[60px] sm:mt-[70px] ">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default PublicLayout;
