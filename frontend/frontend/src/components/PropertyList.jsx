import useFetch from "../hooks/useFetch";
// import "./propertyList.css";
import "../components/stylesheet/propertyList.css";

const PropertyList = () => {
  const {data, loading, error} = useFetch("/hotels/countByType");
  console.log(data)

  const images = [
    "https://www.welcome-hotels.com/site/assets/files/35059/welcome_hotel_marburg_lobby_2k.2560x1600.jpg",
    "https://www.prestigeserenityshore.in/images/prestige/advantages-of-investing-in-premium-residential-apartments.webp",
    "https://www.beaches.com/blog/content/images/2021/03/Beaches-Turks-Caicos-Overview.jpg",
    "https://www.shernaproperties.com/wp-content/uploads/2023/05/luxury-villa.jpg",
    "https://i.pinimg.com/originals/fe/cc/83/fecc83ebe360dcf44233210ebf29f958.jpg",
  ];
  return (
    <div className="pList">
      {loading ? ( 
        "loading"
        ) : ( 
        <>
        {data && images.map((img, i) => (

          <div className="pListItem" key={i}>
          <img
            src={img}
            alt=""
            className="pListImg"
          />
          <div className="pListTitles">
            <h1>{data[i]?.type}</h1>     {/*just to make data array not to be empty */}
            <h2>{data[i]?.count} {data[i]?.type}</h2>
          </div>
        </div>
      ))}
      </>
      )}
    </div>
  );
};

export default PropertyList;
