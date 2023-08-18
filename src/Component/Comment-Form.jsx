import React, { useState } from 'react';
import '../Styles/Comment-Form.css';

function CommentForm({video_id, baseUrl}) {
    const [comment, setComment] = useState('');
    const session = localStorage.getItem('sessionToken');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
          const response = await fetch(`${baseUrl}/comment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${session}`
            },
            body: JSON.stringify({ comment, video_id }),
          });
    
          if (response.status === 201) {
            window.location.reload();
          } else {
            // Tampilkan pesan kesalahan
            const data = await response.json();
            alert(data.message);
          }
        } catch (error) {
          alert("error during add comment", error);
        }
      };

    return(
        <div>
            <form onSubmit={handleSubmit} className='comment-form-add'>
                <label><h6>Add Comment</h6></label>
                <textarea
                type="text"
                name="comment"
                rows={2}
                onChange={(e) => setComment(e.target.value)}/>
                <button className='form-video-button' type="submit">Comment</button>
            </form>
            
        </div>
    );
}

export default CommentForm;