import React from 'react';
import '../Assests/css/style.css';

const Services = () => (
  <section className="services">
    <table id="service-table">
      <tr className="service-icons">
        <th><img src="https://img.icons8.com/?size=80&id=pBWq2YU3DyvY&format=png" alt="fb icon" /></th>
        <th><img src="https://img.icons8.com/?size=50&id=7819&format=png" alt="book icon" /></th>
        <th><img src="https://img.icons8.com/?size=50&id=11668&format=png" alt="chat bubbles icon" /></th>
        <th><img src="https://img.icons8.com/?size=50&id=57715&format=png" alt="chat bubbles icon" /></th>
      </tr>
      <tr className="service-names">
        <td>Enquiry Management</td>
        <td>User and Admin Management</td>
        <td>Notification System</td>
        <td>Report Generation</td>
      </tr>
      <tr className="service-descriptions">
        <td>Students can submit enquiries regarding courses, admission procedures, fees, etc.
        Students can track the status of their enquiries.Admin can manage and respond to enquiries.
        </td>
        <td>Register, create profiles, submit and track enquiries. Manage student profiles, respond to enquiries, and generate reports.</td>
        <td>Notify students about responses to their enquiries. Set up alerts for new enquiries and status updates.</td>
        <td>Generate reports on the number of enquiries, response times, and other relevant metrics.</td>
      </tr>
    </table>
  </section>
);

export default Services;
