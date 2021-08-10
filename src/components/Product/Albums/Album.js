import React,{useState,useEffect} from 'react'
import {Card} from 'react-bootstrap'

const Album = ({ album, updateAlbum, deleteAlbum }) => {
  
    const removeAlbum = () => {
        deleteAlbum(album._id)
    }
  
    const [editForm, setEditForm] = useState(album)

    const handleChange = (e) => {
        if (e.target.name === 'tracklist') {
            setEditForm({ ...editForm, [e.target.name]: e.target.value.split(',') })
        } else {
            setEditForm({ ...editForm, [e.target.name]: e.target.value })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateAlbum(editForm, album._id)
    }


    // useEffect(() => {
    //     setEditForm(Album)
    // }, [Album]);
    
    return (
        <>
            <Card>
            <div>{album.title}</div>
            <img src={album.cover} alt='cover'/>
            <ul>
                {album.tracklist.map((track, index) =>
                    <li key={index}>{track}</li>
                )}
            </ul>
            <div>Release Date: {album.releaseDate.split('T')[0]}</div>
            <div>Price: ${album.price}</div>
            <button onClick={removeAlbum}>Delete</button>
            </Card>
            
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input type="text" name='title' value={editForm.title} onChange={handleChange}/>
                <label>Cover</label>
                <input type="text" name='cover' value={editForm.cover} onChange={handleChange}/>
                <label>Tracklist</label>
                <input type="text" name='tracklist' value={editForm.tracklist} onChange={handleChange} />
                <label>Release Date</label>
                <input type="date" name='releaseDate' value={editForm.releaseDate} onChange={handleChange} />
                <label>Price</label>
                <input type="number" name='price' value={editForm.price} onChange={handleChange} />
                <input type="submit" value='Update' />
            </form>
        </>
    )
}

export default Album
