import {
  Box,
  Button,
  IconButton,
  ToggleButton,
  Typography,
} from "@mui/material";

import Head from "next/head";
import Image from "next/image";
import React from "react";
import { Refresh } from "@mui/icons-material";
import styles from "../styles/Home.module.css";

export default function App() {
  const key = useKey();
  const [mood, setMood] = useMood(key);
  const [issues, addIssue, removeIssue] = useIssues(key);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        height: "100vh",
        width: "100vw",
        padding: "20px",
      }}
    >
      <Typography variant="h1" sx={{ color: "darkblue" }}>
        mood.dog
      </Typography>
      <Box>
        <Typography variant="h4">How's your mood?</Typography>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            maxWidth: "500px",
            justifyContent: "space-between",
          }}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <ToggleButton
              key={n}
              color="primary"
              sx={{ maxWidth: "20%", border: "none", borderRadius: "20px" }}
              value={n}
              onClick={() => setMood(n)}
              selected={mood === n}
            >
              <Image
                alt={`${n}`}
                src={`/face${n}.png`}
                width={75}
                height={75}
              />
            </ToggleButton>
          ))}
        </Box>
      </Box>

      <Box>
        <Typography variant="h4">What are you dealing with?</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {[
            "anxiety",
            "anger",
            "sleeping too much",
            "sleeping too little",
            "depression",
            "productivity",
          ].map((issue) => (
            <Box key={issue} sx={{ padding: "5px" }}>
              <ToggleButton
                value={issue}
                sx={{ borderRadius: "10px" }}
                color="primary"
                selected={issues.includes(issue)}
                onClick={() => {
                  issues.includes(issue) ? removeIssue(issue) : addIssue(issue);
                }}
              >
                {issue}
              </ToggleButton>
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ position: "absolute", bottom: 0, right: 0, padding: "20px" }}>
        <IconButton onClick={() => window.location.reload()}>
          <Refresh fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
}

function useLocalStorage(key, defaultValue) {
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

function useKey() {
  const [key] = React.useState(new Date().toISOString());
  return key;
}

function useMood(key) {
  const [moodData, setMoodData] = useLocalStorage("mood", {});

  const mood = moodData[key];
  const setMood = React.useCallback(
    (newMood) => {
      setMoodData({ ...moodData, [key]: newMood });
    },
    [moodData, setMoodData, key]
  );

  return [mood, setMood];
}

function useIssues(key) {
  const [issuesData, setIssuesData] = useLocalStorage("issues", {});
  const issues = issuesData[key] ?? [];

  const addIssue = React.useCallback(
    (newIssue) => {
      setIssuesData({ ...issuesData, [key]: [...issues, newIssue] });
    },
    [issues, issuesData, setIssuesData, key]
  );
  const removeIssue = React.useCallback(
    (issue) => {
      setIssuesData({
        ...issuesData,
        [key]: issues.filter((i) => i !== issue),
      });
    },
    [issues, issuesData, setIssuesData, key]
  );
  return [issues, addIssue, removeIssue];
}
