import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from "./Routes"
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
// import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { isJsonString } from "./untils"
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux'
import * as UserService from "./service/UserService"
import { updateUser } from './redux/slides/userSlide'
import axios from 'axios'
function App() {
  // const fetchApi = async () => {
  //   const res = await axios.get(`http://localhost:3001/api/product/all-product`)
  //   return res.data
  // }
  // const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
  // console.log('query', query)
  const dispatch = useDispatch()
  useEffect(() => {
    const { storageData, decoded } = handleDecoded()
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
  }, [])
  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData)
      decoded = jwt_decode(storageData)
    }
    return { storageData, decoded }
  }
  UserService.axiosJWT.interceptors.request.use(async (config) => {
    // Do something before request is sent
    const currentTime = new Date()
    const { decoded } = handleDecoded()
    if(decoded?.exp < currentTime.getTime() / 1000) {
      const data = await UserService.refreshToken()
      config.headers['token'] = `Bearer ${data?.access_token}`
    }
    return config;
  }, (error) => {
    // Do something with request error
    return Promise.reject(error);
  });

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