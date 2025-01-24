import PropTypes from "prop-types"; // PropTypes를 가져와 컴포넌트 props의 타입을 검증

// CountryTable 컴포넌트 정의
// 국가별 메달 정보를 표 형식으로 렌더링하며 삭제 버튼을 제공
const CountryTable = ({ countries, onDelete }) => {
  return countries.length > 0 ? ( // 국가 목록이 존재하는 경우 테이블을 렌더링
    <table className="CountryTable">
      <thead>
        <tr>
          {/* 테이블 헤더 정의 */}
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
          // 테이블 행의 스타일링을 위해 짝수와 홀수 행을 구분
          return (
            <tr key={country.name} className={rowClass}>
              {/* 국가별 데이터 렌더링 */}
              <td>{country.name}</td>
              <td>{country.gold}</td>
              <td>{country.silver}</td>
              <td>{country.bronze}</td>
              <td>
                {/* 삭제 버튼 */}
                <button
                  className="deleteBtn"
                  onClick={() => onDelete(country.name)} // 삭제 버튼 클릭 시 onDelete 호출
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
    // 국가 목록이 비어 있는 경우 대체 메시지를 렌더링
    <div className="nullData">
      <p>아직 추가된 국가가 없습니다. 메달을 추적하세요!</p>
    </div>
  );
};

// PropTypes를 사용하여 props의 타입과 필수 여부를 정의
CountryTable.propTypes = {
  countries: PropTypes.array.isRequired, // 국가 목록은 배열 타입이며 필수
  onDelete: PropTypes.func.isRequired, // 삭제 이벤트 핸들러는 함수 타입이며 필수
};

export default CountryTable; // CountryTable 컴포넌트 내보내기
