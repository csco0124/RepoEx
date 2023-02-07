const data = {
  labels: ["4월", "5월", "6월", "7월"],
  datasets: [
      {
          values: [68, 74, 70, 81]
      }
  ]
}
const chart = new frappe.Chart("#chart", {
  title: "수학 테스트 결과",
  data: data,
  type: 'line'
})