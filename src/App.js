import React, { useState } from "react";
import Header from "./components/Header";
import Prefectures from "./components/Prefectures";

const App = () => {
  const [prefectureSelected, setSelected] = useState(
    Array.from({ length: 47 }, () => false)
  );
  return (
    <div>
      <Header />
      <body style={{ paddingTop: 100 }}>
        <Prefectures
          prefectureSelected={prefectureSelected}
          setSelected={(selectedData) => setSelected(selectedData)}
        />
      </body>
    </div>
  );
};

export default App;
