import React from 'react'
import Footer from '../../../Components/homepageComponents/Footer/Footer'
import VendorDocumentSection from '../../../Components/VendorComponents/VendorDocument/VendorDocumentSection'
import VendorHero from '../../../Components/VendorComponents/VendorHero/VendorHero'
import VendorHowitWork from '../../../Components/VendorComponents/VendorHowitwork/VendorHowitWork'
import Vendornavbar from '../../../Components/VendorComponents/VendorNavbar/Vendornavbar'
import WhyUs from '../../../Components/VendorComponents/Vendorwhyus/WhyUs'

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
