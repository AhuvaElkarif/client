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
import { Routes, Route, useNavigate, useLocation } from 'react-router';
import NavBar from './navBar/NavBar';
import EditAndAddAttraction from './editAndAddAttraction/EditAndAddAttraction';
import Message from './message/Message';
import UsersList from './usersList/UsersList';
import DetailsAttraction from './attractionsList/DetailsAttraction';
import OrdersList from './ordersList/ordersList';
import ActivityTime from './ActivityTime/ActivityTime';
import ReportsList from './reportsList/ReportsList';
import Category from './category/Category';
import Regions from './regions/Regions';
import PeriodDetails from './editAndAddAttraction/PeriodDetails';
import Order from './order/Order';
import UsersApprovals from './usersApprovals/UsersApprovals';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { stepButtonClasses } from '@mui/material';
import { changeLoginApp } from '../store/actions/LoginAppAction';
import { KeyOff } from '@mui/icons-material';
import { getAttractions } from '../store/actions/AttractionActions';
import { getOrders } from '../store/actions/OrderAction';
import { getCategories } from '../store/actions/CategoryAction';
import { getUsers } from '../store/actions/UserActions';
import { getStatistic } from '../store/actions/StatisticsAction';

function App() {
  const navigate = useNavigate();
  const path = useLocation();
  const dispatch = useDispatch();
  const { user, isApp } = useSelector(state => {
    return {
      isApp: state.loginApp,
      user: state.user
    }
  }, shallowEqual);

  useEffect(() => {
    dispatch(getAttractions());
    if (user)
      dispatch(getOrders())
    dispatch(getCategories());
    dispatch(getUsers());
    dispatch(getStatistic());
  }, [user]);

  useEffect(() => {
    if (!isApp) {
      console.log(path)
      if (path.pathname != "/") {
        navigate('/');
      }
      else {
        dispatch(changeLoginApp());
      }
    }
  }, [path])
  return (<div className='myApp'>
    <header>
      <span className='head' onClick={() => navigate("")}>
        <img src="../../images/img2.png" style={{ width: "25vw", height: "16vh", marginTop: "-1.5rem" }} />
      </span>
    </header>
    <NavBar />
    <Routes>
      <Route path="" element={<HomePage />} />
      <Route path="attractionsList/:type" element={<AttractionsList />} />
      <Route path="attractionsList/:type/:area" element={<AttractionsList />} />
      <Route path="editAttraction/:id" element={<EditAndAddAttraction type="edit" />} />
      <Route path="editAttraction" element={<EditAndAddAttraction type="new" />} >
        <Route path="period/:attractionId/:kind" element={<PeriodDetails />} />
      </Route>
      <Route path="exit" element={<AttractionsList />} />
      <Route path="reportsList" element={<ReportsList />} />
      <Route path="categoriesList" element={<Category />} />
      <Route path="period/:attractionId/:kind" element={<PeriodDetails />}></Route>
      <Route path="login/:type" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="wishList" element={<WishList />} />
      <Route path="activityTime/:id" element={<ActivityTime />} />
      <Route path="order/:id" element={<Order type={0} />} >
        <Route path="equipmentList" element={<EquipmentList />} />
      </Route>
      <Route path="order/:id/:orderId" element={<Order type={1} />} >
        <Route path="equipmentList" element={<EquipmentList />} />
      </Route>
      <Route path="regions" element={<Regions />} />
      <Route path="usersApprovals" element={<UsersApprovals />} />
      <Route path="about/:type" element={<About />} />
      <Route path="about" element={<About />} />
      <Route path="homePage" element={<HomePage />} />
      <Route path="message/:id/:type/:possible" element={<Message />} />
      <Route path="usersList" element={<UsersList />} />
      <Route path="orderList/:type" element={<OrdersList />} />
      <Route path="statistics" element={<Statistics />} />
      <Route path="detailsAttraction/:id/:type" element={<DetailsAttraction />} />
      <Route path="detailsAttraction/:id" element={<DetailsAttraction />} />
    </Routes>
  </div>);
}
export default App;
