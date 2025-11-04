// src/TourList.jsx
import Tour from "./Tour";

const TourList = (props) => {
  const { tours } = props;

  return (
    <section>
      <div className="title">
        <h2>our tours</h2>
        <div className="underline"></div>
      </div>
      <div>
        {/* Render each tour card */}
        {tours.map((tour) => (
          <Tour key={tour.id} tour={tour} />
        ))}
      </div>
    </section>
  );
};

export default TourList;
