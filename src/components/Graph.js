import PropTypes from "prop-types";

const Graph = ({ prefectureList, prefectureSelected }) => {
  const displayPrefecture = prefectureList.filter((prefecture, index) => {
    return prefectureSelected[index];
  });
  return (
    <ul>
      {displayPrefecture.map((prefecture, index) => (
        <li key={index}>{prefecture.prefName}</li>
      ))}
    </ul>
  );
};

Graph.propTypes = {
  prefectureList: PropTypes.array,
  prefectureSelected: PropTypes.array,
};

export default Graph;
