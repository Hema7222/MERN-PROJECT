import useFetch from "../hooks/useFetch";
// import "./featured.css";
import "../components/stylesheet/featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch("localhost:4001/api/hotels/countByCity?cities=coimbatore,bengaluru,madurai,chennai");
  // console.log("data :"+data);
  return (
    <div className="featured">
      {loading ? ( "Loading please wait" ) : ( <><div className="featuredItem">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/3/32/Chennai_Central.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Chennai</h1>
          <h2>256 properties</h2>
        </div>
      </div>
      
      <div className="featuredItem">
        <img
          src="https://static.thehosteller.com/blogimage/industrial%20HUb-1690276221167.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Bengaluru</h1>
          <h2>137 properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://travelsetu.com/apps/uploads/new_destinations_photos/destination/2023/12/21/47aa9c123e0ef32b24341a3352882ca0_1000x1000.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Coimbatore</h1>
          <h2>176 properties</h2>
        </div>
      </div>
      </>
    )}
    </div>
  );
};

export default Featured;
