import React, { useState, useEffect } from "react";
import AlbumForm from './AlbumForm'
import Album from './Album'

const Albums = (props) => {
  const [albums, setAlbums] = useState([]);
 
  const albumsUrl = "http://localhost:5000/albums/";

  const getAlbums = async () => {
    const response = await fetch(albumsUrl);
    const data = await response.json();
    setAlbums(data);
  };

  const createAlbum = async (album, id) => {
    await fetch(albumsUrl, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(album),
    }).then(console.log(album));
    getAlbums();
  };

  const updateAlbum = async (album, id) => {
    await fetch(albumsUrl + id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(album),
    });
    getAlbums();
  };

  const deleteAlbum = async (id) => {
    await fetch(albumsUrl + id, {
      method: "delete",
    });
    getAlbums();
  };



  useEffect(() => {
      getAlbums();
  }, []);

    

  return (
    <>
      <AlbumForm createAlbum={createAlbum} />
        {albums.map((album, index) => (
            <Album key={index} album={album} updateAlbum={updateAlbum} deleteAlbum={deleteAlbum} />
        ))}
              
    </>
  )
};

export default Albums;
