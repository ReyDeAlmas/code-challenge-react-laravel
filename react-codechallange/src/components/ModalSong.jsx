import useSWR from "swr";
import Modal from "react-modal"
import clienteAxios from "../../config/axios";
import usePlaylist from "../hooks/usePlaylist";
import Song from "./Song";
import { useEffect } from "react";

const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  }

export default function ModalSong() {

    const {modal, playList, handleAjaxResponse, handleClickModal} =  usePlaylist(); 
    

    

  return (
    <>
     {modal && (
          <Modal  isOpen={modal} style={customStyles} appElement={document.getElementById('layout_id')}>
            <div className=" w-full max-w-2xl min-w-[60vw]  py-2 relative">
              <div className=" w-full my-1 flex justify-end border-b-2 border-slate-400">
                  <button
                  type="button"
                  onClick={()=>{
                    handleClickModal()
                   
                  }} 
                  className=" text-lime-400 font-bold cursor-pointer hover:underline active:scale-95">Cerrar (X)</button>
              </div>
            </div>
            <div className="w-full my-2 container mx-auto bg-slate-100 grid md:grid-cols-2 px-2 gap-2 py-3">
            {playList && playList.length > 0 ? (
                  playList.map((track) => (
                  <Song
                      
                      key={track.id}
                      track={track}
                      isPlayList={true}
                      
                  />
                  ))
              ) : (
                  <p>No hay pistas disponibles</p>
              )}
            </div>
          </Modal>
        )}
        </>
  )
}
