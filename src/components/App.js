import React from 'react';
import './App.css';
import AttractionsList from './attractionsList/AttractionsList';
import Statistics from './statistics/Statistics';
import Login from './login/Login';
import Register from './register/Register';
import EquipmentList from './equipment/EquipmentList';
import About from './about/About';
import HomePage from './homePage/HomePage';
import Order from './order/Order';
import WishList from './wishList/WishList';
import NewAttractions from './newAttractions/NewAttractions';
import { Routes, Route } from 'react-router';
import NavBar from './navBar/NavBar';
import EditAttraction from './editAttraction/EditAttraction';
import Message from './message/Message';
import UsersList from './usersList/UsersList';
import DetailsAttraction from './attractionsList/DetailsAttraction';
import Regions from './regions/Regions';
import OrdersList from './ordersList/ordersList';
import Test from '../test2';
import  Mail  from './order/Mail';
import Steppers from './order/Stepper';
import SelectTickets from './order/SelectTickets';
import  Details  from './order/Details';
import TransitionAlerts from './wishList/SweetAlert';
import Poppers from './attractionsList/popper/Popper';
import MyCalender from './order/Calender';

function App() {
  return (<>
  {/* <MyCalender/> */}
    <AttractionsList/>
    {/* <Mail/>  */}
    {/* <SelectTickets/> */}

   <WishList/>
   {/* <TransitionAlerts/> */}
    {/* <header className="head">
  </header> */}
   
    <Routes>
      <Route path="" element={<HomePage />} />
      <Route path="attractionsList" element={<AttractionsList />} />
      <Route path="regions" element={<Regions />} />
      <Route path="editAttraction/:id" element={<EditAttraction type="edit"/>} />
      <Route path="editAttraction" element={<EditAttraction type="new" />} />
      <Route path="exit" element={<AttractionsList />} />
      <Route path=""></Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="wishList" element={<WishList />} />
      <Route path="order/:flag/:type/:id" element={<Details />} >
        <Route path="equipmentList" element={<EquipmentList />} />
      </Route>

      {/* <Route path="order/:flag/:type/:id" element={<Order />} >
        <Route path="equipmentList" element={<EquipmentList />} />
      </Route> */}
     
      <Route path="about" element={<About />} />
      <Route path="homePage" element={<HomePage />} />
      <Route path="newAttractions" element={<NewAttractions />} />
      <Route path="message/:id/:type/:possible" element={<Message />} />
      <Route path="usersList" element={<UsersList />} />
      <Route path="orderList" element={<OrdersList />} />
      <Route path="statistics" element={<Statistics />} />
      <Route path="detailsAttraction/:id" element={<DetailsAttraction />} />
    </Routes>

       {/* <Route path="userNavBar" element={<UserNavBar />}>
        <Route path="login" element={<Login />} />
      </Route>
      <Route path="guestNavBar" element={<GuestNavBar />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="mangerAttractionNavBar" element={<MangerAttractionNavBar />}>
        <Route path="login" element={<Login />} />
      </Route> */}
      {/* <Route path="mangerWebSiteNavBar" element={<MangerWebSiteNavBar />}>
        <Route path="login" element={<Login />} />
      </Route> */}
    {/* <footer> אטרקציות צור קשר 03-9378755 </footer> */}
  </>);
}

export default App;
