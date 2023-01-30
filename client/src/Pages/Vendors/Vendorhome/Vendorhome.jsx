import React from 'react'
import Footer from '../../../Components/userhomepageComponents/Footer/Footer'
import VendorDocumentSection from '../../../Components/VendorComponents/vendorLoggedoutHomepage/VendorDocument/VendorDocumentSection'
import VendorHero from '../../../Components/VendorComponents/vendorLoggedoutHomepage/VendorHero/VendorHero'
import VendorHowitWork from '../../../Components/VendorComponents/vendorLoggedoutHomepage/VendorHowitwork/VendorHowitWork'
import Vendornavbar from '../../../Components/VendorComponents/vendorLoggedoutHomepage/VendorNavbar/Vendornavbar'
import WhyUs from '../../../Components/VendorComponents/vendorLoggedoutHomepage/Vendorwhyus/WhyUs'

function Vendorhome() {
  return (
    <div>
        <div>
            <Vendornavbar/>
            <VendorHero/>
            <VendorDocumentSection/>
            <WhyUs/>
            <VendorHowitWork/>
            <Footer/>
        </div>
      
    </div>
  )
}

export default Vendorhome
