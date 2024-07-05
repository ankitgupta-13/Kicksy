import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchSellerOffers } from "../../../../../api/seller.api";
import { ProductCard } from "../../../../../components";

const OfferProduct = () => {
  const [offers, setOffers] = useState([]);

  const user = useSelector((state) => state.auth?.userData);

  useEffect(() => {
    const fetchOffers = async () => {
      const response = await fetchSellerOffers({ sellerID: user._id });
      setOffers(response.data);
      console.log(response.data);
    };
    fetchOffers();
  }, []);

  return (
    <div>
      {offers.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
            gap: "1rem",
            padding: "1.5rem",
          }}
        >
          {offers.map((offer) => {
            return (
              <div
                key={offer._id}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <ProductCard product={offer.productID} wid={"20rem"} />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "20rem",
                    padding: "1rem",
                    backgroundColor: "#000",
                    color: "white",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                    }}
                  >
                    Your offer
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    Price:{" "}
                    <span style={{ fontWeight: 600 }}>
                      ₹ {offer.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    Quantity:{" "}
                    <span style={{ fontWeight: 600 }}>{offer.quantity}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <h1>No offers yet</h1>
        </div>
      )}
    </div>
  );
};

export default OfferProduct;
