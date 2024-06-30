import Featured from "../components/Featured";
import Header from "../components/Header";
import MailList from "../components/MailList";
import Navbar from "../components/Navbar";
import PropertyList from "../components/PropertyList";
// import "./home.css";
import "../pages/stylesheet/home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header/>
      <div className="homeContainer">
        <Featured/>
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList/>
        {/* <h1 className="homeTitle">Homes guests love</h1> */}
        {/* <FeaturedProperties/> */}
        <MailList/>
      </div>
    </div>
  );
};

export default Home;
