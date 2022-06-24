import Navbar from "../components/navbar";
import Thread from "../components/thread";

const Home = () => {
  return (
    <div className="container flex flex-row">
      <Navbar />
      <Thread />
    </div>
  );
};

export default Home;
