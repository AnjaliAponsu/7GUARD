import React from "react";
import "./Aboutus.css";
import ClientNavBar from "../../../Component/Nav/ClientNavBar";
import MainNav from "../../../Component/Nav/MainNav";
import Footer from "../../../Component/Footer/Footer";
import MapComponent from "../../../Component/MapComponent";

export default function Aboutus() {
  return (
    <div>
      <div className="Boxa1">
        <table>
          <tbody>
                  <h1 className="haa1">ABOUT US</h1>
          </tbody>
        </table>
      </div>

      <div className="container-xxl py-5">
              <div className="container">
                <div className="row g-5">
            
                  <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                      <div className="image-container "></div>
                  </div>
      
                  <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                      <h1 className="mb-4" style={{ color: "rgb(255, 0, 106)" }}>Why You Should Trust Us?</h1>
                        <p>
                          Our commitment to your child's health is unwavering. We prioritize
                          evidence-based practices and follow the latest guidelines from trusted
                          health organizations. Our experienced team is dedicated to providing
                          accurate information and support throughout your child's vaccination
                          journey.
                        </p>
                      <h1 className="mb-4" style={{ color: "rgb(255, 0, 106)" }}>Get to Know About Us</h1>
                        <p>
                          We specialize in pediatric care, focusing on the importance of
                          vaccinations in safeguarding your baby's health. Vaccines protect
                          against serious diseases and help build immunity, ensuring your little
                          one has a healthy start. Our friendly staff is here to provide
                          personalized care to keep your child safe and healthy. Trust us to
                          guide you through every step of the vaccination process!
                        </p>
                       
                  </div>
                </div>
              </div>
            </div>

            
      
        
    <Footer/>
    </div>
  );
}
