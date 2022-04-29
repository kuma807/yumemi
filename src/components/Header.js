const style = {
  width: "100%",
  position: "fixed",
  zIndex: 99,
  top: 0,
  left: 0,
  color: "#fff",
  background: "#aaa",
};

const Header = () => {
  return (
    <header style={style}>
      <h1 style={{ textAlign: "center" }}>総人口推移グラフ</h1>
    </header>
  );
};

export default Header;
