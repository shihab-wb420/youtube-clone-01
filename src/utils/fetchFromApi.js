import axios from "axios";

export const baseUrl = "https://youtube-v31.p.rapidapi.com"
const options = {
  params: {
    maxResults: '50',
  },
  headers: {
    'X-RapidAPI-Key':"a31321e27dmsha1ef6ba30b85517p15c19ejsne99fb939a1e3",
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};

export const fetchFromApi = async (url)=>{
try{
   const {data} = await axios.get(`${baseUrl}/${url}`, options)
   return data;
 }catch(err){
   console.log("api/fething error",err)
 }
}
 