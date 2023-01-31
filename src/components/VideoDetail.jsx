import {Box,Typography, Stack} from "@mui/material"
import {useState, useEffect } from "react"
import {Link,useParams} from "react-router-dom"
import {CheckCircle} from "@mui/icons-material"
import ReactPlayer from "react-player/youtube"
import Videos from "./Videos"
import {fetchFromApi } from "../utils/fetchFromApi"


const VideoDetail = ()=>{
  const [videoDetail,setVideoDetail] = useState(null)
  const [relatedVideos,setRelatedVideos] = useState([])
  const {id} = useParams();
 
 
  useEffect(()=>{
    fetchFromApi(`videos?part=snippet,statistics&id=${id}`).then((data)=>setVideoDetail(data)).catch((err)=>console.log("videoDetail error :",err)) 
    
    //fetching related videos by videoId
    fetchFromApi(`search?part=snippet&relatedToVideoId=${id}`).then((data)=>setRelatedVideos(data?.items)).catch((err)=>console.log("related video fetching error",err))
  },[id]) 
 //console.log("relatedVideos fron video",relatedVideos)
  if(!videoDetail) return "Loading..."
  if(!videoDetail?.items[0]?.snippet) return "Loading...";
  const { snippet:{ title,channelId,channelTitle }, statistics:{ viewCount,likeCount } } = videoDetail.items[0];
   
  
  return(
    <Box>
       <Stack direction={{xs:"column",md:"row"}}>
         <Box flex={1} sx={{ width:"100%", position:"sticky",  top:0}}> 
           <Box 
             sx={{ width:"100%",position:"sticky",  top:"77px", background:"#000"}}
            >
             <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls/>
             <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title} 
             </Typography>
             <Stack 
              direction="row" 
              justifyContent="space-between" 
              sx={{ color:"#fff"}} py={1} px={2}
             >
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{ sm:"subtitle1", md:"h6"}} color="#fff">
                  {channelTitle}
                  <CheckCircle sx={{ fontSize:"12px",color:"gray",ml:"5px"}}/>
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity:0.7,}}>
                  {viewCount &&  parseInt(viewCount).toLocaleString()} Views
                </Typography>
                <Typography variant="body1" sx={{ opacity:0.7,}}>
                  {likeCount &&  parseInt(likeCount).toLocaleString()} Likes
                </Typography>
              </Stack>
             </Stack>
           </Box>
         </Box>
       
          <Box  py={{ md:1,xs:5}} justifyContent="center" alignItems="center">
              <Videos direction={"column"} videos={relatedVideos}/>
          </Box>
       </Stack>
    </Box>
    )
}

export default VideoDetail
