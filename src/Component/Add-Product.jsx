import '../Styles/Add-Content.css';
import '../Styles/Add-Product.css';
import React, { useState } from 'react';

function AddProduct({isOpen, onClose, children, sessionToken, video_id, baseUrl}) {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [link, setLink] = useState('');
    if (!isOpen) return null;

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            console.log(baseUrl);
            const response = await fetch(`${baseUrl}/product`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionToken}`
                },
                body: JSON.stringify({ title, price, link, video_id }),
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
            <div className="modal-content video product">
                <form onSubmit={handleSubmit} className='video-form'>
                {children}
                    <div className='modal-title'>
                        <h6>Add Product</h6>
                        <button className="modal-close" onClick={onClose}>
                            x
                        </button>
                    </div>
                    <div className='form-video'>
                        <label> Title : </label>
                        <input
                        type="text"
                        name="title"
                        onChange={(e) => setTitle(e.target.value)}/>
                        <label> Price : </label>
                        <input
                        type="number"
                        name="price"
                        onChange={(e) => setPrice(e.target.value)}/>
                        <label> Link : </label>
                        <input
                        type="text"
                        name="link"
                        onChange={(e) => setLink(e.target.value)}/>
                    </div>
                    <button className='form-video-button' type="submit">Add Product</button>
                </form>
            </div>
        </div>
      );
}

export default AddProduct;