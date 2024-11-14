import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PlanCard.css';

const PlanCard = ({ planName, cost, features }) => {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card plan-card">
        <div className="card-body">
          <h5 className="card-title text-center">{planName}</h5>
          <h6 className="card-cost text-center">${cost}</h6>
          <ul className="list-group list-group-flush">
            {features.map((feature, index) => (
              <li key={index} className="list-group-item">{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
