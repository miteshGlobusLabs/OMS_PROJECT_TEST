const db = require("../db");

// Getting all Department

exports.getAllDepartments = (req, res) => {
  const query = "SELECT * FROM tb_department";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results);
    }
  });
};

// Inserting Department

exports.addDepartment = (req, res) => {
  const newDepartment = req.body;

  const query = "INSERT INTO tb_department SET ?";
  db.query(query, newDepartment, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json({ message: "Department added successfully" });
    }
  });
};

// updating Department's data

exports.updateDepartment = (req, res) => {
  const departmentId = req.params.DepartmentID;
  const updatedDepartment = req.body;
  const query = "UPDATE tb_department SET ? WHERE DepartmentID = ?";

  db.query(query, [updatedDepartment, departmentId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Department not found" });
        return;
      } else if (results.affectedRows > 0 && results.changedRows === 0) {
        res.status(200).json("Department's data is up to date already");
        return;
      } else {
        res.status(200).json({ message: "Department updated successfully" });
      }
    }
  });
};

// Deleting Department's data

exports.deleteDepartment = (req, res) => {
  const departmentId = req.params.DepartmentID;
  const query = "DELETE FROM tb_department WHERE DepartmentID = ?";
  db.query(query, [departmentId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Department not found" });
        return;
      } else {
        res.status(200).json({ message: "Department's data deleted successfully" });
      }
    }
  });
};
