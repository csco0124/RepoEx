import * as D from "./data";

export default function App() {
  return (
    <div>
      <p>
        {D.randomName()}, {D.randomEmail()}, {D.randomJobTitle()},
        {D.randomDayMonthYear()},{D.randomTitleText(2)},
        <img src={D.randomAvatar()} height="50" />
        <img src={D.randomImage()} height="200" />
      </p>
    </div>
  );
}
