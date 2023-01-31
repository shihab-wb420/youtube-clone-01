import {Box,Stack} from "@mui/material"
import VideoCard from "./VideoCard"
import ChannelCard from "./ChannelCard"


const Videos = ({videos, direction})=>{
  if(!videos) return "Loading...";
  //console.log(videos)
  
  return(
    <Stack  
     direction={ direction || "row" }
     flexWrap="wrap"
     sx={{
      alignItems:{xs:"center"},
      justifyContent:{xs:"center",md:"start"},
      marginLeft:{md:"2.4em"},
      gap:{xs:"0.4em ", md:"1em"},
     }}
    > 
     {!videos && (<h3 style={{color:"#fff"}}> Loading...</h3>)}
     {
      videos && videos.map((item,idx)=>{
         return(
             <Box key={idx}
              sx={{
               
              }}
             >
               { item?.id?.videoId && <VideoCard video={item}/>}
               { item?.id?.channelId && <ChannelCard channelDetail={item}/>}
             </Box>
         )
       })
     }
    </Stack>
    )
}

export default Videos
