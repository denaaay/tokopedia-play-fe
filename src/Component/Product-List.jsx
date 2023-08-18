import "../Styles/Product-List.css";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductList({id, openModal, baseUrl}) {
    const [data, setData] = useState([]);
    const session = localStorage.getItem('sessionToken');
    const navigate = useNavigate();

    useEffect(() => {
        // Lakukan permintaan GET ke endpoint
        const link = `${baseUrl}/product/${id}`
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
                navigate('/login');
            } else {
                alert('Error fetching videos:', responseData.message);
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error)
          });
      }, []);
    

    return(
        <div className="prod fonts">
            <div className="product-list">
                {data.length === 0 
                    ? (<p>Tidak Ada Produk</p>)
                    : (
                        <>
                    {data.map(product => (
                        <div className="product-content">
                            <div className="product-info">
                                <div className="product-name">
                                    <p>{product.title}</p>
                                </div>

                                <div className="product-price">
                                    <p>{product.price}</p>
                                </div>
                            </div>

                            <a href={product.link} className="product-link" rel="noreferrer">
                                <p>Beli</p>
                            </a>
                        </div>
                ))}
                        </>
                    )
                }
            </div>

            <div className="product-add">
                <a className="product-add-button" onClick={openModal}>
                    <p>Add Product</p>
                </a>
            </div>
        </div>
        
    );  
}

export default ProductList;