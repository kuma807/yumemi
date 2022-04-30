import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Prefectures from "./components/Prefectures";
import Graph from "./components/Graph";
import getPrefectures from "./services/getPrefectures";

const App = () => {
  const [prefectureSelected, setSelected] = useState([]);
  const [prefectureList, setPrefectureList] = useState([]);
  useEffect(() => {
    getPrefectures().then((res) => {
      setSelected(Array.from({ length: 47 }, () => false));
      setPrefectureList(res.result);
    });
  }, []);
  return (
    <div>
      <Header />
      <div style={{ paddingTop: 100 }}>
        <Prefectures
          prefectureList={prefectureList}
          prefectureSelected={prefectureSelected}
          setSelected={(selectedData) => setSelected(selectedData)}
        />
        <Graph
          prefectureList={prefectureList}
          prefectureSelected={prefectureSelected}
        />
      </div>
    </div>
  );
};

export default App;
