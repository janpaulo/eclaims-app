
import './App.css';
import NavItems from './shared/NavItem';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Dashboard from './../src/pages/home/dashboard';

import MainRegistration from '../src/pages/eclaims/mainForms'
import EsoaRegistration from '../src/pages/esoa/mainForms'
import EsoatableList from '../src/pages/esoa/tableList'
import ClaimTableList from '../src/pages/eclaims/tableList'
// import XMLEncryptor from '../src/pages/encryptors/XMLEncryptor'
import XMLEncryptor from '../src/pages/esoa/samplecryptors'
import ICDCodes from '../src/pages/icd_rsc_codes/icdCodes'
import RVSCodes from '../src/pages/icd_rsc_codes/rvsCodes'
import HopitalRoleAccount from '../src/pages/users/HopitalRoleAccount'
import {Roles} from '../src/pages/users/Roles'
import {Main} from '../src/pages/hospitals/Main'
import {CF4Main} from './pages/cf4Forms/CF4Main'
import CF4Form from './pages/cf4Forms/CF4Form'
import {CF3Main} from './pages/cf3Forms/CF3Main'
import CF3Form from './pages/cf3Forms/CF3Form'
import {CF5Main} from './pages/cf5Forms/CF5Main'
import CF5Form from './pages/cf5Forms/CF5Form'
import {CSFormMain} from './pages/csForms/CSFormMain'
import CSForm from './pages/csForms/CSForm'
import MainCf1 from './pages/eclaimsV2/Main'
import MainEsoa from './pages/esoaV2/Main'

// import Itembills from '../src/pages/esoa/Itembills'

import Login from '../src/pages/login/Login';
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";


function App() {
    // Retrieve the object from storage
    var get_user = localStorage.getItem('item');
    var parseUser = JSON.parse(get_user)
    // console.log(JSON.parse(get_user))
  return (
    <>
    {get_user != null ? 
      <Box sx={{ display: 'flex' }}>
          <BrowserRouter>
            <NavItems />

            <CssBaseline />

            <Container maxWidth="xl" style={{marginTop: '70px'}}>
              
                <Routes>
                  <Route exact path="/"  element={ <Dashboard authDetails={parseUser}/> } />
                  <Route exact path="/claims_registration"  element={ <MainRegistration authUser={parseUser}/> } />
                  <Route exact path="/claims"  element={ <ClaimTableList authUser={parseUser}/> } />
                  <Route exact path="/esoa_table_list"  element={ <EsoatableList authUser={parseUser}/> } />
                  <Route exact path="/esoa_registration"  element={ <EsoaRegistration authUser={parseUser}/> } />
                  <Route exact path="/encryptor"  element={ <XMLEncryptor/> } />
                  <Route exact path="/icd_codes"  element={ <ICDCodes/> } />
                  <Route exact path="/rvs_codes"  element={ <RVSCodes/> } />
                  <Route exact path="/hospital-users-accounts"  element={ <HopitalRoleAccount /> } />
                  <Route exact path="/hospitals"  element={ <Main authUser={parseUser}/> } />
                  <Route exact path="/Roles"  element={ <Roles authUser={parseUser}/> } />
                  <Route exact path="/cf4"  element={ <CF4Main authUser={parseUser}/> } />
                  <Route exact path="/cf4_forms"  element={ <CF4Form authUser={parseUser}/> } />
                  <Route exact path="/cf3"  element={ <CF3Main authUser={parseUser}/> } />
                  <Route exact path="/cf3_forms"  element={ <CF3Form authUser={parseUser}/> } />
                  <Route exact path="/cf5"  element={ <CF5Main authUser={parseUser}/> } />
                  <Route exact path="/cf5_forms"  element={ <CF5Form authUser={parseUser}/> } />
                  <Route exact path="/claim-signature-form"  element={ <CSFormMain authUser={parseUser}/> } />
                  <Route exact path="/csignature_forms"  element={ <CSForm authUser={parseUser}/> } />
                  <Route exact path="/cf1"  element={ <MainCf1 authUser={parseUser}/> } />
                  <Route exact path="/esoa"  element={ <MainEsoa authUser={parseUser}/> } />
                  
                </Routes>

              </Container>
          </BrowserRouter>

      </Box>
    : <Login/>  }
   </>
  );
}

export default App;
