import PropTypes from "prop-types";

const Header = ({ isChecked, onCheck }) => {
  return (
    <div className="header">
      <div className="title">
        <h1>2024 파리 올림픽</h1>
      </div>
      <div className="totalCheckBox">
        <label>총 메달수 정렬</label>
        <input
          className="checkbox"
          type="checkbox"
          checked={isChecked}
          onChange={onCheck}
        />
      </div>
    </div>
  );
};

// PropTypes 추가
Header.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  onCheck: PropTypes.func.isRequired,
};

export default Header;
