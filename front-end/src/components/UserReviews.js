import React from "react";
import styled from "styled-components";
const ReviewSection = styled.div`
  background-color: none; // Light background
  padding: 40px;
  text-align: center;

  h2 {
    font-size: 28px;
    margin-bottom: 20px;
  }

  .review {
    background-color: white;
    padding: 20px;
    margin: 10px auto; // Center reviews
    border-radius: 8px;
    max-width: 400px;

    p {
      font-style: italic;
    }
  }
`;

const UserReviews = () => {
  return (
    <ReviewSection>
      <h2>User Reviews</h2>
      <div className="review">
        <p>"Great platform!" - Irina</p>
      </div>
      <div className="review">
        <p>"Simple and convenient!" - Sergey</p>
      </div>
      {/* Add more reviews here */}
    </ReviewSection>
  );
};

export default UserReviews;
