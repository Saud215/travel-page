import { useCallback, useEffect, useState } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
import data from "./data";
const url = "https://course-api.com/react-tours-project";

const App = () => {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const removeTour = useCallback(
    (id) => {
      const newTours = tours.filter((tour) => {
        return tour.id != id;
      });
      setTours(newTours);
    },
    [tours]
  );
  const fetchTours = () => {
    setIsLoading(true);
    try {
      setTimeout(() => {
        console.log(data);
        setTours(data);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTours();
  }, []);

  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (tours.length < 1) {
    return (
      <main>
        <div className="title">
          <h2>No Tours left</h2>
          <button
            type="button"
            className="btn"
            style={{ marginTop: "1.5rem" }}
            onClick={fetchTours}
          >
            Refresh All
          </button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
};
export default App;
