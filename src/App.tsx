import './App.css';
import RouterConfig from './navigation/RouterConfig';
import "fontsource-roboto";
import React from 'react';
import './components/Topbar/ProfileBtn.css'

interface MyApp {

}

const App: React.FC<MyApp> = () => {

  return (
    <div className="App">
      <RouterConfig/>
    </div>
  );
}

export default App;
