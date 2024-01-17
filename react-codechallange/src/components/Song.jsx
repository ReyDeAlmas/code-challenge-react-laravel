
import minuteSeconds from "../tools/general"
import { useState } from "react";
import usePlaylist from "../hooks/usePlaylist";


export default function Song({track, isPlayList}) {

  
  const { id, title, duration, link, album,artist,img, added} = track
  const likeable = isPlayList ? isPlayList : added ;
  const [like, setLike] = useState(likeable);
  const {addTrack} = usePlaylist();
 
  const handleClickLike = () => {
    
    setLike(addTrack(track, like));
  }


  return (
    
    <div  className="w-full grid grid-cols-8 gap-4 px-2 py-1 rounded-md shadow-md bg-white" >
        <div className="w-full py-2  col-span-2">
            <img className=" object-cover rounded-md " src={`${img}`} alt="" />
        </div>
        <div className="w-full py-2 col-span-6  px-3  flex gap-1 justify-between ">
            <div className="flex items-star flex-col w-full">
              <h2 className=" text-2xl font-semibold">{title}</h2>
              <span>{artist}</span>
              <span className=" font-light">{minuteSeconds(duration)}</span>
              <a href={link} target="a_blank" className=" hover:underline text-blue-400">Eschucar en deezer</a>
            </div>
            
          <svg
          onClick={() => {

            handleClickLike();
          }}
          xmlns="http://www.w3.org/2000/svg" className={` cursor-pointer active:scale-95  hover:scale-105 transition-all duration-100 icon icon-tabler icon-tabler-heart-plus stroke-red-500 ${like ? 'fill-red-500 active:fill-none' : 'active:fill-red-500 fill-none'}`}  width="32" height="32" viewBox="0 0 24 24" >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
          </svg>

          
        </div>

    </div>
  )
}
