import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";

import qs from "qs";

const FilterAndSort = () => {
  const { search } = useLocation();
  const history = useHistory();

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
  return (
    <div className="FilterAndSort">
      <button className="sort">Sort</button>
      <ul>
        <li>
          <Link to={buildQueryString("sort", { dateCreated: -1 })}>
            Date- Newest-Oldest
          </Link>
        </li>
        <li>
          <Link>Date- Oldest-Newest</Link>
        </li>
      </ul>
    </div>
  );
};

export default FilterAndSort;
