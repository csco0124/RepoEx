import { Outlet } from "react-router";

const TestLayout = () => {
  return (
    <div className="container">
      <Outlet />
    </div>
  );
};

export default TestLayout;
