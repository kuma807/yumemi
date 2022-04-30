import PropTypes from "prop-types";

const style = {
  display: "inline",
};

const Prefectures = ({ prefectureList, prefectureSelected, setSelected }) => {
  const onClick = (event) => {
    setSelected(
      prefectureSelected.map((isSelected, index) => {
        if (index === Number(event.target.id)) {
          return !isSelected;
        } else {
          return isSelected;
        }
      })
    );
  };

  return (
    <ul style={style}>
      {prefectureList.map((prefecture, index) => (
        <li key={index} style={style}>
          <input type="checkbox" id={index} onClick={onClick} />
          {prefecture.prefName}
        </li>
      ))}
    </ul>
  );
};

Prefectures.propTypes = {
  prefectureList: PropTypes.array,
  prefectureSelected: PropTypes.array,
  setSelected: PropTypes.func,
};

export default Prefectures;
