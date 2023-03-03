import Footer from "../../../Components/userhomepageComponents/Footer/Footer"
import Header from "../../../Components/userhomepageComponents/Header/Header"
import HowitWork from "../../../Components/userhomepageComponents/How it work/HowitWork"
import Navbar from "../../../Components/userhomepageComponents/Navbar/Navbar"
import Popular from "../../../Components/userhomepageComponents/PopularRestaurant/Popular"
import RestaurantAndEvents from "../../../Components/userhomepageComponents/Restaurant or Events/RestaurantAndEvents"
import Reviews from "../../../Components/userhomepageComponents/reviews/Reviews"
import "./Home.css"

function Home() {
  return (
    <div>
      <div className="fixedheader">
        <Navbar/> 
      </div>
    <Header/>
    <RestaurantAndEvents/>
    <HowitWork/>
    <Popular/>
    <Reviews/>
    <Footer/>
    </div>
  )
}

export default Home
