import {useState,useEffect } from "react"
import {Box,Typography} from "@mui/material"
import Videos from "./Videos"
import {fetchFromApi } from "../utils/fetchFromApi"
import {useParams} from "react-router-dom"

const SearchFeed = ()=>{
  const [videos,setVideos] = useState([])
  const {searchTerm} = useParams();
   
 //fetching data from api 
  const getVideos = async ()=>{
   try{
     let datas = await fetchFromApi(`search?part=snippet&q=${searchTerm}`)
    setVideos(datas)
   }catch(err){
     console.log("fetching video data inside searchFeed error: ",err)
   }
  }
  
  useEffect(()=>{
    getVideos();
  },[searchTerm])
  
  
  return(
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
          marginLeft:{ md:"1em", xs:"5px",sm:"10px"}
        }}
       >
         Search Results for:
         <span style={{ color:"#F31503", marginLeft:"0.3em"}}> 
          {searchTerm}
         </span>
         
       </Typography>
        
       <Videos videos={videos?.items} />
    </Box>
    )
}

export default SearchFeed