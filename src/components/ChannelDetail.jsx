import {useState, useEffect } from "react"
import {useParams} from "react-router-dom"
import {fetchFromApi} from "../utils/fetchFromApi"
import ChannelCard from "./ChannelCard"
import {Box,Stack, CardMedia,CardContent, Typography } from "@mui/material"
import {CheckCircle} from "@mui/icons-material"
import {Link} from "react-router-dom"
import Videos from "./Videos"

const ChannelDetail = ()=>{
  const [channelDetail,setChannelDetail]=useState([]);
  const [channelVideos,setChannelVideos]=useState([]);
  const {id} = useParams();
    
  //fetching channleDetails by channel id
  useEffect(()=>{
    //fetching channleDetails
    fetchFromApi(`channels?part=snippet&id=${id}`).then((cData)=>setChannelDetail(cData?.items)).catch((err)=>{
      console.log("ChannelDetail fetching error:",err)
    })
  //fetching channel videos
    fetchFromApi(`search?channelId=${id}&part=snippet&order=date`).then((cvData)=>setChannelVideos(cvData?.items)).catch((err)=>{
      console.log("Channelvideos fetching error:",err)
    })
  },[id])
  console.log("videos in channle ",channelVideos)

    
  return( 
    <Box minHeight="95vh">
       <Box>
         <Stack 
          sx={{
            background:"linear-gradient(90deg,rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)",
            zIndex:10, 
            height:{xs:"190px", md:"300px",}
          }}
         /> 
           
  {/* Channel detail card start */}
    <Box
     sx={{
       boxShadow:"none",
       borderRadius:'20px',
       display:"flex",
       justifyContent:"center",
       alignItems:"center",
       width: {xs:"356px",md:"312px"},
       height:"326px",
       margin:"auto",
       mt:"-7em"
     }}
    >
        <CardContent
         sx={{ 
          display:"flex", flexDirection:"column",justifyContent:"center", textAlign:"center", color:"#fff"
         }}
        > 
          <CardMedia
            image={channelDetail[0]?.snippet?.thumbnails?.high?.url}
            alt={channelDetail[0]?.snippet?.title}
            sx={{
              borderRadius:"50%",height:"180px",width:"180px", border:"1px solid #e3e3e3", mb:2,
            }}
           /> 
           <Typography variant="h6">
              { channelDetail[0]?.snippet?.title } 
              <CheckCircle sx={{ fontSize:14,color:"gray",ml:'5px' }}/>
           </Typography>
           
           {
            channelDetail[0]?.statistics?.subscriberCount && (
               <Typography>
                 { parseInt(channelDetail[0]?.statistics?.subscriberCount).toLocaleString('en-US')
                 } Subscribers
               </Typography>
             ) 
           }
          </CardContent>
         </Box>
         
        {/* Channel videos card start */}
          <Box display="flex" sx={{p:{sm:"2em"},}}>
            <Box sx={{ mr:{sm:"110px",} }}/>
            <Videos videos={channelVideos} />
          </Box>
          
       </Box>
    </Box>
    )
}

export default ChannelDetail;