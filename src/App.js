import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from "./Routes"
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
// import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import {isJsonString} from "./untils"
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux'
import * as UserService from "./service/UserService"
import { updateUser } from './redux/slides/userSlide'
function App() {
  // const fetchApi = async () => {
  //   const res = await axios.get(`http://localhost:3001/api/product/all-product`)
  //   return res.data
  // }
  // const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
  // console.log('query', query)
  const dispatch = useDispatch()
  useEffect(() => {
    let storageData = localStorage.getItem('access_token') 
    console.log('storageData', storageData, isJsonString(storageData))
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData)
      const decoded = jwt_decode(storageData)
      console.log('decoded', decoded)
      if (decoded?.id) {
        handleGetDetailsUser(decoded?.id, storageData);
      }
    }
  }, [])
  const handleGetDetailsUser = async (id, token) => {
    // lay duoc du lieu tu backend
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };
  return (
    <div>
      <Router>
        <Routes>
          {
            routes.map((route) => {
              const Page = route.page
              // bien the cua DefaultComponent
              const Layout = route.isShowheader ? DefaultComponent : Fragment
              return (
                <Route key={route.path} path={route.path} element={<Layout><Page /></Layout>} />
              )
            })
          }
        </Routes>
      </Router>
    </div>
  )
}
export default App