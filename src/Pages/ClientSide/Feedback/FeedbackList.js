import React from "react";

const FeedbackList = ({ feedbacks, onEditFeedback, onDeleteFeedback }) => {
  return (
    <ul className="feedback-list">
      {feedbacks.map((fb) => (
        <li key={fb.id} className="feedback-item">
          <span>{fb.text}</span>
         
        </li>
      ))}
    </ul>
  );
};

export default FeedbackList;
