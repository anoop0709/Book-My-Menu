import './Footer.css';
import {useNavigate} from "react-router-dom"


function Footer() {
  const Navigate = useNavigate()
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
                      <li className="listItem" onClick={()=>Navigate('/vendor')}>Bussiness with us</li>
                      <li className="listItem">Careers</li>
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
