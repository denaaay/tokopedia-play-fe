import '../Styles/Comment-List.css';
import '../Styles/Fonts.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CommentList({id, baseUrl}) {
    const [data, setData] = useState([]);
    const session = localStorage.getItem('sessionToken');
    const navigate = useNavigate();

    useEffect(() => {
        const link = `${baseUrl}/comment/${id}`
        fetch(link, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${session}` 
            }
        })
          .then(response => response.json())
          .then(responseData => {
            if (responseData.status_code === 200) {
              setData(responseData.data);
            } else if (responseData.status_code === 403){
                localStorage.setItem('sessionToken', '');
                navigate('/login');
            } else {
                alert('Error fetching videos:', responseData.message);
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error)
          });
      }, [baseUrl, id, navigate, session]);

    return(
        <div className='fonts'>
            <h6>Comment List</h6>
            <div className='comment-border'></div>
            {data.length === 0
                ? <p>Beum ada komentar</p>
                : <>
                    {data.map(comment => (
                        <div className="comment-lists">
                            <div className='comment-colom'>
                                <p className="comment-data">{comment.user.username}<span> • {comment.comment}</span></p>
                            </div>
                            <div></div>
                        </div>
                    ))}
                </>
            }
        </div>
    );
}   

export default CommentList;