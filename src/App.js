import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from "./Routes"
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
function App() {
  // useEffect(() => {
  //   fetchApi()
  // }, [])
  const fetchApi = async () => {
    const res = await axios.get(`http://localhost:3001/api/product/all-product`)
    return res.data
  }
  const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
  console.log('query', query)
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