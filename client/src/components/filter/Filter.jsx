import React, { useEffect, useState, useCallback } from "react";
import "./filter.css";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import rollingLoading from "../../assets/rollingLoading.svg";

const Filter = ({ query, setQuery }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSearchParams(query);
  }, [setSearchParams, query]);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setQuery((prevQuery) => ({
        ...prevQuery,
        [name]: value.trim(),
      }));
    },
    [setQuery]
  );

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      setLoading(true);
      setSearchParams(query);
      setLoading(false);
    },
    [query, setSearchParams]
  );

  const resetDate = useCallback(() => {
    setQuery((prevQuery) => ({ ...prevQuery, date: "" }));
    toast.success("Date has been reset!", {
      id: "reset date",
    });
  }, [setQuery]);

  console.log(query);

  return (
    <div className="">
      <p className="">
        <a
          className="btn btn-primary"
          data-bs-toggle="collapse"
          href="#filter"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-funnel"
            viewBox="0 0 16 16"
          >
            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
          </svg>{" "}
          Show filters
        </a>
        <div className=" d-flex align-items-center">
          <div className="me-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-search mt-1"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </div> 
          <div className=" w-100">
            <input
              type="text"
              name="location"
              onChange={handleChange}
              className="inputBox fs-5 box-shadow mt-2"
              placeholder="Search job by city or location..."
              list="locations"
              defaultValue={query.location}
            />
          </div>
        </div>
      </p>
      <div className="collapse text-dark bg-white p-2 pt-0 rounded" id="filter">
        <div className="row mb-3">
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

          <div className="col-12">
            <label htmlFor="minSalaryRange">
              Min Salary: {query.minSalary}
            </label>
            <input
              onChange={handleChange}
              type="range"
              className="form-range shadow-none"
              id="minSalaryRange"
              name="minSalary"
              min="0"
              max="10000"
              step="100"
              defaultValue={query.minSalary}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 mb-2 col-md-6">
            <label htmlFor="" className="">
              Max duty days
            </label>
            <div className="input-group">
              <input
                onChange={handleChange}
                min={0}
                type="number"
                className="form-control shadow-none"
                aria-label="Max duty days"
                name="maxWorkingDays"
                defaultValue={query.maxWorkingDays}
              />
              <span className="input-group-text">Days</span>
            </div>
          </div>
          <div className="col-6 col-md-4">
            <label htmlFor="" className="">
              Date
            </label>
            <div className="input-group">
              <input
                onChange={handleChange}
                min={0}
                name="date"
                type="date"
                className="form-control shadow-none"
                aria-label="Date"
                value={query.date}
              />
              <button
                className="btn btn-secondary"
                type="button"
                onClick={resetDate}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-clockwise"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
                  />
                  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                </svg>
              </button>
            </div>
          </div>
          <div className="col-6 col-md-2 d-flex justify-content-center align-items-center">
            <button
              disabled={loading}
              className="btn btn-primary w-100 mt-4"
              onClick={handleSearch}
            >
              {loading && (
                <span className="loading-indicator">
                  <img src={rollingLoading} alt="loading" />
                </span>
              )}
              Apply
            </button>
          </div>
        </div>
      </div>
      <p className="fs-5 mt-0">
        Showing results for{" "}
        <span className="text-uppercase">
          {searchParams.get("location")
            ? searchParams.get("location")
            : "TAMIL NADU"}
        </span>
      </p>
    </div>
  );
};

export default Filter;
