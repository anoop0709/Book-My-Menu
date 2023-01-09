import './Footer.css'

function Footer() {
  return (
    <div>
      <div className="footerContainer">
          <div className="footerWrapper">
              <div className="footerList">
                  <ul>
                      <li className="listItem">About us</li>
                      <li className="listItem">Services</li>
                      <li className="listItem">Contact us</li>
                  </ul>
              </div>
              <div className="footerList">
                  <ul>
                      <li className="listItem">Bussiness with us</li>
                      <li className="listItem">Carrier</li>
                      <li className="listItem">Investors</li>
                  </ul>
              </div>
              
          </div>
          <div className="copyright">
          <p>copyright @anoopsukumarannair 2023</p>

          </div>
      </div>
    </div>
  )
}

export default Footer
