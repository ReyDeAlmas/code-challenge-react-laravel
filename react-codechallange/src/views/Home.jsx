
import useSWR from "swr";
import Song from "../components/Song"
import usePlaylist from "../hooks/usePlaylist"
import clienteAxios from "../../config/axios";
import { createRef, useState } from 'react'




export default function Home() {

  const searchRef = createRef()

  const { tracks, setTracks } = usePlaylist();
  const { searchTitle, setSearchTitle } = usePlaylist();
  const [loading, setLoading] = useState(false);
  const fetcher = () => clienteAxios("/top").then(data =>
    setTracks(data.data)
  );


  const { data, error, isLoading, } = useSWR("/top", fetcher);
 
    const handleSubmit = async e => {
    setSearchTitle(searchRef.current.value);
      e.preventDefault();

      try{
        setLoading(true)
        const response = await clienteAxios(`/tracks?$search=${searchRef.current.value}`);
        setTracks(response.data)
        setLoading(false)
       
        
      }catch(error)
      {
        setLoading(false)
        console.log(error);
      }
  }


  if (isLoading||loading) return (
    <div className=" animate-pulse h-40 flex items-center text-center w-full container mx-auto">
      <p className="text-2xl font-bold text-center w-full italic">Cargando las <em className="text-cyan-500"> pistas...</em></p>
    </div>
  );




  return (
    <div className="w-full my-2 container mx-auto bg-slate-100">
      <h3 className="text-center  text-2xl">Busqueda: <span className="font-bold">{searchTitle}</span> </h3>
      <form 
      onSubmit={handleSubmit}
      className=" px-4">
        <div className="relative w-full min-w-[200px] h-11  ">
          <input
            className=" !bg-white w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer text-cyan-cyan-700 outline outline-0 focus:outline-0 disabled:bg-cyan-cyan-50 disabled:border-0 placeholder-shown:border placeholder-shown:border-cyan-cyan-200 placeholder-shown:border-t-cyan-cyan-200 focus:border-2 border-t-transparent focus:border-t-transparent border-cyan-cyan-200 focus:border-cyan-900"
            placeholder=" "
            name="search"
            id="search"
            ref={searchRef}
            
            />
            <label
              className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-cyan-cyan-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-cyan-cyan-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-slate-500 peer-focus:text-cyan-900 before:border-cyan-cyan-200 peer-focus:before:!border-cyan-900 after:border-cyan-cyan-200 peer-focus:after:!border-cyan-900">
                Buscar por nombre
          </label>
        </div>
        <div className=" w-full justify-end flex mt-0.5">
            <button
            type="submit"
            className="px-2 max-w-xs w-full text-lg  text-lime-800 font-semibold  mb-2 py-2 bg-lime-400 shadow-md rounded-md hover:bg-cyan-400 active:scale-95">
                      Buscar
          </button>
        </div>
      </form>
      <div className="w-full  px-2 py-2 grid md:grid-cols-2 gap-1 ">



        {tracks && tracks.length > 0 ? (
          tracks.map((track) => (
            <Song

              key={track.id}
              track={track}
              isPlayList={false}

            />
          ))
        ) : (
          <p>No hay pistas disponibles</p>
        )}

      </div>






    </div>
  )
}
