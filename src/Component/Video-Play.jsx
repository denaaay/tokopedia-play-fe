// z-OWa6Bsn1o
import YouTube from 'react-youtube';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function VideoPlay({id, baseUrl={baseUrl}}) {
    const [data, setData] = useState({});
    const session = localStorage.getItem('sessionToken');
    const navigate = useNavigate();

    useEffect(() => {
        // Lakukan permintaan GET ke endpoint
        const link = `${baseUrl}/video/${id}`
        fetch(link, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${session}` // Sertakan token sesi dalam header
            }
        })
          .then(response => response.json())
          .then(responseData => {
            if (responseData.status_code === 200) {
              setData(responseData.data); // Simpan data dalam variabel state
            } else if (responseData.status_code === 403){
                localStorage.setItem('sessionToken', '');
                alert('Error, Please Log In first');
                navigate('/login');
            } else {
                alert('Error fetching videos:', responseData.message);
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error)
          });
      }, []);

    const opts = {
        width: '100%',
        height: '290vh',
        playerVars: {
            autoplay: 1,
        },
    };
    
    return(
        <YouTube videoId={data.url_video} opts={opts} />
    );
}

export default VideoPlay;