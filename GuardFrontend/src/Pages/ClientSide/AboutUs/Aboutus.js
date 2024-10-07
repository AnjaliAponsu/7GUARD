import React from "react";
import "./Aboutus.css";
import ClientNavBar from "../../../Component/Nav/ClientNavBar";

export default function Aboutus() {
  return (
    <div>
      <ClientNavBar/>
      <div className="Boxa1">
        <table>
          <tbody>
                  <h1 className="ha1">About Us</h1>
          </tbody>
        </table>
      </div>

      <div className="Boxa2">
        <table>
          <tbody>
            <tr>
               <p>
                  <h1 className="ha2">Why You Should Trust Us</h1>
                </p>
                <p className="par1">
                    Our commitment to your child's health is unwavering.
                    We prioritize evidence-based practices and follow 
                    the latest guidelines from trusted health organizations. 
                    Our experienced team is dedicated to providing accurate 
                    information and support throughout your child's vaccination journey.
                </p>
                <p>
                  <h1 className="ha2">Get to Know About Us</h1>
                </p>
                <p className="par1">
                    We specialize in pediatric care, focusing on the importance of vaccinations
                    in safeguarding your baby's health. Vaccines protect against serious
                    diseases and help build immunity, ensuring your little one has a healthy
                    start. Our friendly staff is here provide personalized care to keep your 
                    child safe and healthy. Trust us to guide you through every step of the 
                    vaccination process!
                </p>


            </tr>
          </tbody>
        </table>
      </div>

      <div className="Boxa3">
        <table>
          <tbody>
                <h1 className="ha3">Contact Us..</h1>
                  <div className="ta5">
                    <ul>
                      <li>076-8071244</li>
                      <li>070-2001168</li>
                    </ul>
                  </div>
                
              
              
          </tbody>
        </table>
      </div>
      
    </div>
  );
}
