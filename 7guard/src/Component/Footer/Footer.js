import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <div>
      <footer className="text-center text-lg-start custom-footer">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>
          <div>
              <a href="#" className="me-4 text-reset" style={{ color: 'white !important' }}>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="me-4 text-reset" style={{ color: 'white !important' }}>
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="me-4 text-reset" style={{ color: 'white !important' }}>
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="me-4 text-reset" style={{ color: 'white !important' }}>
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="me-4 text-reset" style={{ color: 'white !important' }}>
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="me-4 text-reset" style={{ color: 'white !important' }}>
                <i className="fab fa-github"></i>
              </a>
          </div>
        </section>

        <section>
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4"><i className="fas fa-gem me-3"></i>Santa Dora Hospital</h6>
                <p>Santa Dora, the first luxurious, multi-faceted healthcare provider in Sri Lanka</p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p><i className="fas fa-home me-3"></i>PO Box 173, Pannipitiya Road, Battaramulla, Sri Lanka</p>
                <p><i className="fas fa-envelope me-3"></i>info@santadorahospital.com</p>
                <p><i className="fas fa-phone me-3"></i> +(94) 112 874 874</p>
              </div>
            </div>
          </div>
        </section>
        
              <div class="text-center p-4" style={{backgroundColor: "rgba(0, 0, 0, 0.178)"}}>
              Copyright © 2024 Santa Dora Hospital. All rights reserved 
              </div>
      </footer>
    </div>
  );
};

export default Footer;
