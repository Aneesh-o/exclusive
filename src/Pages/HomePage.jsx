import React from 'react'
import Navbar from '../Components/Navbar'
import Banner from '../Components/Banner'
import ProductCard from '../Components/ProductCard'
import { Col, Row } from 'react-bootstrap'

const HomePage = () => {
    return (
        <>
            <Navbar />

            <Banner />
            <div className="container" >
                <h3 className="text-center mb-5">Big Deals are under</h3>
                <ProductCard />
            </div>
        </>
    )
}

export default HomePage