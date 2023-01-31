import { icons} from "../utils/constants"
import {Stack} from "@mui/material"

const Sidebar =({selectedCategory,setSelectedCategory})=>{
  const {
    HomeIcon,CodeIcon,MusicNoteIcon,SchoolIcon,GraphicEqIcon, OndemandVideoIcon,SportsEsportsIcon,LiveTvIcon,FitnessCenterIcon,CheckroomIcon,FaceRetouchingNaturalIcon,TheaterComedyIcon,DeveloperModeIcon
  } = icons;
  
  const categories =[
   { name: 'New', icon: <HomeIcon /> },
  { name: 'Coding Ninja', icon: <CodeIcon />, },
  { name: 'Coding', icon: <CodeIcon />, },
  { name: 'ReactJS', icon: <CodeIcon />, },
  { name: 'NextJS', icon: <CodeIcon />, },
  { name: 'Music', icon: <MusicNoteIcon /> },
  { name: 'Education', icon: <SchoolIcon />, },
  { name: 'Podcast', icon: <GraphicEqIcon />, },
  { name: 'Movie', icon: <OndemandVideoIcon />, },
  { name: 'Gaming', icon: <SportsEsportsIcon />, },
  { name: 'Live', icon: <LiveTvIcon />, },
  { name: 'Sport', icon: <FitnessCenterIcon />, },
  { name: 'Fashion', icon: <CheckroomIcon />, },
  { name: 'Beauty', icon: <FaceRetouchingNaturalIcon />, },
  { name: 'Comedy', icon: <TheaterComedyIcon />, },
  { name: 'Gym', icon: <FitnessCenterIcon />, },
  { name: 'Crypto', icon: <DeveloperModeIcon />, },
  ]

 
  
  return(
     <Stack 
       direction="row"
       sx={{ 
         overflowY:"auto",
         height:{sx:"auto",md:"95%"},
         flexDirection:{md:"column"},
       }}
     >
        {
         categories.map((category,idx)=>{
         return(
          <button 
           key={category.name}
           onClick={()=>setSelectedCategory(category.name)}
           className="category-btn"
           style={{ background: category.name === selectedCategory && "#FC1503",
             color:"#fff"
           }}
          >
            <span style={{ 
             color: category.name === selectedCategory ? "#fff":" red",
             marginRight:"15px"
            }}
            > 
             {category.icon}
            </span>
            <span 
             style={{ opacity: category.name === selectedCategory ? "1":" 0.8" }}
            > 
              {category.name}
            </span>
          </button>
         )})
        }
       </Stack>
    )
}

export default Sidebar