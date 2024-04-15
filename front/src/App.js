/* import { socket } from './socket'; */
import { Routes, Route } from 'react-router-dom'
/* IMPORTACION DE PAGINAS */
import Homepage from './content/Homepage';
import LandingPage from './content/LandingPage';
import Login from './content/Login';
import SignUp from './content/SignUp'
import { Step1, Step2, Step3, Step4 } from './components/ui/Steps'
import Profile from './content/Profile';
import Company from './content/Company'

// RUTAS
import LoggedRoute from './routes/LoggedRoute';
import UnloggedRoute from './routes/UnloggedRoute';
import Logout from './content/Logout';
import Forgot from './content/Forgot';
import Chats from './content/Chats';
import Chat from './content/Chat';
import AddCompany from './content/AddCompany';
import JoinCompany from './content/JoinCompany';
import Oportunity from './content/Oportunity';
import MyOportunities from './content/MyOportunities';
import AllApplies from './content/AllApplies';

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
        <Route path='/profile' element={ <LoggedRoute> <Profile /> </LoggedRoute> }/>
        <Route path='/company/:id'element={ <LoggedRoute> <Company /> </LoggedRoute> }/>
        <Route path='/chats'element={ <LoggedRoute> <Chats /> </LoggedRoute> }/>
        <Route path='/chat/:id'element={ <LoggedRoute> <Chat /> </LoggedRoute> }/>
        <Route path='/addcompany'element={ <LoggedRoute> <AddCompany /> </LoggedRoute> }/>
        <Route path='/joincompany'element={ <LoggedRoute> <JoinCompany /> </LoggedRoute> }/>
        <Route path='/oportunity/:id'element={ <LoggedRoute> <Oportunity /> </LoggedRoute> }/>
        <Route path='/myoportunities'element={ <LoggedRoute> <MyOportunities /> </LoggedRoute> }/>
        <Route path='/applies/:id'element={ <LoggedRoute> <AllApplies /> </LoggedRoute> }/>


      </Routes>
    </div>
  );
}

export default App;
