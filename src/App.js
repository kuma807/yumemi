import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Prefectures from "./components/Prefectures";
import Graph from "./components/Graph";
import getPrefectures from "./services/getPrefectures";
import getPopulation from "./services/getPopulation";

const App = () => {
  const [prefectureSelected, setSelected] = useState([]);
  const [prefectureList, setPrefectureList] = useState([]);
  const [prefecturePopulationList, setprefecturePopulationList] = useState([]);
  //都道府県一覧を取得
  useEffect(() => {
    getPrefectures().then((res) => {
      setSelected(Array.from({ length: res.result.length }, () => false));
      setprefecturePopulationList(
        Array.from({ length: res.result.length }, () => new Object())
      );
      setPrefectureList(res.result);
    });
  }, []);
  //選択された都道府県のデータを過去に取得してない場合にのみデータを取得する
  useEffect(() => {
    for (let index1 = 0; index1 < prefectureSelected.length; index1++) {
      const isSelected = prefectureSelected[index1];
      const hasNoData =
        Object.keys(prefecturePopulationList[index1]).length === 0;
      const prefCode = index1 + 1;
      if (isSelected && hasNoData) {
        getPopulation(prefCode).then((res) => {
          const newPrefecturePopulationList = prefecturePopulationList.map(
            (prefecturePopulation, index2) => {
              if (index1 == index2) {
                return res.result;
              } else {
                return prefecturePopulation;
              }
            }
          );
          setprefecturePopulationList(newPrefecturePopulationList);
        });
      }
    }
  }, [prefectureSelected]);

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
          prefecturePopulationList={prefecturePopulationList}
          prefectureList={prefectureList}
          prefectureSelected={prefectureSelected}
        />
      </div>
    </div>
  );
};

export default App;
