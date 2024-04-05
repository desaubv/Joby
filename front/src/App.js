/* import { socket } from './socket'; */
import { Routes, Route } from 'react-router-dom'
/* IMPORTACION DE PAGINAS */
import Homepage from './content/Homepage';
import LandingPage from './content/LandingPage';
import Login from './content/Login';
import SignUp from './content/SignUp'
import { Step1, Step2, Step3, Step4 } from './components/ui/Steps'

// RUTAS
import LoggedRoute from './routes/LoggedRoute';
import UnloggedRoute from './routes/UnloggedRoute';
import Logout from './content/Logout';
import Forgot from './content/Forgot';

function App() {

  /* socket.on('connect', ()=> {
    console.log('Connected');
  })

  socket.on('prueba', (data) => console.log(data)); */

  return (
    <div className="">
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/home' element={<Homepage />}/>
        <Route path='/login' element={ <UnloggedRoute> <Login /> </UnloggedRoute> } />
        <Route path='/signup' element={ <UnloggedRoute> <SignUp /> </UnloggedRoute> }/>
        <Route path='/step1' element={ <LoggedRoute> <Step1/> </LoggedRoute> } />
        <Route path='/step2' element={ <LoggedRoute> <Step2/> </LoggedRoute> } />
        <Route path='/step3' element={ <LoggedRoute> <Step3/> </LoggedRoute> } />
        <Route path='/step4' element={ <LoggedRoute> <Step4/> </LoggedRoute> } />
        <Route path='/logout' element={ <LoggedRoute> <Logout/> </LoggedRoute> } />
        <Route path='/forgot/:state' element={ <UnloggedRoute> <Forgot/> </UnloggedRoute> } />
      </Routes>
    </div>
  );
}

export default App;
