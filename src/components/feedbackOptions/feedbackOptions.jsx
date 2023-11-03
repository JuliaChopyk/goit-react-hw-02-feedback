export const FeedbackOptions = ({ options, onLeaveFeedback }) => {
  return (
    <ul>
      {options.map(option => {
        return (
          <li key={option}>
            <button className="feedbackButton" onClick={() => onLeaveFeedback(option)}>
              {option}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
