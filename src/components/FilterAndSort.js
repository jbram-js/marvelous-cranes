import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useHistory } from "react-router-dom";
import { Slider } from "@material-ui/core";

import qs from "qs";

const FilterAndSort = ({
  allCranes,
  handleCraneRateFilter,
  handleBackgroundRateFilter,
  setSortFunction,
  filterValue,
  setFilterValue,
  handleFiltering,
}) => {
  const history = useHistory();
  const { search } = useLocation();

  const [sortCranes, setSortCranes] = useState(false);
  const [filterCranes, setFilterCranes] = useState(false);
  const [showSortButton, setShowSortButton] = useState(true);
  const [showFilterButton, setShowFilterButton] = useState(true);
  const [craneRateRange, setCraneRateRange] = useState([0, 10]);
  const [backgroundRateRange, setBackgroundRateRange] = useState([0, 10]);

  //Sort functionality
  const buildQueryString = (operation, valueObj) => {
    const currentQueryParams = qs.parse(search, { ignoreQueryPrefix: true });
    const newQueryParams = {
      ...currentQueryParams,
      [operation]: JSON.stringify({
        ...JSON.parse(currentQueryParams[operation] || "{}"),
        ...valueObj,
      }),
    };
    return qs.stringify(newQueryParams, {
      addQueryPrefix: true,
      encode: false,
    });
  };

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

  const handleRatesSlider = (data) => {
    setFilterValue({
      bottomRate: craneRateRange[0],
      topRate: craneRateRange[1],
      bottomRateCrane: backgroundRateRange[0],
      topRateCrane: backgroundRateRange[1],
    });
  };

  const handleRemoveFilters = () => {
    setFilterValue({
      bottomRate: 0,
      topRate: 10,
      bottomRateCrane: 0,
      topRateCrane: 10,
    });
    setCraneRateRange([0, 10]);
    setBackgroundRateRange([0, 10]);
  };

  return (
    <div className="filter-sort">
      {showSortButton && <button onClick={handleSortCranes}>SORT</button>}

      {sortCranes && <button onClick={handleHideSortCranes}>CLOSE</button>}

      {sortCranes && (
        <ul>
          <li>
            <Link
              onClick={() =>
                setSortFunction({
                  sort: buildQueryString("dateCreated"),
                  type: -1,
                })
              }
            >
              Date- Newest-Oldest
            </Link>
          </li>
          <li>
            <Link
              onClick={() =>
                setSortFunction(buildQueryString("sort", { craneRate: -1 }))
              }
            >
              Date- Oldest-Newest
            </Link>
          </li>
          <li>
            <Link to={buildQueryString("sort", { craneRate: -1 })}>
              Crane Rate- Highest-Lowest
            </Link>
          </li>
          <li>
            <Link to={buildQueryString("sort", { craneRate: 1 })}>
              Crane Rate- Lowest-Highest
            </Link>
          </li>
          <li>
            <Link to={buildQueryString("sort", { craneBackgroundRate: -1 })}>
              Backdrop Rate- Highest-Lowest
            </Link>
          </li>
          <li>
            <Link to={buildQueryString("sort", { craneBackgroundRate: 1 })}>
              Backdrop Rate- Lowest-Highest
            </Link>
          </li>
        </ul>
      )}

      {showFilterButton && <button onClick={handleFilterCranes}>FILTER</button>}

      {filterCranes && (
        <>
          {" "}
          <button onClick={handleHideFilterCranes}>Hide Filters</button>
          <label htmlFor="cr-slider">Crane Rate</label>
          <Slider
            name="cr-slider"
            id="cr-slider"
            value={craneRateRange}
            min={0}
            max={10}
            step={0.5}
            marks={true}
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
            marks={true}
            valueLabelDisplay="auto"
            onChange={(e, value) => setBackgroundRateRange(value)}
          />
          <button onClick={() => handleRatesSlider()}>FILTER</button>
          <button onClick={handleRemoveFilters}>REMOVE FILTERS</button>
        </>
      )}

      <h2>{allCranes.length} results</h2>
    </div>
  );
};

FilterAndSort.propType = {
  allCranes: PropTypes.array.isRequired,
  handleCraneRateFilter: PropTypes.func.isRequired,
  handleBackgroundRateFilter: PropTypes.func.isRequired,
};

export default FilterAndSort;
