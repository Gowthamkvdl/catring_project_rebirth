import React, { Suspense, useState } from "react";
import InfoProfileCard from "../../components/infoProfileCard/InfoProfileCard";
import { useLoaderData } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { Await } from "react-router-dom";
import NoData from "../../components/noData/NoData";

const ServersProfiles = () => {
  const servers = useLoaderData();

  // State for input fields (filters)
  const [nameFilter, setNameFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [addressFilter, setAddressFilter] = useState("");
  const [averageRatingFilter, setAverageRatingFilter] = useState("");
  const [phoneFilter, setPhoneFilter] = useState("");

  const handleServerResponse = (serverResponse) => {
    const serverData = serverResponse.data;

    // Filter based on inputs, if filters are provided
    const filteredData = serverData.filter((item) => {
      const matchName =
        nameFilter === "" ||
        item.name.toLowerCase().includes(nameFilter.toLowerCase());
      const matchCity =
        cityFilter === "" ||
        item.city.toLowerCase().includes(cityFilter.toLowerCase());
      const matchAddress =
        addressFilter === "" ||
        item.address?.toLowerCase().includes(addressFilter.toLowerCase());
      const matchRating =
        averageRatingFilter === "" ||
        item.averageRating >= parseFloat(averageRatingFilter);
      const matchPhone = phoneFilter === "" || item.phone.includes(phoneFilter);

      // Return true if all filters match
      return (
        matchName && matchCity && matchAddress && matchRating && matchPhone
      );
    });

    if (filteredData.length > 0) {
      return filteredData.map((item) => (
        <InfoProfileCard user={item} key={item.id} />
      ));
    } else {
      return (
        <div>
          <NoData text={"No servers found"} />
        </div>
      );
    }
  };

  return (
    <div>
      <button
        className="btn btn-primary mb-3"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseExample"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        Show Filters
      </button>
      <div className="collapse" id="collapseExample">
        {/* Input fields for filtering */}
        <div className="filter-inputs">
          <input
            className="form-control shadow-none mb-2"
            type="text"
            placeholder="Name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
          <input
            className="form-control shadow-none mb-2"
            type="text"
            placeholder="City"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
          />
          <input
            className="form-control shadow-none mb-2"
            type="text"
            placeholder="Address"
            value={addressFilter}
            onChange={(e) => setAddressFilter(e.target.value)}
          />
          <input
            className="form-control shadow-none mb-2"
            type="number"
            placeholder="Average Rating"
            value={averageRatingFilter}
            onChange={(e) => setAverageRatingFilter(e.target.value)}
          />
          <input
            className="form-control shadow-none mb-4"
            type="text"
            placeholder="Phone Number"
            value={phoneFilter}
            onChange={(e) => setPhoneFilter(e.target.value)}
          />
        </div>
      </div>

      <Suspense fallback={<Loader />}>
        <Await
          resolve={servers.response}
          errorElement={
            <div className="text-center">Something went wrong!</div>
          }
        >
          {handleServerResponse}
        </Await>
      </Suspense>
    </div>
  );
};

export default ServersProfiles;
