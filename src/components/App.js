import React from 'react';
import './App.css';
import AttractionsList from './attractionsList/AttractionsList';
import Statistics from './statistics/Statistics';
import Login from './login/Login';
import Register from './register/Register';
import EquipmentList from './equipment/EquipmentList';
import About from './about/About';
import HomePage from './homePage/HomePage';
import WishList from './wishList/WishList';
import { Routes, Route } from 'react-router';
import NavBar from './navBar/NavBar';
import EditAndAddAttraction from './editAndAddAttraction/EditAndAddAttraction';
import Message from './message/Message';
import UsersList from './usersList/UsersList';
import DetailsAttraction from './attractionsList/DetailsAttraction';
import OrdersList from './ordersList/ordersList';
import Details from './order/Details';
import ActivityTime from './ActivityTime/ActivityTime';
import RegisterAndLogin from './RegisterAndLogin/RegisterAndLogin';
import ReportsList from './reportsList/ReportsList';
import Category from './category/Category';
import Regions from './regions/Regions';
import BottomNavigation from './bottomNavigation/ButtomNavigation';
import New from './navBar/New';
import AddImg from '../Test2';
import Steppers from './order/Stepper';
import DatePicker1 from './order/DatePicker';
import Gallery from './attractionsList/Gallery';
import GeneralTimes from './editAndAddAttraction/GeneralTimes';
import PeriodTime from './editAndAddAttraction/PeriodTime';
import PeriodDetails from './editAndAddAttraction/PeriodDetails';
import Calender from './order/Calender';
import Nisuiii from './homePage/Nisuiii';
import BannerExample from './Slide';
function App() {
  return (<>
  {/* <BannerExample/> */}
  {/* <DatePicker1/> */}
  {/* <AddImg/> */}
  {/* <Statistics/> */}
  {/* <Gallery id={19}/> */}
  {/* <PeriodTime id={19} type=""/>  */}
  {/* <GeneralTimes id={2} periodId={8} type=""/> */}
    {/* <Regions/> */}
    {/* <Nisuiii/> */}
    {/* <EditAndAddAttraction id={19} type=""/> */}
    {/* <MinimumDistanceSlider/> */}
    {/* <MyCalender/> */}
    {/* <Table/> */}
    {/* <Calender id={19}/> */}
    {/* <ActivityTime/> */}
    {/* <OrdersList/> */}
    {/* <Poppers/> */}
    {/* <RegisterAndLogin/> */}
    {/* <LongMenu/> */}
    {/* <SimplePopper/> */}
    {/* <Slideshow2/> */}
    {/* <AttractionsList/> */}
    {/* <Login type={2}/> */}
    {/* <Login/>
        <Register type={1}/> */}
    {/* <BannerExample/> */}
    {/* <Mail/>  */}
    {/* <Details/> */}
    {/* <Steppers id={19}/> */}
    {/* <SideNavBar/> */}
    {/* <WishList/> */}
    {/* <TransitionAlerts/> */}
    <header>

     <span className='head'> Discover Israel</span>
    </header>
    <NavBar />

    <Routes>
      <Route path="" element={<HomePage />} />
      <Route path="attractionsList/:type" element={<AttractionsList />} />
      <Route path="registerAndLogin/:id" element={<RegisterAndLogin />} />
      <Route path="editAttraction/:id" element={<EditAndAddAttraction type="edit" />} />
      <Route path="editAttraction" element={<EditAndAddAttraction type="new" />} />
      <Route path="exit" element={<AttractionsList />} />
      <Route path="reportsList" element={<ReportsList />} />
      <Route path="categoriesList" element={<Category />} />
      <Route path=""></Route>
      <Route path="period/:attractionId/:kind" element={<PeriodDetails/>}></Route>
      <Route path="login/:type" element={<Login />} />
      <Route path="register/:type" element={<Register />} />
      <Route path="wishList" element={<WishList />} />
      <Route path="activityTime/:id" element={<ActivityTime />} />
      <Route path="order/:flag/:type/:id" element={<Details />} >
        <Route path="equipmentList" element={<EquipmentList />} />
      </Route>

      {/* <Route path="order/:flag/:type/:id" element={<Order />} >
        <Route path="equipmentList" element={<EquipmentList />} />
      </Route> */}

      <Route path="regions" element={<Regions />} />
      <Route path="about/:type" element={<About />} />
      <Route path="homePage" element={<HomePage />} />
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
