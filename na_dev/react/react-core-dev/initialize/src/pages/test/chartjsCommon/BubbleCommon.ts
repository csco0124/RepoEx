export type bubbleDataType = {
  x: number;
  y: number;
  r: number
};

type datasetObjectType = {
  label: string;
  data: Array<bubbleDataType>;
  backgroundColor: string;
};
export type bubbleDataObjectType = {
  datasets: Array<datasetObjectType>;
};

export const bubbleOptions = {
  responsive: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Bubble Chart",
      font: { size: 16 },
    },
  },
};

export const bubbleInitData: bubbleDataObjectType = {
  datasets: [
    {
      label: "Dataset 1",
      data: [
        { x: 20, y: 50, r: 15 },
        { x: 40, y: 17, r: 10 },
      ],
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "Dataset 2",
      data: [
        { x: 25, y: 32, r: 10 },
        { x: 50, y: 30, r: 5 },
      ],
      backgroundColor: "rgb(53, 162, 000)",
    },
    {
      label: "Dataset 3",
      data: [
        { x: 40, y: 50, r: 5 },
        { x: 30, y: 30, r: 13 },
      ],
      backgroundColor: "rgb(53, 162, 235)",
    },
  ],
};
