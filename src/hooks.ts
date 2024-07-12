import React from "react";

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [data, setData] = React.useState(defaultValue);

  React.useEffect(() => {
    if (window) {
      const data = window.localStorage.getItem(key);
      if (data) {
        setData(JSON.parse(data));
      }
    }
  }, []);
  React.useEffect(() => {
    if (window) {
      window.localStorage.setItem(key, JSON.stringify(data));
    }
  }, [data]);

  return [data, setData];
}

export function useKey() {
  const [key] = React.useState(new Date().toISOString());
  return key;
}

export function useMoodData(): [
  Record<string, number>,
  React.Dispatch<React.SetStateAction<Record<string, number>>>
] {
  const [moodData, setMoodData] = useLocalStorage<Record<string, number>>(
    "mood",
    {}
  );
  return [moodData, setMoodData];
}

export function useMood(key: string): [number, (newMood: number) => void] {
  const [moodData, setMoodData] = useMoodData();

  const mood = moodData[key];
  const setMood = React.useCallback(
    (newMood: number) => {
      setMoodData({ ...moodData, [key]: newMood });
    },
    [moodData, setMoodData, key]
  );

  return [mood, setMood];
}

export function useIssues(
  key: string
): [string[], (issue: string) => void, (issue: string) => void] {
  const [issuesData, setIssuesData] = useLocalStorage<Record<string, string[]>>(
    "issues",
    {}
  );
  const issues = issuesData[key] ?? [];

  const addIssue = React.useCallback(
    (newIssue: string) => {
      setIssuesData({ ...issuesData, [key]: [...issues, newIssue] });
    },
    [issues, issuesData, setIssuesData, key]
  );
  const removeIssue = React.useCallback(
    (issue: string) => {
      setIssuesData({
        ...issuesData,
        [key]: issues.filter((i) => i !== issue),
      });
    },
    [issues, issuesData, setIssuesData, key]
  );
  return [issues, addIssue, removeIssue];
}

export function useActivities(
  key: string
): [string[], (issue: string) => void, (issue: string) => void] {
  const [activitiesData, setActivitiesData] = useLocalStorage<
    Record<string, string[]>
  >("activities", {});
  const activities = activitiesData[key] ?? [];

  const addActivity = React.useCallback(
    (newActivity: string) => {
      setActivitiesData({
        ...activitiesData,
        [key]: [...activities, newActivity],
      });
    },
    [activities, activitiesData, setActivitiesData, key]
  );
  const removeActivity = React.useCallback(
    (activity: string) => {
      setActivitiesData({
        ...activitiesData,
        [key]: activities.filter((a) => a !== activity),
      });
    },
    [activities, activitiesData, setActivitiesData, key]
  );
  return [activities, addActivity, removeActivity];
}
