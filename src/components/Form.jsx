import PropTypes from "prop-types"; // PropTypes를 가져와 컴포넌트 props의 타입을 검증

// Form 컴포넌트 정의
// props를 통해 국가 정보와 상태 업데이트 함수, 이벤트 핸들러를 받음
const Form = ({
  countryName, // 현재 입력된 국가명
  setCountryName, // 국가명 상태를 업데이트하는 함수
  goldCount, // 현재 입력된 금메달 개수
  setGoldCount, // 금메달 개수 상태를 업데이트하는 함수
  silverCount, // 현재 입력된 은메달 개수
  setSilverCount, // 은메달 개수 상태를 업데이트하는 함수
  bronzeCount, // 현재 입력된 동메달 개수
  setBronzeCount, // 동메달 개수 상태를 업데이트하는 함수
  onAdd, // 국가 추가 동작을 처리하는 이벤트 핸들러
  onUpdate, // 국가 정보 업데이트 동작을 처리하는 이벤트 핸들러
}) => {
  // 폼 제출 시 호출되는 핸들러
  const handleSubmit = (event) => {
    event.preventDefault(); // 기본 폼 제출 동작 방지

    // 제출된 버튼의 name 속성을 기준으로 동작 구분
    if (event.nativeEvent.submitter.name === "addBtn") {
      onAdd(event); // 국가 추가 동작 실행
    } else if (event.nativeEvent.submitter.name === "updateBtn") {
      onUpdate(event); // 국가 정보 업데이트 동작 실행
    }
  };

  function preventLeadingZero(input) {
    // 첫 번째 문자가 "0"이고 그 뒤에 다른 숫자가 있으면 "0" 제거
    if (input.value && input.value[0] === "0") {
      input.value = input.value.replace(/^0+(?=\d)/, ""); // 첫 번째 "0" 이후에 다른 숫자가 올 경우 "0"을 제거
    }
  }

  return (
    <form className="inputBox" onSubmit={handleSubmit}>
      {/* 국가명 입력 필드 */}
      <div className="input-field">
        <label>국가명</label>
        <input
          type="text" // 입력 필드 타입: 텍스트
          value={countryName} // 현재 입력된 국가명을 값으로 설정
          onChange={(event) => setCountryName(event.target.value)} // 입력 값 변경 시 상태 업데이트
          placeholder="국가명을 입력해주세요." // 입력 필드에 표시되는 안내 텍스트
          required // 필수 입력 필드로 설정
        />
      </div>

      {/* 금메달 입력 필드 */}
      <div className="input-field">
        <label>금메달</label>
        <input
          type="number" // 입력 필드 타입: 숫자
          value={goldCount} // 현재 입력된 금메달 개수를 값으로 설정
          onChange={(event) => setGoldCount(event.target.value)} // 입력 값 변경 시 상태 업데이트
          placeholder="금메달의 개수를 입력해주세요." // 입력 필드에 표시되는 안내 텍스트
          min={0} // 입력 가능한 최소값 설정 (0 이상)
          required // 필수 입력 필드로 설정
          onInput={(event) => preventLeadingZero(event.target)} //0이 중복되면 0을 제거
        />
      </div>

      {/* 은메달 입력 필드 */}
      <div className="input-field">
        <label>은메달</label>
        <input
          type="number" // 입력 필드 타입: 숫자
          value={silverCount} // 현재 입력된 은메달 개수를 값으로 설정
          onChange={(event) => setSilverCount(event.target.value)} // 입력 값 변경 시 상태 업데이트
          placeholder="은메달의 개수를 입력해주세요." // 입력 필드에 표시되는 안내 텍스트
          min={0} // 입력 가능한 최소값 설정 (0 이상)
          required // 필수 입력 필드로 설정
          onInput={(event) => preventLeadingZero(event.target)} //0이 중복되면 0을 제거
        />
      </div>

      {/* 동메달 입력 필드 */}
      <div className="input-field">
        <label>동메달</label>
        <input
          type="number" // 입력 필드 타입: 숫자
          value={bronzeCount} // 현재 입력된 동메달 개수를 값으로 설정
          onChange={(event) => setBronzeCount(event.target.value)} // 입력 값 변경 시 상태 업데이트
          placeholder="동메달의 개수를 입력해주세요." // 입력 필드에 표시되는 안내 텍스트
          min={0} // 입력 가능한 최소값 설정 (0 이상)
          required // 필수 입력 필드로 설정
          onInput={(event) => preventLeadingZero(event.target)} //0이 중복되면 0을 제거
        />
      </div>

      {/* 버튼 영역 */}
      <div className="clickBtn">
        <button type="submit" name="addBtn">
          국가 추가
        </button>{" "}
        {/* 국가 추가 버튼 */}
        <button type="submit" name="updateBtn">
          업데이트
        </button>{" "}
        {/* 국가 정보 업데이트 버튼 */}
      </div>
    </form>
  );
};

// PropTypes를 사용하여 props의 타입과 필수 여부 정의
Form.propTypes = {
  countryName: PropTypes.string.isRequired, // 국가명은 문자열 타입이며 필수
  setCountryName: PropTypes.func.isRequired, // 국가명을 업데이트하는 함수는 필수
  goldCount: PropTypes.string.isRequired, // 금메달 개수는 문자열 타입이며 필수
  setGoldCount: PropTypes.func.isRequired, // 금메달 개수를 업데이트하는 함수는 필수
  silverCount: PropTypes.string.isRequired, // 은메달 개수는 문자열 타입이며 필수
  setSilverCount: PropTypes.func.isRequired, // 은메달 개수를 업데이트하는 함수는 필수
  bronzeCount: PropTypes.string.isRequired, // 동메달 개수는 문자열 타입이며 필수
  setBronzeCount: PropTypes.func.isRequired, // 동메달 개수를 업데이트하는 함수는 필수
  onAdd: PropTypes.func.isRequired, // 국가 추가 이벤트 핸들러는 필수
  onUpdate: PropTypes.func.isRequired, // 국가 정보 업데이트 이벤트 핸들러는 필수
};

export default Form; // Form 컴포넌트 내보내기
