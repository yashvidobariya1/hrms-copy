import React, { useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import Loader from "../Helper/Loader";
import "../EmploymentContract/EmploymentContract.css";
import CommonTable from "../../SeparateCom/CommonTable";

const EmploymentContract = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    contractName: "",
    contract: "",
    companyId: "",
  });
  const [contractList, setContractList] = useState([]);
  const [showDropdownAction, setShowDropdownAction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [contractsPerPage, setContractsPerPage] = useState(10);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedFileTypes = [
        "image/jpeg",
        "image/png",
        "application/pdf",
        "text/html",
        "text/plain",
      ];

      if (!allowedFileTypes.includes(file.type)) {
        alert("please upload valid).");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          fileName: file.name,
          contract: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (event) => {
    setFormData({
      ...formData,
      contractName: event.target.value,
    });
  };

  const handleUpload = () => {
    if (formData.contractName && formData.contract) {
      console.log(" Data:", formData);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setContractList([...contractList, { ...formData, _id: Date.now() }]);
        setFormData({
          contractName: "",
          fileName: "",
          contract: "",
          companyId: "",
        });
      }, 2000);
    } else {
      alert("Please enter a contract name and select a file.");
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAction = (id) => {
    setShowDropdownAction(showDropdownAction === id ? null : id);
  };

  const handleEdit = (id) => {
    console.log("Edit", id);
  };

  const handleDelete = (id) => {
    console.log("Delete", id);
  };

  const handleContractsPerPageChange = (event) => {
    setContractsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const tableHeaders = [
    "Contract Name",
    "Contract",
    "Uploaded By",
    "Updated Date",
  ];

  const actions = {
    showDropdownAction,
    onEdit: handleEdit,
    onDelete: handleDelete,
  };

  const indexOfLastContract = currentPage * contractsPerPage;
  const indexOfFirstContract = indexOfLastContract - contractsPerPage;
  const currentContracts = contractList.slice(
    indexOfFirstContract,
    indexOfLastContract
  );
  const totalPages = Math.ceil(contractList.length / contractsPerPage);

  return (
    <div className="employee-contract-list-container">
      <div className="employee-main-container">
        <div className="employeecontract-flex">
          <div className="employeecontract-title">
            <h2>Template</h2>
          </div>
          <div className="employeecontract-title">
            <div className="Employeecontract-input">
              <input
                type="text"
                placeholder="Enter Name"
                className="employee-contract-input"
                value={formData.contractName}
                onChange={handleNameChange}
              />
            </div>
            <div className="Employee-flex-file-action">
              <div className="Employeecontract-file">
                <input
                  type="file"
                  className="File-input"
                  onChange={handleFileChange}
                />
              </div>
              <div className="employeecontract-action">
                <button onClick={handleUpload}>
                  <AiOutlineUpload className="employeecontract-action-icon" />
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
        <p>
          Use following place holder in contract template: 'EMPLOYEE_NAME,
          EMPLOYER_NAME, JOB_START_DATE, JOB_TITLE, WEEKLY_HOURS, ANNUAL_SALARY,
          HOLIDAY_CALENDAR, WORK_LOCATION'
        </p>
      </div>

      {loading ? (
        <div className="loader-wrapper">
          <Loader />
        </div>
      ) : (
        <>
          <CommonTable
            headers={tableHeaders}
            data={currentContracts}
            actions={actions}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onActionClick={handleAction}
            ShowperPage={contractsPerPage}
            OnPerPageChange={handleContractsPerPageChange}
          />
        </>
      )}
    </div>
  );
};

export default EmploymentContract;
