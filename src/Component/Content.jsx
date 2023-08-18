import Thumbnail from "./Thumbnail";
import React, { useState, useEffect } from 'react';
import '../Styles/Content.css';
import AddContent from "./Add-Content";

function Content({username, sessionToken, baseUrl}) {
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const openModal = () => {
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        // Lakukan permintaan GET ke endpoint
        fetch(`${baseUrl}/video`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionToken}` // Sertakan token sesi dalam header
              }
        })
          .then(response => response.json())
          .then(responseData => {
            if (responseData.status_code === 200) {
              setData(responseData.data); // Simpan data dalam variabel state
            } else {
              console.error('Error fetching videos:', responseData.message);
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error)
          });
      }, []);

    return(
        <div className="content fonts">
            {isModalOpen
                ? <AddContent isOpen={isModalOpen} onClose={closeModal} sessionToken={sessionToken} baseUrl={baseUrl}></AddContent>
                : <>
                    <div className="content-header">
                        {sessionToken !== ''
                            ? <p>Hallo, {username}!</p>
                            : <p>Hallo Dunia!</p>}
                        <a>
                            <button onClick={openModal}>Add Video</button>
                        </a>
                    </div>
                    {data.length === 0
                        ? <p>Belum Ada Video</p>
                        : <>
                            <div className="content-line"></div><div className="main-content">
                                {data.map(image => (
                                    <Thumbnail url_thumbnail={image.url_thumbnail} id={image._id}/>
                                ))}
                            </div>
                        </>
                    }
                </>
            }
        </div>
    );
}

export default Content;