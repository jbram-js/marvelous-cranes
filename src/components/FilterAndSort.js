import React, { useState, useCallback, useRef } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import usePlacesAutocomplete from "use-places-autocomplete";

import qs from "qs";

const FilterAndSort = ({
  userLocation,
  allCranes,
  handleCraneRateFilter,
  handleBackgroundRateFilter,
}) => {
  const [query, setQuery] = useState();
  const history = useHistory();
  const { search } = useLocation();

  const [sortCranes, setSortCranes] = useState(false);
  const [filterCranes, setFilterCranes] = useState(false);
  const [showSortButton, setShowSortButton] = useState(true);
  const [showFilterButton, setShowFilterButton] = useState(true);

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
            <Link to={buildQueryString("sort", { dateCreated: -1 })}>
              Date- Newest-Oldest
            </Link>
          </li>
          <li>
            <Link to={buildQueryString("sort", { dateCreated: 1 })}>
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

      {showFilterButton && (
        <button className="filtering" onClick={handleFilterCranes}>
          Filter
        </button>
      )}

      {filterCranes && (
        <button onClick={handleHideFilterCranes}>Hide Filters</button>
      )}

      <div>{allCranes.length} results</div>

      {filterCranes && (
        <ul>
          <li>
            <div onClick={() => handleCraneRateFilter(0, 3)}>
              Crane Rate- 0-3
            </div>
          </li>
          <li>
            <div onClick={() => handleCraneRateFilter(3.5, 5)}>
              Crane Rate- 3.5-5
            </div>
          </li>
          <li>
            <div onClick={() => handleCraneRateFilter(5.5, 7)}>
              Crane Rate- 5.5-7
            </div>
          </li>
          <li>
            <div onClick={() => handleCraneRateFilter(7.5, 9)}>
              Crane Rate- 7.5-9
            </div>
          </li>
          <li>
            <div onClick={() => handleCraneRateFilter(9, 10)}>
              Crane Rate- 9-10
            </div>
          </li>

          <li>
            <div onClick={() => handleBackgroundRateFilter(0, 3)}>
              Backdrop Rate- 0-3
            </div>
          </li>
          <li>
            <div onClick={() => handleBackgroundRateFilter(3.5, 5)}>
              Backdrop Rate- 3.5-5
            </div>
          </li>
          <li>
            <div onClick={() => handleBackgroundRateFilter(5.5, 7)}>
              Backdrop Rate- 5.5-7
            </div>
          </li>
          <li>
            <div onClick={() => handleBackgroundRateFilter(7.5, 9)}>
              Backdrop Rate- 7.5-9
            </div>
          </li>
          <li>
            <div onClick={() => handleBackgroundRateFilter(9, 10)}>
              Backdrop Rate- 9-10
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default FilterAndSort;
