import React from 'react';
import ClientNavBar from "../../../Component/Nav/ClientNavBar";
import { Link } from 'react-router-dom';
import MainNav from '../../../Component/Nav/MainNav';
import Footer from '../../../Component/Footer/Footer';
import Vaccine_channeling_Form from '../../../Component/Channeling/Vaccine_channeling_Form';
import './Appointment.css'

const Appointment = () => {
  return (
    <div>
      <MainNav/>
      <ClientNavBar/>
      <div className="Boxaa5">
        <table>
          <tbody>
                  <h1 className="ha1">APPOINTMENT</h1>
          </tbody>
        </table>
      </div>
      <br/>

      <div className="container-xxl py-5">
              <div className="container">
                <div className="row g-2">
                  <div className="col-lg-4 wow fadeIn" data-wow-delay="0.1s" style={{alignContent:'center'}}>
                  <h1 className="mb-2" style={{ color: "rgb(255, 0, 106)" }}>Make An Appointment To Visit Our Doctor</h1>
                        <p className="mb-2">
                        Ensure your little one receives the best care. 
                        Book an appointment with our experienced pediatric specialists and give your child the attention 
                        they deserve for a healthy start in life.
                        </p>
                    
                        <div class="bg-light rounded d-flex align-items-center p-3 mb-2">
                        <div class="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white" style={{width: "35px", height: "35px"}}>
                            <i class="fa fa-phone-alt text-primary"></i>
                        </div>
                        <div class="ms-2" style={{width:'400px'}}>
                            <p class="mb-2">Call Us Now</p>
                            <h5 class="mb-2">+(94) 112 874 874</h5>
                        </div>
                    </div>
                    <div class="bg-light rounded d-flex align-items-center p-3 ">
                        <div class="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white" style={{width: "55px", height: "55px"}}>
                            <i class="fa fa-envelope-open text-primary"></i>
                        </div>
                        <div class="ms-2" style={{width:'400px'}}>
                            <p class="mb-2">Mail Us Now</p>
                            <h5 class="mb-2">info@santadorahospital.com</h5>
                        </div>
                    </div>
                  </div>
      
                  <div className="col-lg-8 wow fadeIn mb-2" data-wow-delay="0.5s">
                        <Vaccine_channeling_Form/>
                  </div>
                </div>
              </div>
            </div>






            <Footer/>
      
    </div>
  );
}

export default Appointment;
