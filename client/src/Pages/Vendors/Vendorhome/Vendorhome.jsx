import React from 'react'
import VendorDocumentSection from '../../../Components/VendorComponents/VendorDocument/VendorDocumentSection'
import VendorHero from '../../../Components/VendorComponents/VendorHero/VendorHero'
import VendorHowitWork from '../../../Components/VendorComponents/VendorHowitwork/VendorHowitWork'
import Vendornavbar from '../../../Components/VendorComponents/VendorNavbar/Vendornavbar'

function Vendorhome() {
  return (
    <div className="vendorContainer">
        <div className="vendorWrapper">
            <Vendornavbar/>
            <VendorHero/>
            <VendorDocumentSection/>
            <VendorHowitWork/>
        </div>
      
    </div>
  )
}

export default Vendorhome
