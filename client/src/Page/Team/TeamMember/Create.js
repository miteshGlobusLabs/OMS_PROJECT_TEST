import React, { useEffect, useState } from "react";
import { CardActionArea, CardActions, CardContent, CardMedia } from "@mui/material";
import profile from "./profilenn.png";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import SideBar from "../../../Component/SideBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Department from "./DepartMent";
import AddTeams from "./AddTeams";

const Create = () => {
  const { EmployeeID } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3306/api/employee/allData/${EmployeeID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setItem(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [EmployeeID]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <Typography variant="h5" sx={{ textAlign: "start" }}>
          CREATE TEAM
        </Typography>
        <Box
          className="createTeam-container"
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            marginTop: "10px",
            padding: "10px",
          }}
        >
          {item.map((items) => (
            <Card
              key={items.EmployeeID}
              sx={{ width: 200, height: 200, margin: "10px", padding: "10px" }}
            >
              <CardActionArea>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CardMedia
                    component="img"
                    image={profile} 
                    alt="profile"
                    sx={{ height: "100px", width: "100px" }}
                  />
                </Box>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {items.FirstName} {items.LastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {items.EmployeeID}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions
                sx={{ display: "flex", justifyContent: "center" }}
              ></CardActions>
            </Card>
          ))}
          <Box sx={{ marginLeft: "10px" }}>
            <Department sitem={item} />
          </Box>
        </Box>

        <AddTeams sdata = {item}/>
      </Box> 
    </Box>
  );
};

export default Create;
