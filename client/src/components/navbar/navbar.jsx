
import "./navbar.style.css";
//import { NavLink } from 'react-router-dom';
//import Searchbar from './../searchbar/searchbar.component';

function Navbar ({handleChange}, {handleSubmit}) {
  
  return (
    <div className="navBar-style">
      <form onChange={handleChange}>
        <input placeholder="Search..." type="search" />
        <button type="submit" onClick={handleSubmit}>Search</button>
      </form>
    </div>
  );
}

export default Navbar;