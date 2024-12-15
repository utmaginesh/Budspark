import React from 'react';
import '../Assests/css/style.css';

const Approach = () => (
  <section className="approach" id="approach">
    <div className='submissionp'>
      <h1>Submission Process</h1>
    </div>
    <img className="score-1" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/655489/underscore-gray.png" alt="underscore" />
    <div className="step-cont">
      <div className="step-img-L">
      </div>
      <div className="step-btn-L">
        <div className="num">1</div>
      </div>
      <div className="step-head-L">Step 1: Login into your Account</div>
      <div className="step-body-L">Enter your Email and Password in the Login page.</div>
    </div>
    <div className="step-cont">
      <div className="step-img-R">
      </div>
      <div className="step-btn-L">
        <div className="num">2</div>
      </div>
      <div className="step-head-L">Step 2: Inquiry Form</div>
      <div className="step-body-L">Fill the Inquiry Form with all the required information and submit it.</div>
    </div>
    <div className="step-cont">
      <div className="step-img-L">
        {/* <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/655489/img-step-3.jpg" alt="step 3" /> */}
      </div>
      <div className="step-btn-L">
        <div className="num">3</div>
      </div>
      <div className="step-head-L">Step 3: Confirmation</div>
      <div className="step-body-L">Confirm that your form has been submitted by ensuring that you have received an email.</div>
    </div>
    <div className="step-cont">
      <div className="step-img-R">
        {/* <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/655489/img-step-4.jpg" alt="step 4" /> */}
      </div>
      <div className="step-btn-L">
        <div className="num">4</div>
      </div>
      <div className="step-head-L">Step: 4: Response and Resolution</div>
      <div className="step-body-L">You will get a response in the portal once the admin has replied..</div>
    </div>
  </section>
);

export default Approach;

