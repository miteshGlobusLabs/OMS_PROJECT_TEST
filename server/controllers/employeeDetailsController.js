const db = require("../db");

// Getting all employees data

exports.getAllEmployees = (req, res) => {
  const query = "SELECT * FROM tb_employee";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.status(200).json(results);
  });
};

// Getting all data of employees 

exports.getAllDataOfEmployees = (req, res) => {
  const query = "SELECT tb_employee.*, tb_userdetails.Role, tb_userdetails.Username FROM tb_employee INNER JOIN tb_userdetails ON tb_employee.EmployeeID = tb_userdetails.EmployeeID";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.status(200).json(results);
  });
};

// Getting all data of employees by their employee id

exports.getAllDataOfEmployeesByEmployeeId = (req, res) => {
  const employeeId = req.params.EmployeeID;
  const query = "SELECT tb_employee.*, tb_userdetails.Role, tb_userdetails.Username FROM tb_employee INNER JOIN tb_userdetails ON tb_employee.EmployeeID = tb_userdetails.EmployeeID WHERE tb_employee.EmployeeID = ?";
  db.query(query, employeeId, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.status(200).json(results);
  });
};

// // Getting data of employees with their department and designation name

// exports.getDataOfEmployeesWithTheirDNames = (req, res) => {
//   const employeeId = req.params.EmployeeID;
//   const query = "SELECT tb_employee.EmployeeID,tb_employee.FirstName,tb_employee.LastName,tb_employee.EmploymentStatus,tb_employee.DepartmentID,tb_department.DepartmentName,tb_employee.DesignationID,tb_designation.DesignationName FROM tb_employee JOIN tb_department ON tb_employee.DepartmentID = tb_department.DepartmentID JOIN tb_designation ON tb_employee.DesignationID = tb_designation.DesignationID WHERE tb_employee.EmployeeID = ?";
//   db.query(query, employeeId,(err, results) => {
//     if (err) {
//       console.error("Error executing query:", err);
//       res.status(500).json({ error: "Internal Server Error" });
//       return;
//     }
//     res.status(200).json(results);
//   });
// };


// Getting data of employees with their department and designation name

exports.getDataOfEmployeesWithTheirDNames = (req, res) => {
  const query = "SELECT tb_employee.EmployeeID,tb_employee.FirstName,tb_employee.LastName,tb_employee.EmploymentStatus,tb_employee.DepartmentID,tb_department.DepartmentName,tb_employee.DesignationID,tb_designation.DesignationName FROM tb_employee JOIN tb_department ON tb_employee.DepartmentID = tb_department.DepartmentID JOIN tb_designation ON tb_employee.DesignationID = tb_designation.DesignationID";
  db.query(query,(err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.status(200).json(results);
  });
};

// Inserting employees data

exports.addEmployee = (req, res) => {
  const newEmployee = req.body;

  const query = "INSERT INTO tb_employee SET ?";
  db.query(query, newEmployee, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(201).json({ message: "Employee added successfully" });
    }
  });
};

// getting latest or last employee id

exports.getLastEmployeeId = (req, res) => {
  const query =
    "SELECT EmployeeID FROM tb_employee ORDER BY EmployeeID DESC LIMIT 1";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "No employees found" });
      return;
    }
    const lastEmployeeId = results[0].EmployeeID;
    res.status(200).json({ lastEmployeeId:lastEmployeeId });
  });
};

// updating employee's data

exports.updateEmployee = (req, res) => {
  const EmployeeID = req.params.EmployeeID;
  const updatedEmployee = req.body;
  const query = "UPDATE tb_employee SET ? WHERE EmployeeID = ?";

  db.query(query, [updatedEmployee, EmployeeID], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Employee not found" });
        return;
      } else if (results.affectedRows > 0 && result.changedRows === 0) {
        res.status(200).json("Data is up to date already");
        return;
      } else {
        res.status(200).json({ message: "Employee updated successfully" });
      }
    }
  });
};

// Deleting employee's data

exports.deleteEmployee = (req, res) => {
  const employeeId = req.params.EmployeeID;
  const query = "DELETE FROM tb_employee WHERE EmployeeID = ?";
  db.query(query, [employeeId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Employee not found" });
        return;
      } else {
        res.status(200).json({ message: "Employee's data deleted successfully" });
      }
    }
  });
};
