import React from 'react'
import SideBar from '../../Component/SideBar'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function Task() {
  return (
    <Box sx={{display:'flex'}}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:"55px"}}>
        
      <Typography variant='h4'>
            Add Task
        </Typography>
      </Box>
    </Box>
  )
}
