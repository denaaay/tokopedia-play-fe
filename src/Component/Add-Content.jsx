import '../Styles/Add-Content.css';
import React, { useState } from 'react';

function AddContent({isOpen, onClose, children, sessionToken, baseUrl}) {
    const [video, setVideo] = useState('');
    const [url_thumbnail, setThumbnail] = useState('');
    if (!isOpen) return null;

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const parts = video.split('/');
            const url_video = parts[parts.length - 1];
            console.log(video);
            const response = await fetch(`${baseUrl}/video`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionToken}`
                },
                body: JSON.stringify({ url_video, url_thumbnail }),
            });

            if (response.status === 201) {
                onClose();
                window.location.reload();
            } else {
            // Tampilkan pesan kesalahan
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            alert("error during add video", error);
        }
    };

    return (
        <div className="modal">
            <div className="video">
                <form onSubmit={handleSubmit} className='video-form'>
                {children}
                    <div className='modal-title'>
                        <h6>Add Video</h6>
                        <button className="modal-close" onClick={onClose}>x</button>
                    </div>
                    <div className='form-video'>
                        <label>Url Video</label>
                        <input
                        type="text"
                        name="video"
                        placeholder="https://youtu.be/0uVVuq6l9xw"
                        onChange={(e) => setVideo(e.target.value)}/>
                        <label>Url Thumbnail</label>
                        <input
                        type="text"
                        name="url_thumbnail"
                        onChange={(e) => setThumbnail(e.target.value)}/>
                    </div>
                    <button className='form-video-button' type="submit">Coba</button>
                </form>
            </div>
        </div>
      );
}

export default AddContent;