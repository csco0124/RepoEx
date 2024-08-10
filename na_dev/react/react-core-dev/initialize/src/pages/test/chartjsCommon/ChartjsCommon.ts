

export type datasetObjectType = {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
};
export type dataType = {
  labels: number[];
  datasets: Array<datasetObjectType>;
};

export const options = {
  responsive: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "",
    },
  },
};

export const initData: dataType = {
  labels : [100, 200, 300, 400, 500, 600, 700],
  datasets: [
    {
      label: "Dataset 1",
      data: [1, 2, 3, 4, 5, 6, 7],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [7, 6, 5, 4, 3, 2, 1],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
