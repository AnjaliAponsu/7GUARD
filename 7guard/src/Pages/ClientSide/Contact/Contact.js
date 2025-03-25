import React from 'react';
import MapComponent from '../../../Component/MapComponent';
import MainNav from '../../../Component/Nav/MainNav';
import ClientNavBar from '../../../Component/Nav/ClientNavBar';
import Footer from '../../../Component/Footer/Footer';
import './Contact.css';
import { useParams } from 'react-router-dom';

const Contact = () => {
  const {parentNic}=useParams();
  return (
    <div>
      <MainNav/>
      <ClientNavBar/>
      <div className="Boxaa6">
        <table>
          <tbody>
                  <h1 className="ha1">CONTACT US</h1>
          </tbody>
        </table>
      </div>
      <br/>

      <div className="container-xxl py-5">
              <div className="container">
                <div className="row g-5">
            
                  <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s" style={{alignContent:'center'}}>
                  <h1 className="mb-2" style={{ color: "rgb(255, 0, 106)" }}>Have Any Query? Please Contact Us!</h1>
                        <p className="mb-2">
                        We are here to provide guidance and support for all your concerns about under-12 baby vaccinations. 
                        Feel free to reach out to us for trusted advice and detailed information tailored to your child’s health needs.
                        </p>
                    
                        <div class="bg-light rounded d-flex align-items-center p-3 mb-2">
                        <div class="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white" style={{width: "55px", height: "55px"}}>
                            <i class="fa fa-phone-alt text-primary"></i>
                        </div>
                        <div class="ms-2" style={{width:'400px'}}>
                            <p class="mb-2">Call Us Now</p>
                            <h5 class="mb-2">+(94) 112 874 874</h5>
                        </div>
                    </div>
                    <div class="bg-light rounded d-flex align-items-center p-3 mb-2">
                        <div class="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white" style={{width: "55px", height: "55px"}}>
                            <i class="fa fa-envelope-open text-primary"></i>
                        </div>
                        <div class="ms-2" style={{width:'400px'}}>
                            <p class="mb-2">Mail Us Now</p>
                            <h5 class="mb-2">info@santadorahospital.com</h5>
                        </div>
                    </div>
                    <div class="bg-light rounded d-flex align-items-center p-3 ">
                        <div class="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white" style={{width: "55px", height: "55px"}}>
                            <i class="fa fa-map-marker-alt text-primary"></i>
                        </div>
                        <div class="ms-2" style={{width:'400px'}}>
                            <p class="mb-2">Address</p>
                            <h5 class="mb-2">PO Box 173, Pannipitiya Road, Battaramulla, Sri Lanka</h5>
                        </div>
                    </div>
                    
                  </div>
      
                  <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                    <MapComponent/>                       
                  </div>
                </div>
              </div>
            </div>

      






            <Footer/>
      
    </div>
  );
}

export default Contact;
