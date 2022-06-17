import "./RenderTable.css";

import React from "react";

const RenderTable = ({ cityResponse }) => (
  <div>
    {cityResponse.length ? (
      <table>
        <tbody>
          <tr>
            <th>Sr No</th>
            <th>Name</th>
            <th>Country</th>
          </tr>
          {cityResponse.map((item, index) => (
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
      "Not Data Found!"
    )}
  </div>
);

export default RenderTable;
