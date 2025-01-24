import PropTypes from "prop-types";

const CountryTable = ({ countries, onDelete }) => {
  return countries.length > 0 ? (
    <table className="CountryTable">
      <thead>
        <tr>
          <th>국가명</th>
          <th>금메달</th>
          <th>은메달</th>
          <th>동메달</th>
          <th>액션</th>
        </tr>
      </thead>
      <tbody>
        {countries.map((country, index) => {
          const rowClass = index % 2 === 0 ? "even-row" : "odd-row";
          return (
            <tr key={index} className={rowClass}>
              <td>{country.name}</td>
              <td>{country.gold}</td>
              <td>{country.silver}</td>
              <td>{country.bronze}</td>
              <td>
                <button
                  className="deleteBtn"
                  onClick={() => onDelete(country.name)}
                >
                  삭제
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : (
    <div className="nullData">
      <p>아직 추가된 국가가 없습니다. 메달을 추적하세요!</p>
    </div>
  );
};

// PropTypes 추가
CountryTable.propTypes = {
  countries: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CountryTable;
