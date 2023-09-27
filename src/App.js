import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from "./Routes"
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
// import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { isJsonString } from "./untils"
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux'
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
  const user = useSelector((state) => state.user)
  useEffect(() => {
    // lấy storageData, decoded từ handleDecoded
    const { storageData, decoded } = handleDecoded()
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
  }, [])
  const handleDecoded = () => {
    // lấy access_token từ localStorage
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    // kiểm tra xem storageData có phải json không 
    if (storageData && isJsonString(storageData)) {
      // tiến hành parse json
      storageData = JSON.parse(storageData)
      // tiến hành giải mã payload trong storageData có chứa acccess_token
      decoded = jwt_decode(storageData)
    }
    return { storageData, decoded }
  }
  // xử lí refresh token 
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
              // const isCheckAuth = !route.isPrivate || user.isAdmin
              const Layout = route.isShowheader ? DefaultComponent : Fragment
              return (
                //path={isCheckAuth && route.path}
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