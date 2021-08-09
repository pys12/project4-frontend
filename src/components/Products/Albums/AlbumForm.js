import React,{useState} from 'react'

const AlbumForm = ({ createAlbum}) => {
     
    const [albumForm, setAlbumForm] = useState({
        title: "",
        cover: "",
        tracklist: [],
        releaseDate: Date,
        price: Number
    })

    const handleChange = (e) => {
       // console.log(e.target.name);
       setAlbumForm({...albumForm, [e.target.name]: e.target.value });
        //console.log(form)
      };
    
    const handleSubmit = (e) => {
        e.preventDefault()
        createAlbum(albumForm);
        setAlbumForm({
            title: "",
            cover: "",
            tracklist: [],
            releaseDate: Date,
            price: Number
        })
    }
    
    return (
          <>
              <form onSubmit={handleSubmit} >
                  <label>Title</label>
                  <input type="text" name='title' placeholder='Add a album name' value={albumForm.title} onChange={handleChange}/>
                  <label>Cover</label>
                  <input type="text" name='cover' placeholder='' value={albumForm.cover} onChange={handleChange}/>
                  <label>Tracklist</label>
                  <input type="text" name='tracklist' placeholder='' value={albumForm.tracklist} onChange={handleChange} />
                  <label>Release Date</label>
                  <input type="date" name='releaseDate' placeholder='' value={albumForm.releaseDate} onChange={handleChange} />
                  <label>Price</label>
                  <input type="number" name='price' placeholder='' value={albumForm.price} onChange={handleChange} />
                 <input type="submit" value='Add' />  
              </form>
          </>
         
        
    )
}

export default AlbumForm
