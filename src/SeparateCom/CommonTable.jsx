import React from "react";
import { SlOptionsVertical } from "react-icons/sl";

import "../SeparateCom/CommonTable.css";

const CommonTable = ({ headers, data, actions, handleAction }) => {
  const showActionColumn = headers.includes("Action");
  return (
    <div className="table-container">
      <table className="common-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item?._id}>
              {Object.keys(item).map((key, index) => {
                if (key !== "_id") {
                  return <td key={index}>{item[key]}</td>;
                }
                return null;
              })}
              {showActionColumn && (
                <td>
                  <div className="dropdown-container">
                    <SlOptionsVertical
                      onClick={() => handleAction(item?._id)}
                    />
                    {actions?.ShowdropwornAction === item?._id && (
                      <div className="dropdown-menu">
                        {actions?.actionsList.map((action, id1) => (
                          <button
                            key={id1}
                            onClick={() => action.onClick(item?._id)}
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommonTable;
