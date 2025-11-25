import Note from "../models/Note.js"

export async function getAllNotes(_,res) {
    try{
        const notes = await Note.find().sort({createdAt: -1}); //newest first
        res.status(200).json(notes)

    } catch(error) {
        console.log("error in getAllNotes controller",error);
        res.status(500).json({message:"Internal Server error"});
    }
}

export async function getNoteById(req,res) {
    try{
        const note = await Note.findById(req.params.id);
        if(!note) return(404).json({message:"NOte not found"});
        res.json(note);
    }catch(error){
        console.log("error in getNoteById controller",error);
        res.status(500).json({message:"Internal Server error"});

    }

}
export async function createNote(req,res) {
    try{
    const {title,content} = req.body;
    const note = new Note({title,content});

    const savedNote = await note.save();
    res.status(201).json(savedNote);
    }catch(error){
        console.log("error in createNote controller",error);
        res.status(500).json({message:"Internal Server error"});
    }
}




export async function updateNote(req,res) {
    try{
    const {title,content} = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title,content},{
        new:true,
    });
    if(!updateNote) return res.status(404).json({message:"Note not found"})
    res.status(200).json({message:"Note Updated scuess"});
    } catch(error){
        console.log("error in updateNote controller",error);
        res.status(500).json({message:"Note not found"});
    }
}

export async function deleteNote(req,res) {
    try{
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote) return res.status(404).json({message:"Note not found"});
        res.status(200).json({message:"Note deleted successfullly"});

    } catch(error){
        console.log("error in deleteNote controller",error);
        res.status(500).json({message:"Note not found"});

    }

}




