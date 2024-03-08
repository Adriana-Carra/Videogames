import "./home.style.css";
import Navbar from './../../components/navbar/navbar';
import Cards from "../../components/cards/cards";

function Home() {
  return (
    <div>
      <Navbar className="navBar-style" />
      <div className="cards-List">
        <Cards />
      </div>
    </div>
  );
}

export default Home;
