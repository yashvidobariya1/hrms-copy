import React, { useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
// import { IoMdPersonAdd } from "react-icons/io";
import { useNavigate } from "react-router";
import { GetCall, PostCall } from "../../ApiServices";
import "./Settings.css";
import Loader from "../Helper/Loader";
import { showToast } from "../../main/ToastManager";
import { MdAddBusiness } from "react-icons/md";
import Pagination from "../../main/Pagination";
import DeleteConfirmation from "../../main/DeleteConfirmation";

const Settings = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [companyList, setCompanyList] = useState([]);
  const [ShowdropwornAction, SetShowdropwornAction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyId, setCompanyId] = useState("");
  const CompaniesPerPage = 10;
  const indexOfLastCompany = currentPage * CompaniesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - CompaniesPerPage;
  const currentCompanies = companyList.slice(
    indexOfFirstCompany,
    indexOfLastCompany
  );
  const totalPages = Math.ceil(companyList.length / CompaniesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAction = (id) => {
    SetShowdropwornAction(ShowdropwornAction === id ? null : id);
  };

  const HandleAddCompanyList = () => {
    navigate("/settings/addCompany");
  };

  const HandleEditCompany = async (id) => {
    navigate(`/settings/editcompany/${id}`);
    SetShowdropwornAction(null);
  };

  const HandleDeleteCompany = async (id, name) => {
    setCompanyName(name);
    setCompanyId(id);
    setShowConfirm(true);
  };

  const GetCompnies = async () => {
    try {
      setLoading(true);
      const response = await GetCall("/getallcompany");
      if (response?.data?.status === 200) {
        setCompanyList(response?.data?.company);
      }
      setLoading(false);
      // console.log("response", response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    SetShowdropwornAction(null);
  };

  const confirmDelete = async (id) => {
    setShowConfirm(false);
    SetShowdropwornAction(null);
    try {
      setLoading(true);
      const response = await PostCall(`/deletecompany/${id}`);
      if (response?.data?.status === 200) {
        showToast(response?.data?.message, "success");
        navigate("/settings");
      } else {
        showToast(response?.data?.message, "error");
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
    GetCompnies();
  };

  useEffect(() => {
    GetCompnies();
  }, []);

  return (
    <div className="company-list-container">
      <div className="companylist-flex">
        <div className="companylist-title">
          <h2>Comapany List</h2>
        </div>
        <div className="companylist-action">
          <button onClick={HandleAddCompanyList}>
            <MdAddBusiness className="company-action-icon" />
            Add Company
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loader-wrapper">
          <Loader />
        </div>
      ) : (
        companyList?.length !== 0 && (
          <>
            <table className="company-table">
              <thead>
                <tr>
                  <th>Business Name</th>
                  <th>Company Code</th>
                  <th>City</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentCompanies?.map((company) => (
                  <tr key={company?._id}>
                    <td>{company?.companyDetails?.businessName}</td>
                    <td>{company?.companyDetails?.companyCode}</td>
                    <td>{company?.companyDetails?.city}</td>
                    <td className="action-buttons">
                      <div className="dropdown-container">
                        <SlOptionsVertical
                          onClick={() => handleAction(company?._id)}
                          className="action-button"
                        />
                        {ShowdropwornAction === company?._id && (
                          <div className="dropdown-menu">
                            <button
                              onClick={() => HandleEditCompany(company?._id)}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                HandleDeleteCompany(
                                  company?._id,
                                  company?.companyDetails?.businessName
                                )
                              }
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
            {showConfirm && (
              <DeleteConfirmation
                name={companyName}
                onConfirm={() => confirmDelete(companyId)}
                onCancel={cancelDelete}
              />
            )}
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

export default Settings;
