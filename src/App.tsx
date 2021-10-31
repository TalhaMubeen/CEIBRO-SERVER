import './App.css';
import RouterConfig from './navigation/RouterConfig';
import "fontsource-roboto";
import React from 'react';
import './components/Topbar/ProfileBtn.css'
import CreateProjectDrawer from './components/Projects/Create-Project/CreateProjectDrawer/CreateProjectDrawer';
import CreateTaskDrawer from './components/Tasks/Create-Task/CreateTaskDrawer';

interface MyApp {

}

const App: React.FC<MyApp> = () => {

  return (
    <div className="App">
      <CreateProjectDrawer/>
      <CreateTaskDrawer/>
      <RouterConfig/>
    </div>
  );
}

export default App;
