import Footer from "../../Components/homepageComponents/Footer/Footer"
import Header from "../../Components/homepageComponents/Header/Header"
import HowitWork from "../../Components/homepageComponents/How it work/HowitWork"
import Navbar from "../../Components/homepageComponents/Navbar/Navbar"
import Popular from "../../Components/homepageComponents/PopularRestaurant/Popular"
import RestaurantAndEvents from "../../Components/homepageComponents/Restaurant or Events/RestaurantAndEvents"
import Reviews from "../../Components/homepageComponents/reviews/reviews"
import "./Home.css"

function Home() {
  return (
    <div>
      <div className="fixedheader">
        <Navbar/>
        <Header/>
      </div>
   
    <HowitWork/>
    <RestaurantAndEvents/>
    <Popular/>
    <Reviews/>
    <Footer/>
    </div>
  )
}

export default Home
