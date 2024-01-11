import React, { useState, useEffect } from 'react';
import NavBar from './Components/NavBar/NavBar';
import './App.css';
import Banner from './Components/Banner/Banner';
import RowPost from './Components/RowPost/RowPost';
import Animation from './Animation'; // Import your Animation component
import { horror, orginals, action, comedy, documentaries, romance } from './urls';

function App() {
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    const animationDuration = 5000;

    const timeoutId = setTimeout(() => {
      setAnimation(true);
    }, animationDuration);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="App">
      {!animation && <Animation />}
      {animation && (
        <>
          <NavBar />
          <Banner />
          <RowPost url={orginals} title={"Netflix orginals"} />
          <RowPost url={horror} title={"Horror from netflix"} isSmall />
          <RowPost url={action} title={"Super actions"} isSmall />
          <RowPost url={comedy} title={"Fun with us"} isSmall />
          <RowPost url={documentaries} title={"Documentaries"} isSmall />
          <RowPost url={romance} title={"Romance"} isSmall />
        </>
      )}
    </div>
  )
}

export default App
