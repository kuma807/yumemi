import PropTypes from "prop-types";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Graph = ({
  prefecturePopulationList,
  prefectureList,
  prefectureSelected,
}) => {
  const displayPrefecturePopulationList = prefecturePopulationList.map(
    (prefecture, index) => {
      if (prefectureSelected[index]) {
        return prefecture;
      } else {
        return new Object();
      }
    }
  );
  const getYearRange = (prefecturePopulationList) => {
    let oldestYear = 1960;
    let latestYear = 2015;
    prefecturePopulationList.forEach((prefecturePopulation) => {
      if (Object.keys(prefecturePopulation).length !== 0) {
        oldestYear = Math.min(
          oldestYear,
          prefecturePopulation.data[0].data[0].year
        );
        latestYear = Math.max(latestYear, prefecturePopulation.boundaryYear);
      }
    });
    return [...Array(Math.floor((latestYear - oldestYear) / 5) + 1)].map(
      (_, i) => oldestYear + i * 5
    );
  };
  const getIndexFromYear = (year, oldestYear) =>
    Math.floor((year - oldestYear) / 5);

  const reshapeData = (prefecturePopulation, yearRange) => {
    const boundaryYear = prefecturePopulation.boundaryYear;
    const populationData = prefecturePopulation.data[0].data;
    const newPopulationData = Array(yearRange.length).fill(null);
    const oldestYear = yearRange[0];
    populationData.forEach((populationDatum) => {
      if (populationDatum.year <= boundaryYear) {
        const index = getIndexFromYear(populationDatum.year, oldestYear);
        newPopulationData[index] = populationDatum.value;
      }
    });
    return newPopulationData;
  };

  const makeGraphData = () => {
    const yearRange = getYearRange(displayPrefecturePopulationList);
    const graphData = [];
    displayPrefecturePopulationList.forEach((prefecturePopulation, index) => {
      if (Object.keys(prefecturePopulation).length !== 0) {
        const reshapedData = reshapeData(prefecturePopulation, yearRange);
        graphData.push({
          name: prefectureList[index].prefName,
          data: reshapedData,
        });
      }
    });
    return graphData;
  };

  const options = {
    title: {
      text: "総人口推移",
    },
    yAxis: {
      title: { text: "人口" },
    },
    xAxis: {
      title: { text: "年度" },
      categories: getYearRange(displayPrefecturePopulationList),
    },
    series: makeGraphData(),
  };

  return (
    <ul>
      {/* {displayPrefecture.map((prefecture, index) => (
        <li key={index}>{prefecture.prefName}</li>
      ))} */}
      <HighchartsReact highcharts={Highcharts} options={options} />
    </ul>
  );
};

Graph.propTypes = {
  prefecturePopulationList: PropTypes.array,
  prefectureList: PropTypes.array,
  prefectureSelected: PropTypes.array,
};

export default Graph;
