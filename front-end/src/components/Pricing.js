import React from "react";
import styled from "styled-components";

const PricingSection = styled.section`
  padding: 40px;
  text-align: center;

  h2 {
    font-size: 28px;
    margin-bottom: 20px;
  }

  .pricing-table {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }

  .plan {
    border: 1px solid #ddd;
    padding: 30px;
    margin: 0 15px;
    width: 300px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .plan h3 {
    font-size: 24px;
    margin-bottom: 15px;
  }

  .plan ul {
    list-style: none;
    padding: 0;
    margin-bottom: 20px;
  }

  .plan li {
    margin-bottom: 10px;
  }

  .plan .price {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .plan button {
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const Pricing = () => {
  return (
    <PricingSection>
      <h2>Plans and Pricing</h2>

      <div className="pricing-table">
        <div className="plan">
          <h3>Free Plan</h3>
          <ul>
            <li>5 posts per day</li>
            <li>Text posts only</li>
            <li>Direct messaging</li>
            <li>Join communities</li>
            <li>Data encryption</li>
          </ul>
          <div className="price">Free</div>
          <button className="btn btn-primary">Get Started</button>
        </div>

        <div className="plan">
          <h3>Premium Plan</h3>
          <ul>
            <li>Unlimited posts</li>
            <li>Text, image, video posts</li>
            <li>Direct messaging & group chats</li>
            <li>Create & join communities</li>
            <li>Data encryption</li>
            <li>Ad-free experience</li>
            <li>Priority customer support</li>
          </ul>
          <div className="price">$9.99/month</div>
          <button className="btn btn-primary">Upgrade</button>
        </div>
      </div>
    </PricingSection>
  );
};

export default Pricing;
