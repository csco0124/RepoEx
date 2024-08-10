type datasetObjectType = {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
};
export type lineDataType = {
  labels: number[];
  datasets: Array<datasetObjectType>;
};

export const multitypeOptions = {
  responsive: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "MultiType Chart",
      font: { size: 16 },
    },
  }};

export const multitypeInitData: any = {
  labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  datasets: [
    {
      type: "line" as const,
      label: "Dataset 1",
      borderColor: "rgb(255, 99, 132)",
      borderWidth: 2,
      fill: false,
      data: [1, 2, 3, 4, 5, 6, 7],
    },
    {
      type: "bar" as const,
      label: "Dataset 2",
      backgroundColor: "rgb(75, 192, 192)",
      data: [8, 9, 10, 11, 12, 13, 14],
      borderColor: "white",
      borderWidth: 2,
    },
    {
      type: "bar" as const,
      label: "Dataset 3",
      backgroundColor: "rgb(53, 162, 235)",
      data: [15, 16, 17, 18, 19, 20, 21],
    },
  ]
};
