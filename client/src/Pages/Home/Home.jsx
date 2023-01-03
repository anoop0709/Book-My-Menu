import Header from "../../Components/Header/Header"
import HowitWork from "../../Components/How it work/HowitWork"
import Navbar from "../../Components/Navbar/Navbar"
import Popular from "../../Components/PopularRestaurant/Popular"
import RestaurantAndEvents from "../../Components/Restaurant or Events/RestaurantAndEvents"
import "./Home.css"

function Home() {
  return (
    <div>
    <Navbar/>
    <Header/>
    <HowitWork/>
    <RestaurantAndEvents/>
    <Popular/>
    </div>
  )
}

export default Home
