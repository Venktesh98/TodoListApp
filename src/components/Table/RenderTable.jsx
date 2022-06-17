import "./RenderTable.css";

import React from "react";

const RenderTable = ({ displayCities }) => (
  <div>
    {displayCities.length ? (
      <table>
        <tbody>
          <tr>
            <th>Sr No</th>
            <th>Name</th>
            <th>Country</th>
          </tr>
          {displayCities.map((item, index) => (
            <tr key={item.id}>
              <td>#{index + 1}</td>
              <td>{item.city}</td>
              <td>
                <div className="countryContainer">
                  {item.country} -
                  <img
                    className="country-flag"
                    src={`https://countryflagsapi.com/png/${item.countryCode}`}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
        <div className="no-data-found">"Not Data Found!" ╯︿╰</div>
    )}
  </div>
);

export default RenderTable;
