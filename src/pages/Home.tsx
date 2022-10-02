import React from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import ChatRoom from '../components/ChatRoom';

const useStyles = createUseStyles((theme: AppTheme) => ({
    container: {
        display: 'grid',
        gridTemplateColumns: '100px 1fr',
        height: '100%'
    }
}));

const Home = () => {
    const theme = useTheme<AppTheme>();
    const styles = useStyles({theme});

  return (
    <div className={styles.container}>
        <nav style={{
            backgroundColor: 'black'
        }}></nav>
        <div>
            <ChatRoom />
        </div>
    </div>
  )
}

export default Home