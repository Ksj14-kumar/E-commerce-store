import Home from './Components/Home'
import { Route, Routes } from "react-router-dom"
import { isAuthenticate, useAppDispatch, useAppSelector } from './store'
import { useEffect, useRef } from 'react'
import { loadAllItemsIntoCart, setIsAuth, showAllProducts } from './slice/ItemSlice/Items'
import axios, { AxiosError } from 'axios'
import { toast, Toaster } from 'react-hot-toast'
import { io, Socket } from "socket.io-client"
import { useGetCartItemsMutation, useGetProductsQuery, useOnSuccessMutation } from './slice/api/apiSlice'
function App() {
  const dispatchItem = useAppDispatch()
  const isAuth = useAppSelector(isAuthenticate)
  const socket = useRef(io("/api/v1/nsp/address", {
    path: "/store",
    reconnection: false,
    withCredentials: true,
    transports: ["websocket"]
  }))
  const { data = [], isLoading, isSuccess, error, isError } = useGetProductsQuery("")
  const [onSuccess, { }] = useOnSuccessMutation()
  const [cartItems, { }] = useGetCartItemsMutation()
  useEffect(() => {
    (async function () {
      try {
        const res = await onSuccess("").unwrap()
        if (typeof res !== "number") {
          dispatchItem(setIsAuth({
            image: JSON.parse(JSON.stringify(res)).image
            ,
            isauth: true,
            id: res._id
          }))
        }
      } catch (err: unknown) {
        console.warn(err)
      }
    })()
  }, [dispatchItem, isLoading])
  useEffect(() => {
    (async function () {
      try {
        const res = await cartItems({ userId: isAuth.isHaveId }).unwrap()
        dispatchItem(loadAllItemsIntoCart(res))
      } catch (error: unknown) {
        const err = error as AxiosError
        console.warn(err)
      }
    })()
  }, [dispatchItem, isLoading])
  useEffect(() => {
    dispatchItem(showAllProducts(data))
  }, [])
  return (
    <div className="App h-full bg-[#dbe3ee]">
      <Home socket={socket.current} isLoading={isLoading} isSuccess={isSuccess} isError={isError} error={error} />
      <Toaster />
    </div>
  )
}
export default App
