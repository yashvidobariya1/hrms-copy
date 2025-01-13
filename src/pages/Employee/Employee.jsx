import React, { useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { IoMdPersonAdd } from "react-icons/io";
import { useNavigate } from "react-router";
import { GetCall, PostCall } from "../../ApiServices";
import "./Employee.css";
import Loader from "../Helper/Loader";
import { showToast } from "../../main/ToastManager";
import Pagination from "../../main/Pagination";
import DeleteConfirmation from "../../main/DeleteConfirmation";

const Employee = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [employeesList, setEmployeeList] = useState([]);
  const [ShowdropwornAction, SetShowdropwornAction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const [employeeName, setEmployeeName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const employeesPerPage = 10;
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employeesList.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );
  const totalPages = Math.ceil(employeesList.length / employeesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAction = (id) => {
    SetShowdropwornAction(ShowdropwornAction === id ? null : id);
  };

  const HandleAddEmployeeList = () => {
    // console.log("employee add");
    navigate("/employees/addemployee");
  };

  const HandleEditEmployee = async (id) => {
    navigate(`/employees/editemployee/${id}`);
    SetShowdropwornAction(null);
  };

  const HandleDeleteEmployee = async (id, firstName, lastName) => {
    // console.log("employee id for delete", id);
    setEmployeeName(`${firstName} ${lastName}`);
    setEmployeeId(id);
    setShowConfirm(true);
  };

  const GetEmployees = async () => {
    try {
      setLoading(true);
      const response = await GetCall("/getallusers");
      if (response?.data?.status === 200) {
        setEmployeeList(response?.data?.users);
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
      const response = await PostCall(`/deleteemployee/${id}`);
      if (response?.data?.status === 200) {
        showToast(response?.data?.message, "success");
        navigate("/employees");
      } else {
        showToast(response?.data?.message, "error");
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
    GetEmployees();
  };

  useEffect(() => {
    GetEmployees();
  }, []);

  return (
    <div className="employee-list-container">
      <div className="employeelist-flex">
        <div className="employeelist-title">
          <h2>Employee List</h2>
        </div>
        <div className="employeelist-action">
          <button onClick={HandleAddEmployeeList}>
            <IoMdPersonAdd className="employee-action-icon" />
            Add Employee
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loader-wrapper">
          <Loader />
        </div>
      ) : (
        employeesList.length !== 0 && (
          <>
            <table className="employee-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentEmployees.map((employee) => (
                  <tr key={employee?._id}>
                    <td>{employee?.personalDetails.firstName}</td>
                    <td>{employee?.jobDetails.jobTitle}</td>
                    <td>{employee?.personalDetails.email}</td>
                    <td className="action-buttons">
                      <div className="dropdown-container">
                        <SlOptionsVertical
                          onClick={() => handleAction(employee?._id)}
                          className="action-button"
                        />
                        {ShowdropwornAction === employee?._id && (
                          <div className="dropdown-menu">
                            <button
                              onClick={() => HandleEditEmployee(employee?._id)}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                HandleDeleteEmployee(
                                  employee?._id,
                                  employee?.personalDetails.firstName,
                                  employee?.personalDetails.lastName
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
                name={employeeName}
                onConfirm={() => confirmDelete(employeeId)}
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

export default Employee;
