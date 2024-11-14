import React from 'react';
import PlanCard from './PlanCard';
import './SubscriptionPlan.css';
import Navbar from './Navbar';

const SubscriptionPlan = () => {
  const currentPlan = {
    planName: 'Standard Plan',
    cost: '14.99',
    features: ['Access to all content', 'HD & 4K streaming', 'No ads', 'Offline downloads']
  };

  // Example subscription details
  const subscriptionDetails = [
    { date: '2024-10-21', time: '10:00 AM', plan: 'Standard Plan' },
  ];

  return (
    <div>
      <Navbar/>
    <div className="subscription-plan-page">
      <div className="container">
        <h2 className="text-center mb-4">Your Current Subscription Plan</h2>

        
        <div className="row justify-content-center mb-5">
          <PlanCard
            planName={currentPlan.planName}
            cost={currentPlan.cost}
            features={currentPlan.features}
          />
        </div>

        <h2 className="text-center mb-4">Your Subscription Details</h2>

        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Plan</th>
              </tr>
            </thead>
            <tbody>
              {subscriptionDetails.map((detail, index) => (
                <tr key={index}>
                  <td>{detail.date}</td>
                  <td>{detail.time}</td>
                  <td>{detail.plan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SubscriptionPlan;
