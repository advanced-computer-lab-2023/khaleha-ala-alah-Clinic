import PackageCard from "./packageCard";
import "./packageCard.css"; // Assuming you have a CSS file for styling

const PackagesPage = () => {
  return (
    <div className="App">
      <PackageCard
        name="GOLD"
        details={[
          { label: "Medical Discount", value: `${0.3 * 100}%` },
          { label: "Doctor's Discount", value: `${0.4 * 100}%` },
          { label: "Family Discount", value: `${0.1 * 100}%` },
          { label: "Price", value: `${1000}` },
        ]}
        //price={`$${price}`}
        buttonsDetails={[
          {
            text: "Subscribe",
            onClick: () => console.log("Subscribed to GOLD"),
          },
          {
            text: "Learn More",
            onClick: () => console.log("Learn more about GOLD"),
          },
          // ... other buttons if needed
        ]}
      />{" "}
      <PackageCard
        name="GOLD"
        details={[
          { label: "Medical Discount", value: `${0.3 * 100}%` },
          { label: "Doctor's Discount", value: `${0.4 * 100}%` },
          { label: "Family Discount", value: `${0.1 * 100}%` },
          { label: "Price", value: `${1000}` },
        ]}
        //price={`$${price}`}
        buttonsDetails={[
          {
            text: "Subscribe",
            onClick: () => console.log("Subscribed to GOLD"),
          },
          {
            text: "Learn More",
            onClick: () => console.log("Learn more about GOLD"),
          },
          // ... other buttons if needed
        ]}
      />{" "}
      <PackageCard
        name="GOLD"
        details={[
          { label: "Medical Discount", value: `${0.3 * 100}%` },
          { label: "Doctor's Discount", value: `${0.4 * 100}%` },
          { label: "Family Discount", value: `${0.1 * 100}%` },
          { label: "Price", value: `${1000}` },
        ]}
        //price={`$${price}`}
        buttonsDetails={[
          {
            text: "Subscribe",
            onClick: () => console.log("Subscribed to GOLD"),
          },
          {
            text: "Learn More",
            onClick: () => console.log("Learn more about GOLD"),
          },
          // ... other buttons if needed
        ]}
      />{" "}
      <PackageCard
        name="GOLD"
        details={[
          { label: "Medical Discount", value: `${0.3 * 100}%` },
          { label: "Doctor's Discount", value: `${0.4 * 100}%` },
          { label: "Family Discount", value: `${0.1 * 100}%` },
          { label: "Price", value: `${1000}` },
        ]}
        //price={`$${price}`}
        buttonsDetails={[
          {
            text: "Subscribe",
            onClick: () => console.log("Subscribed to GOLD"),
          },
          {
            text: "Learn More",
            onClick: () => console.log("Learn more about GOLD"),
          },
          // ... other buttons if needed
        ]}
      />{" "}
      <PackageCard
        name="GOLD"
        details={[
          { label: "No Discount", value: `${0.3 * 100}%` },
          { label: "Doctor's Discount", value: `${0.4 * 100}%` },
          { label: "Family Discount", value: `${0.1 * 100}%` },
          { label: "Price", value: `${1000}` },
        ]}
        //price={`$${price}`}
        buttonsDetails={[
          {
            text: "Subscribe",
            onClick: () => console.log("Subscribed to GOLD"),
          },
          // ... other buttons if needed
        ]}
      />
    </div>
  );
};

export default PackagesPage;
