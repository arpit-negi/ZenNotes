import Navbar from '../components/Nabar'
import NoteCard from '../components/NoteCard'  
import { useState } from 'react'
import { useEffect } from 'react';
import api from '../lib/axios';
import RateLimitedUI from '../components/RateLimitedUI';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import NotesNotFound from '../components/NotesNotFound';


const HomePage = () => {
    const [isRateLimited,setIsRateLimited] = useState(false);
    const [notes,setNotes] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(() =>{
        const fetchNotes = async () =>{
            try {
                const res = await api.get("/notes");
                console.log(res.data);
                setNotes(Array.isArray(res.data.notes) ? res.data.notes : []);
                setIsRateLimited(false);
            }catch(error){ 
                console.log("error fetchxing notes");
                console.log(error);
                if(error.response?.status === 429){
                    setIsRateLimited(true);
                } else {
                    toast.error("Failed to load notes")
                }
            }finally {
                setLoading(false);
            }
        };

        fetchNotes();

    },[])

  return (
    <div className='min-h-screen'>
      <Navbar/>
        
    {isRateLimited && <RateLimitedUI/>}
    <div className='max-w-7xl mx-auto p-4 mt-6'>
         {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

         {Array.isArray(notes) && notes.length ===0 && !loading && !isRateLimited && <NotesNotFound/>}

    {Array.isArray(notes) && notes.length > 0 && !isRateLimited && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}


    </div>

    </div>
  )
}

export default HomePage
