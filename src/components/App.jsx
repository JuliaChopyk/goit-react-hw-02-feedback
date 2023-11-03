import { Component } from 'react';
import { Section } from './section/section';
import { FeedbackOptions } from './feedbackOptions/feedbackOptions';
import { Statistics } from './statistics/statistics';
import { Notification } from './notification/notification';
import { getKeys, getValues, getEntries } from './utils';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  onLeaveFeedback = (option) => {
    this.setState(prevState => {
      return {
        [option]: prevState[option] + 1,
      };
    });
  };

  getKeys = getKeys;
  getValues = getValues;
  getEntries = getEntries;

  countTotalFeedback = () => {
    const values = this.getValues(this.state);
    return values.reduce((total, value) => total + value, 0);
  };

  countPositiveFeedbackPercentage = () => {
    const total = this.countTotalFeedback();
    return parseInt((this.state.good / total) * 100);
  };

  render() {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '15px',
          fontSize: 40,
        }}
      >
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={this.getKeys(this.state)}
            onLeaveFeedback={this.onLeaveFeedback}
          ></FeedbackOptions>
        </Section>
        <Section title="Statistics">
          {this.countTotalFeedback() === 0 ? (
            <Notification message="There is no feedback"></Notification>
          ) : (
            <Statistics
              options={this.getEntries(this.state)}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            ></Statistics>
          )}
        </Section>
      </div>
    );
  }
}