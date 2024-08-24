import React, { useState } from "react";
import "./input.css";
import {Link} from "react-router-dom"

const input = () => {
  const [location, setLocation] = useState("");

  return (
    <div>
      <form
        action=""
        className="d-flex gap-1  align-items-center justify-content-center flex-row "
      >
        <input
          type="text"
          name="location"
          onChange={(e) => setLocation(e.target.value)}
          className="inputBox box-shadow"
          placeholder="Search job by location..."
          list="locations"
        />
        <datalist id="locations">
          <option value="Chennai">Chennai</option>
          <option value="Coimbatore">Coimbatore</option>
          <option value="Madurai">Madurai</option>
          <option value="Tiruchirappalli">Tiruchirappalli</option>
          <option value="Salem">Salem</option>
          <option value="Erode">Erode</option>
          <option value="Tirunelveli">Tirunelveli</option>
          <option value="Vellore">Vellore</option>
          <option value="Thoothukudi">Thoothukudi</option>
          <option value="Dindigul">Dindigul</option>
          <option value="Thanjavur">Thanjavur</option>
          <option value="Nagercoil">Nagercoil</option>
          <option value="Karur">Karur</option>
          <option value="Kanchipuram">Kanchipuram</option>
          <option value="Cuddalore">Cuddalore</option>
          <option value="Hosur">Hosur</option>
          <option value="Tiruppur">Tiruppur</option>
          <option value="Rajapalayam">Rajapalayam</option>
          <option value="Sivakasi">Sivakasi</option>
          <option value="Udhagamandalam">Udhagamandalam (Ooty)</option>
          <option value="Pudukkottai">Pudukkottai</option>
          <option value="Nagapattinam">Nagapattinam</option>
          <option value="Ramanathapuram">Ramanathapuram</option>
          <option value="Virudhunagar">Virudhunagar</option>
          <option value="Ariyalur">Ariyalur</option>
          <option value="Perambalur">Perambalur</option>
          <option value="Krishnagiri">Krishnagiri</option>
          <option value="Theni">Theni</option>
          <option value="Namakkal">Namakkal</option>
          <option value="Kumbakonam">Kumbakonam</option>
          <option value="Pollachi">Pollachi</option>
          <option value="Thiruvannamalai">Thiruvannamalai</option>
          <option value="Tiruvallur">Tiruvallur</option>
          <option value="Dharmapuri">Dharmapuri</option>
          <option value="Kovilpatti">Kovilpatti</option>
          <option value="Palani">Palani</option>
          <option value="Pattukkottai">Pattukkottai</option>
          <option value="Ambur">Ambur</option>
          <option value="Gudiyatham">Gudiyatham</option>
          <option value="Arakkonam">Arakkonam</option>
          <option value="Mettur">Mettur</option>
          <option value="Arani">Arani</option>
          <option value="Karaikudi">Karaikudi</option>
          <option value="Kallakurichi">Kallakurichi</option>
          <option value="Chidambaram">Chidambaram</option>
          <option value="Mayiladuthurai">Mayiladuthurai</option>
          <option value="Puducherry">Puducherry</option>
          <option value="Tiruppathur">Tiruppathur</option>
          <option value="Tindivanam">Tindivanam</option>
          <option value="Sivaganga">Sivaganga</option>
          <option value="Pattukkottai">Pattukkottai</option>
          <option value="Viluppuram">Viluppuram</option>
          <option value="Manapparai">Manapparai</option>
          <option value="Aranthangi">Aranthangi</option>
          <option value="Vaniyambadi">Vaniyambadi</option>
          <option value="Tiruchengode">Tiruchengode</option>
          <option value="Mettupalayam">Mettupalayam</option>
          <option value="Paramakudi">Paramakudi</option>
          <option value="Tenkasi">Tenkasi</option>
          <option value="Neyveli">Neyveli</option>
          <option value="Karaikal">Karaikal</option>
          <option value="Velankanni">Velankanni</option>
          <option value="Avadi">Avadi</option>
          <option value="Tambaram">Tambaram</option>
          <option value="Pallavaram">Pallavaram</option>
          <option value="Chrompet">Chrompet</option>
          <option value="Velachery">Velachery</option>
          <option value="Adyar">Adyar</option>
          <option value="Anna Nagar">Anna Nagar</option>
          <option value="Tirumangalam">Tirumangalam</option>
          <option value="Meenambakkam">Meenambakkam</option>
          <option value="Sriperumbudur">Sriperumbudur</option>
          <option value="Poonamallee">Poonamallee</option>
          <option value="Thiruvarur">Thiruvarur</option>
          <option value="Mannargudi">Mannargudi</option>
          <option value="Chengalpattu">Chengalpattu</option>
          <option value="Madurantakam">Madurantakam</option>
          <option value="Melmaruvathur">Melmaruvathur</option>
          <option value="Mamallapuram">Mamallapuram</option>
          <option value="Sirkazhi">Sirkazhi</option>
          <option value="Cheyyar">Cheyyar</option>
          <option value="Cheyyur">Cheyyur</option>
        </datalist>
        <Link
          to={`\list?location=${location}&date=${""}&maxWorkingDays=${""}&minSalary=${""}&limit=${"5"}`}
          className="link"
        >
          <button className="searchButton">
            <span className="span mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </span>
          </button>
        </Link>
      </form>
    </div>
  );
};

export default input;
