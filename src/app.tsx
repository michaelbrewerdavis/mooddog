import type { AxisOptions, Chart as ReactCharts_Chart } from "react-charts";
import {
  Box,
  IconButton,
  Tab,
  Tabs,
  ToggleButton,
  Typography,
} from "@mui/material";
import {
  useActivities,
  useIssues,
  useKey,
  useMood,
  useMoodData,
} from "./hooks";

import Image from "next/image";
import React from "react";
import { Refresh } from "@mui/icons-material";

let ReactChartsObj;

async function loadReactCharts() {
  ReactChartsObj = await import("react-charts");
  console.log("loaded");
}

export default function App() {
  const [tab, setTab] = React.useState("track");

  React.useEffect(() => {
    loadReactCharts();
  }, []);

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

      {tab === "track" ? <Track /> : <Chart />}
      <Box>
        <Tabs centered value={tab}>
          <Tab label="Track" value="track" onClick={() => setTab("track")} />
          <Tab label="Chart" value="chart" onClick={() => setTab("chart")} />
        </Tabs>
      </Box>
      <Box sx={{ position: "absolute", bottom: 0, right: 0, padding: "20px" }}>
        <IconButton onClick={() => window.location.reload()}>
          <Refresh fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
}

function Track() {
  const key = useKey();
  const [mood, setMood] = useMood(key);
  const [issues, addIssue, removeIssue] = useIssues(key);
  const [activities, addActivity, removeActivity] = useActivities(key);

  return (
    <Box>
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
            "binge eating",
          ].map((issue: string) => (
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
      <Box>
        <Typography variant="h4">What have you been doing?</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {[
            "took a walk",
            "brushed teeth",
            "showered",
            "played music",
            "saw people",
          ].map((activity) => (
            <Box key={activity} sx={{ padding: "5px" }}>
              <ToggleButton
                value={activity}
                sx={{ borderRadius: "10px" }}
                color="primary"
                selected={activities.includes(activity)}
                onClick={() => {
                  activities.includes(activity)
                    ? removeActivity(activity)
                    : addActivity(activity);
                }}
              >
                {activity}
              </ToggleButton>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function Chart() {
  const [moodData] = useMoodData();

  const primaryAxis = React.useMemo(
    (): AxisOptions<DailyStars> => ({
      scaleType: "localTime",
      getValue: (datum) => datum.date,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<DailyStars>[] => [
      {
        min: 1,
        max: 5,
        getValue: (datum) => datum.stars,
      },
    ],
    []
  );

  if (!ReactChartsObj || Object.entries(moodData).length === 0) {
    return null;
  }

  type DailyStars = {
    date: Date;
    stars: number;
  };

  type Series = {
    label: string;
    data: DailyStars[];
  };

  const data: Series[] = [
    {
      label: "Mood",
      data: Object.entries(moodData).map(([key, value]) => ({
        date: new Date(key),
        stars: value,
      })),
    },
  ];

  const ChartComponent: typeof ReactCharts_Chart = ReactChartsObj.Chart;
  return (
    <Box sx={{ height: "50vh", width: "90vw" }}>
      <ChartComponent
        options={{
          data,
          primaryAxis,
          secondaryAxes,
        }}
      />
    </Box>
  );
}
