
import { createContext, useState, useEffect } from 'react'
import clienteAxios from '../../config/axios';
import { toast } from 'react-toastify';

const PlaylistContext = createContext();


const PlaylistProvider = ({children}) => {

    const [modal, setModal] = useState(false);
    const [playList, setPlayList] = useState([]);
    const [searchTitle, setSearchTitle] = useState('Top Ten Mexico');
    const [search, setSearch] = useState('');
    const [tracks, setTracks] = useState([]);

    

    const getPlaylist = async () => {
        try {
            const {data} = await clienteAxios('/playlist')
          
            setPlayList(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPlaylist();
    }, [])
    
    

    const addTrack = (track, like) => {

        const existingTrackIndex = playList.findIndex((existingTrack) => existingTrack.id === track.id);

       
        if (existingTrackIndex === -1) {
            
           

            clienteAxios.post('/playlist',  track )
            .then(response => {
                console.log('Respuesta de Laravel:', response.data);
                setPlayList([...playList, track]);
                toast.success('Añadido a tu play list');
               
            })
            .catch(error => {
                
                toast.error("Algo ha salido mal, intentalo de nuevo")
                return false;
            });

            



        } else {
            clienteAxios.delete(`/playlist/${track.id}`)
            .then(response => {
                console.log('Respuesta de Laravel:', response.data);
               
                const updatedPlayList = [...playList];
                updatedPlayList.splice(existingTrackIndex, 1);
                setPlayList(updatedPlayList);
                toast.warn('Eliminado de tu playlist');
             
               
            })
            .catch(error => {
                
                toast.error("Algo ha salido mal, intentalo de nuevo")
                return false;
            });
         
         
            return false;
        }

        return true;


      
 
        
    }

    const handleClickModal = () =>{
        setModal(!modal)
    }

    const handleAjaxResponse = newPlaylist => {
        setPlayList(newPlaylist)
    }

    

 

    return(
        <PlaylistContext.Provider
        value={{
            modal,
            handleClickModal,
            addTrack,
            playList,
            handleAjaxResponse,
            searchTitle,
            tracks,
            setTracks,
            setSearchTitle
           
        }}
        >
        {children}
        </PlaylistContext.Provider>
    )
}

export  {
    PlaylistProvider
}

export default PlaylistContext