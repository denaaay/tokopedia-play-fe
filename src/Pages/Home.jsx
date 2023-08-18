import Header from '../Component/Header';
import Content from '../Component/Content';

function Home({baseUrl, onLogout, username, sessionToken}) {
    return(
        <>
            <Header sessionToken={sessionToken} onLogout={onLogout}/>
            <Content username={username} sessionToken={sessionToken} baseUrl={baseUrl}/>
        </>
    );
}

export default Home;