import '../Styles/Thumbnail.css';

function Thumbnail({url_thumbnail, id}) {
    const link = `/video/${id}`
    return (
        <a href={link}>
            <div className="thumbnail">
                <img src={url_thumbnail} alt='foto'/>
            </div>  
        </a>
    );
}

export default Thumbnail;