import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const AddTeams = ({ sdata }) => {
  const [workgroupEmployees, setWorkgroupEmployees] = useState([]);
  const [assignedEmployees, setAssignedEmployees] = useState([]);

  useEffect(() => {
    // Fetch particular workgroup employee data
    const fetchWorkgroupEmployees = async () => {
      try {
        // Make API request to get workgroup employee data
        const response = await fetch("http://localhost:3306/api/workGroup/");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setWorkgroupEmployees(data);
      } catch (error) {
        console.error("Error fetching workgroup employees:", error);
      }
    };

    // Call the function to fetch workgroup employees
    fetchWorkgroupEmployees();
  }, []); 

  useEffect(() => {
    // Filter sdata based on matching EmployeeID_Assigner
    if (sdata.length > 0 && workgroupEmployees.length > 0) {
      const assigned = workgroupEmployees.filter((employee) => {
        return sdata.some(
          (item) => item.EmployeeID === employee.EmployeeID_Assigner
        );
      });
      setAssignedEmployees(assigned);
    }
  }, [sdata, workgroupEmployees]);

  const handleDelete = (employeeId) => {
    // Add your delete logic here
    console.log("Deleting employee with ID:", employeeId);
    // Implement your delete functionality using API calls or state management
  };

  return (
    <div style={{ marginTop: "20px" }}>
      {sdata &&
        sdata.map((item) => (
          <div key={item.EmployeeID}>
            <p>
              {item.FirstName} {item.LastName} <span>Teams</span>
            </p>
          </div>
        ))}
      <table className="table table-striped">
        <thead style={{ fontSize: "15px" }}>
          <tr>
            <th>WorkGroupID</th>
            <th>EmployeeID_Assigner</th>
            <th>Employee AssigTo</th>
            <th>Department</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody style={{ fontSize: "13px" }}>
          {assignedEmployees.map((employee) => (
            <tr key={employee.EmployeeID}>
              <td>{employee.WorkGroupID}</td>
              <td>{employee.EmployeeID_Assigner}</td>
              <td>{employee.EmployeeID_AssignTo}</td>
              <td>{employee.DepartmentID_AssignTo}</td>
              <td>
                <DeleteIcon
                  onClick={() => handleDelete(employee.EmployeeID)}
                  style={{ cursor: "pointer" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddTeams;
