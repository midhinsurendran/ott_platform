import React from 'react';
import PlanCard from './PlanCard';
import './Subscribe.css';
import Navbar from './Navbar';

const Subscribe = () => {
  const plans = [
    {
      planName: 'Basic Plan',
      cost: '9.99',
      features: ['Access to all basic content', 'HD streaming', 'No ads']
    },
    {
      planName: 'Standard Plan',
      cost: '14.99',
      features: ['Access to all content', 'HD & 4K streaming', 'No ads', 'Offline downloads']
    },
    {
      planName: 'Premium Plan',
      cost: '19.99',
      features: ['All features of Standard Plan', 'Multiple user accounts', 'Exclusive content']
    },
    
  ];

  return (
    <div>
    <Navbar/>
    <div className="subscribe-page">
      <div className="container">
        <h2 className="text-center mb-4">Choose Your Subscription Plan</h2>
        <div className="row">
          {plans.map((plan, index) => (
            <PlanCard
              key={index}
              planName={plan.planName}
              cost={plan.cost}
              features={plan.features}
            />
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Subscribe;
