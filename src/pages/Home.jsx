import React from "react";
import ReactCalendar from "../component/ReactCalendar";
import "./Home.css";
import EditBox from "../component/EditBox";
import List from "../component/List";

const Home = () => {
  return (
    <div className="Home">
      <section className="section_top">
        <ReactCalendar />
        <EditBox />
      </section>
      <section className="section_bottom">
        <List />
      </section>
    </div>
  );
};

export default Home;
