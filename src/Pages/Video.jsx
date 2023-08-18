import Header from '../Component/Header';
import VideoPlay from '../Component/Video-Play';
import CommentList from '../Component/Comment-List';
import ProductList from '../Component/Product-List';
import AddProduct from '../Component/Add-Product';
import CommentForm from '../Component/Comment-Form';
import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import '../Styles/Video.css';
import '../Styles/Fonts.css';

function Video({sessionToken, baseUrl}) {
    const { videoId } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return(
        <>
            <Header sessionToken={sessionToken}/>
            <div className="video-page fonts">
                {isModalOpen
                    ? <AddProduct isOpen={isModalOpen} onClose={closeModal} sessionToken={sessionToken} video_id={videoId} baseUrl={baseUrl}/>
                    : <div className='video-page-content'>
                        <div className='player'>
                            <div className='player-video'>
                                <VideoPlay id={videoId} sessionToken={sessionToken} baseUrl={baseUrl}/>
                            </div>

                            <div className='player-product'>
                                <ProductList id={videoId} openModal={openModal} baseUrl={baseUrl}/>
                            </div>
                        </div>

                        <div className='comment'>
                            <div className='comment-list'>
                                <CommentList id={videoId} baseUrl={baseUrl}/>
                            </div>

                            <div className='comment-form'>
                                <CommentForm video_id={videoId} baseUrl={baseUrl}/>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    );
}

export default Video;