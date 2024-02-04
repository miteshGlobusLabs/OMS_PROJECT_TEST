// import React, { useState, useEffect } from "react";
// import { Dropdown, DropdownButton } from "react-bootstrap";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// const Department = ({ sitem }) => {
//   const [departments, setDepartments] = useState([]);
//   const [selectedDepartment, setSelectedDepartment] = useState(null);
//   const [departmentData, setDepartmentData] = useState(null);

//   const employeeIDs = sitem.map(item => {
//     console.log(item.EmployeeID);
//     return item.EmployeeID; // return the EmployeeID value
//   });
  
//   console.log(employeeIDs); // log the array of EmployeeID values
  

//   useEffect(() => {
//     fetch("http://localhost:3306/api/department")
//       .then((response) => response.json())
//       .then((data) => setDepartments(data))
//       .catch((error) => console.error("Error fetching departments:", error));
//   }, []);

//   const handleDepartmentSelect = (department) => {
//     setSelectedDepartment(department);
//     fetch(
//       `http://localhost:3306/api/employee/dNames?department=${department.DepartmentName}`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         const filteredData = data.filter(
//           (employee) => employee.DepartmentID === department.DepartmentID
//         );
//         setDepartmentData(filteredData);
//       })
//       .catch((error) =>
//         console.error("Error fetching department data:", error)
//       );
//   };


//   const handleAddToTeam = async (employeeID) => {
//     const selectedEmployee = departmentData.find(
//       (item) => item.EmployeeID === employeeID
//     );

//     const employeeIDs = sitem.map(item => {
//       console.log(item.EmployeeID);
//       return item.EmployeeID; // return the EmployeeID value
//     });
   

//     const requestData = {
//       EmployeeID_Assigner: employeeIDs,
//       EmployeeID_AssignTo: selectedEmployee.EmployeeID,
//       DepartmentID_AssignTo: selectedEmployee.DepartmentID,
//       CreatedDate: new Date().toISOString(),
//       CreatedBy: "Admin",
//     };
//     console.log("Data to be sent to the backend:", requestData);

//     try {
//       const response = await fetch("http://localhost:3306/api/workGroup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(requestData),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       console.log("Employee added to the team successfully");
//     } catch (error) {
//       console.error("Error adding employee to the team:", error);
//     }
//   };



//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "flex-start",
//       }}
//     >
//       <div style={{ width: "30%" }}>
//         <DropdownButton
//           id="dropdown-basic-button"
//           title={
//             selectedDepartment
//               ? selectedDepartment.DepartmentName
//               : "Select Department"
//           }
       
//         >
//           <div style={{ maxHeight: "300px", overflowY: "auto" }}
//           >
//             {departments.map((department) => (
//               <Dropdown.Item
//                 key={department.DepartmentID}
//                 onClick={() => handleDepartmentSelect(department)}
//               >
//                 {department.DepartmentName}
//               </Dropdown.Item>
//             ))}
//           </div>
//         </DropdownButton>
//       </div>

//       <div style={{ width: "700px" }}>
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 650 }} aria-label="simple table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>Employee ID</TableCell>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Designation</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Add</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {departmentData &&
//                 departmentData.map((employee) => (
//                   <TableRow key={employee.EmployeeID}>
//                     <TableCell>{employee.EmployeeID}</TableCell>
//                     <TableCell>
//                       {employee.FirstName} {employee.LastName}
//                     </TableCell>
//                     <TableCell>{employee.DesignationName}</TableCell>
//                     <TableCell>{employee.EmploymentStatus}</TableCell>
//                     <TableCell
//                       sx={{
//                         fontSize: "18px",
//                         color: "green",
//                         cursor: "pointer",
//                       }}
//                       onClick={() => handleAddToTeam(employee.EmployeeID)}
//                     >
//                       <AddCircleOutlineIcon />
//                     </TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>

//       {/* <AddTeams data={item} /> */}
//     </div>
//   );
// };

// export default Department;




import React, { useState, useEffect } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Department = ({ sitem }) => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [departmentData, setDepartmentData] = useState(null);

  

  useEffect(() => {
    fetch("http://localhost:3306/api/department")
      .then((response) => response.json())
      .then((data) => setDepartments(data))
      .catch((error) => console.error("Error fetching departments:", error));
  }, []);

  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
    fetch(
      `http://localhost:3306/api/employee/dNames?department=${department.DepartmentName}`
    )
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter(
          (employee) => employee.DepartmentID === department.DepartmentID
        );
        setDepartmentData(filteredData);
      })
      .catch((error) =>
        console.error("Error fetching department data:", error)
      );
  };

  const handleAddToTeam = async (employeeID) => {
    const selectedEmployee = departmentData.find(
      (item) => item.EmployeeID === employeeID
    );

    const requestData = {
      EmployeeID_Assigner: sitem.map((item) => item.EmployeeID),
      EmployeeID_AssignTo: selectedEmployee.EmployeeID,
      DepartmentID_AssignTo: selectedEmployee.DepartmentID,
      CreatedDate: new Date().toISOString(),
      CreatedBy: "Admin",
    };
    console.log("Data to be sent to the backend:", requestData);

    try {
      const response = await fetch("http://localhost:3306/api/workGroup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Employee added to the team successfully");
    } catch (error) {
      console.error("Error adding employee to the team:", error);
    }
  };

  // Filter department data to exclude assigners
  const filteredDepartmentData = departmentData
    ? departmentData.filter(
        (employee) => !sitem.map((item) => item.EmployeeID).includes(employee.EmployeeID)
      )
    : [];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <div style={{ width: "30%" }}>
        <DropdownButton
          id="dropdown-basic-button"
          title={
            selectedDepartment
              ? selectedDepartment.DepartmentName
              : "Select Department"
          }
        >
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {departments.map((department) => (
              <Dropdown.Item
                key={department.DepartmentID}
                onClick={() => handleDepartmentSelect(department)}
              >
                {department.DepartmentName}
              </Dropdown.Item>
            ))}
          </div>
        </DropdownButton>
      </div>

      <div style={{ width: "700px" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Employee ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Add</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDepartmentData.map((employee) => (
                <TableRow key={employee.EmployeeID}>
                  <TableCell>{employee.EmployeeID}</TableCell>
                  <TableCell>
                    {employee.FirstName} {employee.LastName}
                  </TableCell>
                  <TableCell>{employee.DesignationName}</TableCell>
                  <TableCell>{employee.EmploymentStatus}</TableCell>
                  <TableCell
                    sx={{
                      fontSize: "18px",
                      color: "green",
                      cursor: "pointer",
                    }}
                    onClick={() => handleAddToTeam(employee.EmployeeID)}
                  >
                    <AddCircleOutlineIcon />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Department;

