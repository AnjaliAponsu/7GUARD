import React from 'react'
import ViewVaccineList from '../../NurseSide/CHDR/VaccineList/ViewVaccineList';
import { Link } from 'react-router-dom';
import Footer from '../../../Component/Footer/Footer';
import MainClientNav from '../../../Component/Nav/MainClientNav';
import MainNavBar from '../../../Component/Nav/MainNavBar';

const MainHomePage = () => {
  return (
    <div>
      <MainNavBar/>
      <MainClientNav/>
      <div className="Boxa4">
        <table>
          <tbody>
                  <h1 className="ha1">7GUARD</h1>
                  <h3 className="ha6">A small step today for a healthier</h3>
                  <h3 className="ha6"> tomorrow...</h3>
          </tbody>
        </table>
      </div>
      <br></br>
      
      <h2 className=''>Welcome to</h2>
      <h1 className='ha5'>Santa Dora Hospital</h1>
      
    <Link to={'/ParentLogin'} className='btn vbtn'>LOGIN</Link>
      <br/>
      <h3 className='ha4'>Why we need vaccine?</h3>
      <br/>
      <p className='container'>Vaccines are essential for protecting individual and community health. They work by training the immune system to recognize and fight specific pathogens, preventing serious diseases like measles, polio, and influenza.</p>
      <p className='container'>
      By achieving high vaccination rates, we create herd immunity, which safeguards those who cannot be vaccinated, such as infants and people with certain health conditions. Additionally, vaccines help reduce healthcare costs by preventing disease outbreaks and minimizing hospital visits.
      Globally, vaccination programs have successfully eradicated or significantly reduced the prevalence of many infectious diseases, enhancing public health for everyone. Rigorous testing ensures vaccines are safe and effective, making them one of the best defenses against preventable illnesses.
      Getting vaccinated is not just about individual protection—it's about fostering a healthier community. Join us in the fight against disease!</p>
      <ViewVaccineList/>

      


      <div class="container-xxl py-5">
        <div class="container">
            <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{'max-width': '600px'}}>
                <h1 className='vhead'>Our Experience Doctors</h1>
            </div>
            <div class="row g-4" style={{height:"82vh"}}>
                <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div class="team-item position-relative rounded overflow-hidden">
                        <div class="overflow-hidden">
                            <div className="img-fluid1"></div>
                        </div>
                        <div class="team-text bg-light text-center p-4">
                            <h5>Dr.Dora</h5>
                            <p class="text-primary">Department</p>
                            <div class="team-social text-center">
                                <a class="btn btn-square" href=""><i class="fab fa-facebook-f"></i></a>
                                <a class="btn btn-square" href=""><i class="fab fa-twitter"></i></a>
                                <a class="btn btn-square" href=""><i class="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                    <div class="team-item position-relative rounded overflow-hidden">
                        <div class="overflow-hidden">
                            <div className="img-fluid2"></div>
                        </div>
                        <div class="team-text bg-light text-center p-4">
                            <h5>Dr.Devid</h5>
                            <p class="text-primary">Department</p>
                            <div class="team-social text-center">
                                <a class="btn btn-square" href=""><i class="fab fa-facebook-f"></i></a>
                                <a class="btn btn-square" href=""><i class="fab fa-twitter"></i></a>
                                <a class="btn btn-square" href=""><i class="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                    <div class="team-item position-relative rounded overflow-hidden">
                        <div class="overflow-hidden">
                            <div className="img-fluid3"></div>
                        </div>
                        <div class="team-text bg-light text-center p-4">
                            <h5>Dr.Lucilia Tiger</h5>
                            <p class="text-primary">Department</p>
                            <div class="team-social text-center">
                                <a class="btn btn-square" href=""><i class="fab fa-facebook-f"></i></a>
                                <a class="btn btn-square" href=""><i class="fab fa-twitter"></i></a>
                                <a class="btn btn-square" href=""><i class="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
                    <div class="team-item position-relative rounded overflow-hidden">
                        <div class="overflow-hidden">
                            <div className="img-fluid4"></div>
                        </div>
                        <div class="team-text bg-light text-center p-4">
                            <h5>Dr.John </h5>
                            <p class="text-primary">Department</p>
                            <div class="team-social text-center">
                                <a class="btn btn-square" href=""><i class="fab fa-facebook-f"></i></a>
                                <a class="btn btn-square" href=""><i class="fab fa-twitter"></i></a>
                                <a class="btn btn-square" href=""><i class="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
      
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                <div className="image-container "></div>
            </div>

            <div className="col-lg-6 wow fadeIn " data-wow-delay="0.5s" style={{alignContent: 'center'}}>
                <h1 className="mb-4" style={{ color: "rgb(255, 0, 106)" }}>Why You Should Trust Us?</h1>
                  <p>
                    Our commitment to your child's health is unwavering. We prioritize
                    evidence-based practices and follow the latest guidelines from trusted
                    health organizations. Our experienced team is dedicated to providing
                    accurate information and support throughout your child's vaccination
                    journey.
                  </p>
                
                  <Link to="/mau" className="btn vbtn">Read More</Link>
            </div>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  )
}

export default MainHomePage
