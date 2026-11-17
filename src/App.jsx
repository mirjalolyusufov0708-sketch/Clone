import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Overview from "./pages/Overview"
import RootLayout from "./layouts/RootLayout"
import Repositories from "./pages/Repositories"



function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Overview />} />
        <Route path="/repositories" element={<Repositories />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App
