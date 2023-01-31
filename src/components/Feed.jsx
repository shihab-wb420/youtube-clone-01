import {Box, Stack, Typography} from "@mui/material"
import {useEffect,  useState} from "react"
import Sidebar from "./Sidebar"
import Videos from "./Videos"
import {fetchFromApi} from "../utils/fetchFromApi"

const Feed = ()=>{
  const [selectedCategory,setSelectedCategory] = useState("New")
  const [videos,setVideos] = useState([])
   
 //fetching data from api when page reload 
  const getVideos = async ()=>{
   try{
     let datas = await fetchFromApi(`search?part=snippet&q=${selectedCategory}`)
    setVideos(datas)
   }catch(err){
     console.log("fetching video data inside feed error: ",err)
   }
  }
   
 useEffect(()=>{
    getVideos();
  },[selectedCategory])
 // console.log("feed videos: ",videos)
  
  return(
    <Stack 
     sx={{
      color:'#fff', 
      flexDirection:{sx:"column", md:"row"},
     }}
    >
     <Box 
       sx={{
         height:{sx:"auto", md:"92vh"}, borderRight:"1px solid #3d3d3d", 
         px:{sx:"0", md:"2"}
       }}
     >
      <Sidebar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
     
      <Typography 
       className="copyright"
       variant="subtitle2" sx={{mt:1.5, color:"#fff", padding:"8px"}}
      >
        Copyright 2023 WB505
      </Typography>
     </Box>
     <Box 
      sx={{ 
       overflowY:'auto',
       height:"90vh",
       flex:2,
       
      }}
     >
       <Typography 
        variant="h4"
        fontWeight="bold" 
        mb={2}
        sx={{ 
          color:'#fff',
          marginLeft:{ md:"1em", xs:"5px"}
        }}
       >
       {selectedCategory} <span style={{ color:"#F31503" }}> 
           videos
         </span>
       </Typography>
        
        <Videos videos={videos?.items} />
     </Box>
   </Stack>
   )
}

export default Feed