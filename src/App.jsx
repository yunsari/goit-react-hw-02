import { useState, useEffect } from "react";

import Description from "./components/description/Description";
import Options from "./components/options/Options";
import Feedback from "./components/feedback/Feedback";
import Notification from "./components/notification/Notification";

const App = () => {
  const [clicks, setClicks] = useState(() => {
    try {
      const saved = window.localStorage.getItem("saved-clicks");
      if (!saved) return { good: 0, neutral: 0, bad: 0 };

      const parsed = JSON.parse(saved);
      if (
        typeof parsed !== "object" ||
        parsed === null ||
        !("good" in parsed && "neutral" in parsed && "bad" in parsed)
      ) {
        return { good: 0, neutral: 0, bad: 0 };
      }
      return parsed;
    } catch {
      return { good: 0, neutral: 0, bad: 0 };
    }
  });

  useEffect(() => {
    window.localStorage.setItem("saved-clicks", JSON.stringify(clicks));
  }, [clicks]);

  const updateClicks = (type) => {
    setClicks((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const resetClicks = () => {
    setClicks({ good: 0, neutral: 0, bad: 0 });
  };

  const totalClicks = clicks.good + clicks.neutral + clicks.bad;
  const positive = totalClicks
    ? Math.round((clicks.good / totalClicks) * 100)
    : 0;

  return (
    <div className="container">
      <Description />
      <Options
        onFeedback={updateClicks}
        onReset={resetClicks}
        totalFeedback={totalClicks}
      />
      {totalClicks > 0 ? (
        <Feedback
          good={clicks.good}
          neutral={clicks.neutral}
          bad={clicks.bad}
          total={totalClicks}
          positive={positive}
        />
      ) : (
        <Notification notification="No feedback yet" />
      )}
    </div>
  );
};

export default App;
