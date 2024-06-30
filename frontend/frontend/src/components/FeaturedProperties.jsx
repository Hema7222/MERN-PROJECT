import useFetch from "../hooks/useFetch";
// import "./featuredProperties.css";
import "../components/stylesheet/featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true")
  return (
    <div className="fp">
      {loading ? "Loading" : <>
      
        {data.map(item => (

         <div className="fpItem" key={item._id}>
          <img
            src="https://assets.traveltriangle.com/blog/wp-content/uploads/2017/08/Poolside-restaurant-The-Residency-Coimbatore-An-evening-shot-of-the-poolside-restaurant-at-The-Residency-Hotel.jpg?tr=w-400"
            alt=""
            className="fpImg"
          />
          <span className="fpName">{item.name}</span>
          <span className="fpCity">{item.city}</span>
          <span className="fpPrice">Starting from ₹{item.cheapestPrice}</span>
          {item.rating && <div className="fpRating">
            <button>{item.rating}</button>
            <span>Excellent</span>
          </div>}
        </div> 
        ))}
        </>
        }
    </div>
  );
};

export default FeaturedProperties;
