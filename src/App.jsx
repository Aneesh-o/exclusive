import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import 'bootstrap/dist/css/bootstrap.min.css';
import AddProduct from './Pages/AddProduct';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/add-product" element={<AddProduct />} />

        {/* Route for editing an existing product (with ID in URL) */}
        <Route path="/edit-product/:id" element={<AddProduct />} />      </Routes>
    </>
  )
}

export default App
