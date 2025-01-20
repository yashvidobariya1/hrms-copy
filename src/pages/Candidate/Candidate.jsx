import React, { useState } from "react";
// import "./EmploymentContract.css";
import { AiOutlineUpload } from "react-icons/ai";
import Loader from "../Helper/Loader";
import { SlOptionsVertical } from "react-icons/sl";
import Pagination from "../../main/Pagination";

const EmploymentContract = () => {
  const [loading, setLoading] = useState(false);

  const dummyData = [
    {
      _id: "1",
      contractName: "Contract A",
      contract: "contract_a.pdf",
      uploadedBy: "User1",
      updatedDate: "2025-01-13",
    },
    {
      _id: "2",
      contractName: "Contract B",
      contract: "contract_b.pdf",
      uploadedBy: "User2",
      updatedDate: "2025-01-12",
    },
    {
      _id: "3",
      contractName: "Contract C",
      contract: "contract_c.pdf",
      uploadedBy: "User3",
      updatedDate: "2025-01-11",
    },
  ];

  const [contractList, setcontractList] = useState(dummyData);
  const [ShowdropwornAction, SetShowdropwornAction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const CompaniesPerPage = 10;
  const indexOfLastCompany = currentPage * CompaniesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - CompaniesPerPage;
  const currentCompanies = contractList.slice(
    indexOfFirstCompany,
    indexOfLastCompany
  );
  const totalPages = Math.ceil(contractList.length / CompaniesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAction = (id) => {
    SetShowdropwornAction(ShowdropwornAction === id ? null : id);
  };

  return (
    <div className="employee-contract-list-container">
      <div className="employeecontract-flex">
        <div className="employeecontract-title">
          <h2>Template</h2>
        </div>

        <div className="employeecontract-title">
          <input
            type="text"
            placeholder="Enter Name"
            className="employee-contract-input"
          />
        </div>

        <div className="employeecontract-title">
          <input type="file" />
        </div>

        <div className="employeecontract-action">
          <button>
            <AiOutlineUpload className="employeecontract-action-icon" />
            Upload
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loader-wrapper">
          <Loader />
        </div>
      ) : (
        contractList?.length !== 0 && (
          <>
            <table className="employee-contract-table">
              <thead>
                <tr>
                  <th>Contract Name</th>
                  <th>Contract</th>
                  <th>Uploaded By</th>
                  <th>Updated Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentCompanies?.map((company) => (
                  <tr key={company._id}>
                    <td>{company.contractName}</td>
                    <td>{company.contract}</td>
                    <td>{company.uploadedBy}</td>
                    <td>{company.updatedDate}</td>
                    <td className="employee-contract-action-buttons">
                      <div className="employee-contract-dropdown-container">
                        {/* Example for dropdown button */}
                        <SlOptionsVertical
                          onClick={() => handleAction(company._id)}
                        />

                        {ShowdropwornAction === company._id && (
                          <div className="employee-contract-dropdown-menu">
                            <button
                              onClick={() => console.log("Edit", company._id)}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => console.log("Delete", company._id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )
      )}
    </div>
  );
};

export default EmploymentContract;
