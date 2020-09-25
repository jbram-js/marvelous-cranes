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

  return (
    <div className="FilterAndSort">
      {showSortButton && (
        <button className="sorting" onClick={handleSortCranes}>
          Sort By
        </button>
      )}

      {sortCranes && (
        <button onClick={handleHideSortCranes}>Hide Sort By</button>
      )}

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

      <Slider
        value={craneRateRange}
        min={0}
        max={10}
        onChange={(e, value) => setCraneRateRange(value)}
      />

      <Slider
        value={backgroundRateRange}
        min={0}
        max={10}
        onChange={(e, value) => setBackgroundRateRange(value)}
      />
      <button onClick={() => handleRatesSlider()}>FILTER</button>

      {showFilterButton && (
        <button className="filtering" onClick={handleFilterCranes}>
          Filter
        </button>
      )}

      {filterCranes && (
        <button onClick={handleHideFilterCranes}>Hide Filters</button>
      )}

      <div>{allCranes.length} results</div>
    </div>
  );
};

FilterAndSort.propType = {
  allCranes: PropTypes.array.isRequired,
  handleCraneRateFilter: PropTypes.func.isRequired,
  handleBackgroundRateFilter: PropTypes.func.isRequired,
};

export default FilterAndSort;
