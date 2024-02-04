// import * as React from "react";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import { Button, CardActionArea, CardActions } from "@mui/material";
// import { useEffect } from "react";
// import { useState } from "react";
// import "./Team.css";
// import profile from "./profile.webp";
// import { Link } from "react-router-dom";

// export default function AllTeamMembers() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const apiUrl = "http://localhost:3306/api/employee/allData";
//           const response = await fetch(apiUrl, {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//             },
//           });

//           const result = await response.json();
//           setData(result);
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       };

//       fetchData();
//     }, []);



//   return (
//     <div className="card-container">
//       {data.map((item) => (
//         <Card sx={{ width: 200, margin: "10px", padding: "10px" }}>
//           <CardActionArea>
//             <div style={{ display: "flex", justifyContent: "center" }}>
//               <CardMedia
//                 component="img"
//                 image={profile}
//                 alt="profile"
//                 sx={{ height: "100px", width: "100px" }}
//               />
//             </div>

//             <CardContent sx={{ textAlign: "center" }}>
//               <Typography gutterBottom variant="h6" component="div">
//                 {item.FirstName} {item.LastName}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {item.EmployeeID}
//               </Typography>
//             </CardContent>
//           </CardActionArea>
//           <CardActions sx={{ display: "flex", justifyContent: "center" }}>
//             <Link to={`/createteam/${item.EmployeeID}`} key={item.EmployeeID}>
//               <Button size="small" color="primary"   >
//                 create Team
//               </Button>
//             </Link>
//           </CardActions>
//         </Card>
//       ))}
//     </div>
//   );
// }
import * as React from "react";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Team.css";
import profile from "./profile.webp";
import SideBar from "../../../Component/SideBar"; // Assuming you have a SideBar component

export default function AllTeamMembers() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = "http://localhost:3306/api/employee/allData";
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, marginTop: "55px" }}>
        <div className="card-container">
          {data.map((item) => (
            <Card key={item.EmployeeID} sx={{ width: 200, margin: "10px", padding: "10px" }}>
              <CardActionArea>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <CardMedia
                    component="img"
                    image={profile}
                    alt="profile"
                    sx={{ height: "100px", width: "100px" }}
                  />
                </div>

                <CardContent sx={{ textAlign: "center" }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {item.FirstName} {item.LastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.EmployeeID}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                <Link to={`/createteam/${item.EmployeeID}`} key={item.EmployeeID}>
                  <Button size="small" color="primary">
                    Create Team
                  </Button>
                </Link>
              </CardActions>
            </Card>
          ))}
        </div>
      </Box>
    </Box>
  );
}
