import Footer from "../components/Footer";
import Header from "../components/Header";
import DoctorCards from "../components/landing/DoctorCards";
import Hero from "../components/landing/Hero";
import OurServices from "../components/landing/OurServices";
import RecentPosts from "../components/landing/RecentPosts";
import Statistics from "../components/landing/Statistics";

function Landing() {
  return (
    <div>
      {/* <Header /> */}
      <Hero />
      <div className="h-36"></div>
      <Statistics />
      <div className="h-36"></div>
      <OurServices />
      <div className="h-36"></div>
      {/* <RecentPosts /> */}
      <DoctorCards />
      <div className="h-36"></div>
    </div>
  );
}
export default Landing;
