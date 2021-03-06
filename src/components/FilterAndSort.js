import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import { Slider } from "@material-ui/core";

const FilterAndSort = ({
  allCranes,
  setAllCranes,
  setSortFunction,
  setFilterValue,
  setSortType,
}) => {
  const [sortCranes, setSortCranes] = useState(false);
  const [filterCranes, setFilterCranes] = useState(false);
  const [showSortButton, setShowSortButton] = useState(true);
  const [showFilterButton, setShowFilterButton] = useState(true);
  const [craneRateRange, setCraneRateRange] = useState([0, 10]);
  const [backgroundRateRange, setBackgroundRateRange] = useState([0, 10]);

  //Sort functionality

  const handleSortCranes = () => {
    setSortCranes(true);
    setShowSortButton(false);
  };

  const handleHideSortCranes = () => {
    setSortCranes(false);
    setShowSortButton(true);
  };

  const handleFilterCranes = () => {
    setFilterCranes(true);
    setShowFilterButton(false);
  };

  const handleHideFilterCranes = () => {
    setFilterCranes(false);
    setShowFilterButton(true);
  };

  const handleRatesSlider = () => {
    handleFilter({
      bottomRate: craneRateRange[0],
      topRate: craneRateRange[1],
      bottomRateCrane: backgroundRateRange[0],
      topRateCrane: backgroundRateRange[1],
    });
  };

  const handleRemoveFilters = () => {
    handleFilter({
      bottomRate: 0,
      topRate: 10,
      bottomRateCrane: 0,
      topRateCrane: 10,
    });
    setCraneRateRange([0, 10]);
    setBackgroundRateRange([0, 10]);
  };

  const handleFilter = (filterValue) => {
    const fetchData = async () => {
      await axios
        .get("https://test-crane.herokuapp.com/AllRatings", {
          params: filterValue,
        })
        .then(({ data }) => {
          setAllCranes(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  };

  return (
    <div className="filter-sort">
      {showSortButton && <button onClick={handleSortCranes}>SORT</button>}
      {sortCranes && <button onClick={handleHideSortCranes}>CLOSE</button>}
      {showFilterButton && <button onClick={handleFilterCranes}>FILTER</button>}
      {filterCranes && <button onClick={handleHideFilterCranes}>CLOSE</button>}

      {sortCranes && (
        <ul>
          <li>
            <Link
              className="links"
              onClick={() => (setSortFunction("craneRate"), setSortType(-1))}
            >
              <strong>Crane Rate:</strong> Descending
            </Link>
          </li>
          <li>
            <Link
              className="links"
              onClick={() => (setSortFunction("craneRate"), setSortType(1))}
            >
              <strong>Crane Rate:</strong> Ascending
            </Link>
          </li>
          <li>
            <Link
              className="links"
              onClick={() => (
                setSortFunction("craneBackgroundRate"), setSortType(-1)
              )}
            >
              <strong>Location Rate:</strong> Descending
            </Link>
          </li>
          <li>
            <Link
              className="links"
              onClick={() => (
                setSortFunction("craneBackgroundRate"), setSortType(1)
              )}
            >
              <strong>Location Rate:</strong> Ascending
            </Link>
          </li>
          <li>
            <Link
              className="links"
              onClick={() => (setSortFunction("dateCreated"), setSortType(-1))}
            >
              <strong>Date posted:</strong> Latest
            </Link>
          </li>
          <li>
            <Link
              className="links"
              onClick={() => (setSortFunction("dateCreated"), setSortType(1))}
            >
              <strong>Date posted:</strong> Oldest
            </Link>
          </li>
          <li>
            <strong>Number of cranes:</strong> {allCranes.length}
          </li>
        </ul>
      )}

      {filterCranes && (
        <>
          <div className="sliders">
            <label htmlFor="cr-slider">Crane Rate</label>
            <Slider
              name="cr-slider"
              id="cr-slider"
              value={craneRateRange}
              min={0}
              max={10}
              step={0.5}
              marks={false}
              valueLabelDisplay="auto"
              onChange={(e, value) => setCraneRateRange(value)}
            />
            <label htmlFor="br-slider">Background Rate</label>
            <Slider
              name="br-slider"
              id="br-slider"
              value={backgroundRateRange}
              min={0}
              max={10}
              step={0.5}
              marks={false}
              valueLabelDisplay="auto"
              onChange={(e, value) => setBackgroundRateRange(value)}
            />
          </div>
          <button onClick={() => handleRatesSlider()}>APPLY</button>
          <button onClick={handleRemoveFilters}>CLEAR</button>
          <p>
            <strong>Number of cranes:</strong> {allCranes.length}
          </p>
        </>
      )}
    </div>
  );
};

FilterAndSort.propType = {
  allCranes: PropTypes.array.isRequired,
  handleCraneRateFilter: PropTypes.func.isRequired,
  handleBackgroundRateFilter: PropTypes.func.isRequired,
};

export default FilterAndSort;
