import PropTypes from "prop-types"; // PropTypes를 가져와 컴포넌트 props의 타입을 정의

// Header 컴포넌트 정의
// isChecked: 체크박스의 상태 (true/false)
// onCheck: 체크박스 상태 변경 시 호출되는 이벤트 핸들러
const Header = ({ isChecked, onCheck }) => {
  return (
    <div className="header">
      {/* 타이틀 영역 */}
      <div className="title">
        <h1>2024 파리 올림픽</h1> {/* 헤더 타이틀 출력 */}
      </div>

      {/* 체크박스 영역 */}
      <div className="totalCheckBox">
        <label>총 메달수 정렬</label> {/* 체크박스 라벨 */}
        <input
          className="checkbox" // CSS 클래스 설정
          type="checkbox" // 체크박스 타입 설정
          checked={isChecked} // 체크박스 상태 연결
          onChange={onCheck} // 상태 변경 시 onCheck 호출
        />
      </div>
    </div>
  );
};

// PropTypes를 사용하여 props의 타입과 필수 여부를 정의
Header.propTypes = {
  isChecked: PropTypes.bool.isRequired, // isChecked는 boolean 타입이며 필수
  onCheck: PropTypes.func.isRequired, // onCheck는 함수 타입이며 필수
};

export default Header; // Header 컴포넌트 내보내기
