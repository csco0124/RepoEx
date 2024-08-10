type barDatasetObjectType = {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
  borderWidth: number;
};

export type barDataObjectType = {
  labels: Array<string>;
  datasets: Array<barDatasetObjectType>;
};

export const radarOptions:any = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right' as const,
    },
    title: {
      display: true,
      text: 'Radar Chart',
      font: { size: 16 },
    },
  },
};

export const radarInitData: any = {
  labels: ['Analysis1', 'Analysis2', 'Analysis3', 'Analysis4', 'Analysis5', 'Analysis6'],
  datasets: [
    {
      label: 'Manager 1',
      data: [5,4,6,3,4,5],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 4,
    },
    {
      label: 'Manager 2',
      data: [1,2,3,4,5,6],
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 4,
    },
    {
      label: 'Manager 3',
      data: [2,1,3,5,2,3],
      backgroundColor:  'rgba(255, 206, 86, 0.2)',
      borderColor:  'rgba(255, 206, 86, 1)',
      borderWidth: 4,
    },
  ],
};
