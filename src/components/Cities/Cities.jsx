import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect, useRef } from "react";
import RenderTable from "../Table/RenderTable";
import "./Cities.css";

const getAxiosRequestOptions = (limit = 5) => {
  const options = {
    method: "GET",
    url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
    params: { countryIds: "IN", namePrefix: "del", limit },
    headers: {
      "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
      "x-rapidapi-key": "4ac5e3352fmshe6ac515ca3b8ccap1f0045jsnf0a504a87bbe",
    },
  };
  return options;
};

export const Cities = () => {
  const [cityResponse, setCityResponse] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [pages, setPages] = useState(0);
  const [filteredCities, setFilteredCities] = useState([]);
  const [limit, setLimit] = useState("");
  const [cityName, setCityName] = useState("");
  const [loading, setLoading] = useState(true);
  const searchBoxRef = useRef("");

  useEffect(() => {
    document.onkeyup = (e) => {
      if (e.ctrlKey && e.key === "/") {
        searchBoxRef.current.focus();
      }
    };

    (async () => {
      const result = await axios.request(getAxiosRequestOptions());
      const cities = result.data.data;
      const pages = Math.ceil(cities.length / itemsPerPage);
      setCityResponse(cities);
      setFilteredCities(cities);
      setPages(pages);
      setLoading(false);
    })();
  }, []);

  const handleOnChange = (event) => {
    const { value } = event.target;
    setCityName(value);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    if (cityName.length) {
      const filterdCities = cityResponse.filter(
        (item) => item.city.toLowerCase() === cityName.toLowerCase()
      );
      setFilteredCities(filterdCities);
    } else {
      setFilteredCities(cityResponse);
    }
  };

  const handleLimitChange = (event) => {
    const { value } = event.target;
    setLimit(value);
  };

  const handleFetchCities = async () => {
    if (limit > 10) {
      alert("Cant fetch more than 10");
    } else {
      const result = await axios.request(getAxiosRequestOptions(limit));
      const cities = result.data.data;
      setCityResponse(cities);
      setFilteredCities(cities);
      setPages(Math.ceil(cities.length / itemsPerPage));
    }
  };

  const paginator = (page) => {
    const temp = [...cityResponse];
    const items = temp.splice(page * itemsPerPage, itemsPerPage);
    setFilteredCities(items);
  };

  const getPages = () => {
    const buttons = [];
    for (let i = 0; i < pages; i++) {
      buttons.push({
        pageId: i,
      });
    }
    return buttons;
  };

  return (
    <div className="container">
      <div>
        <form onSubmit={handleOnSubmit}>
          <input
            className="search-box"
            ref={searchBoxRef}
            type="text"
            placeholder="Search places..."
            onChange={handleOnChange}
            name="search"
            value={cityName}
          />
          <span className="search-shortcut">ctrl + /</span>
          <button type="submit" className="search">
            Search
          </button>
        </form>
      </div>

      <div>
        {loading ? (
          "Loading...."
        ) : (
          <RenderTable cityResponse={filteredCities} />
        )}
      </div>

      <div>
        {getPages().map((pageItem) => (
          <button
            onClick={() => paginator(pageItem.pageId)}
            key={pageItem.pageId}
          >
            {pageItem.pageId + 1}
          </button>
        ))}
      </div>

      <div className="fetch-cities-container">
        <div className="fetch-cities">
          <input type="number" onChange={handleLimitChange} value={limit} />
          <button type="submit" onClick={handleFetchCities}>
            Fetch Cities
          </button>
        </div>
      </div>
    </div>
  );
};
