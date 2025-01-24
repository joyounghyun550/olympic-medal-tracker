import PropTypes from "prop-types";

const Form = ({
  countryName,
  setCountryName,
  goldCount,
  setGoldCount,
  silverCount,
  setSilverCount,
  bronzeCount,
  setBronzeCount,
  onAdd,
  onUpdate,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    // 버튼이 어떤 동작을 해야 하는지 구분
    if (event.nativeEvent.submitter.name === "addBtn") {
      onAdd(event); // 국가 추가
    } else if (event.nativeEvent.submitter.name === "updateBtn") {
      onUpdate(event); // 업데이트
    }
  };

  return (
    <form className="inputBox" onSubmit={handleSubmit}>
      <div className="input-field">
        <label>국가명</label>
        <input
          type="text"
          value={countryName}
          onChange={(event) => setCountryName(event.target.value)}
          placeholder="국가명을 입력해주세요."
          required
        />
      </div>
      <div className="input-field">
        <label>금메달</label>
        <input
          type="number"
          value={goldCount}
          onChange={(event) => setGoldCount(event.target.value)}
          placeholder="금메달의 개수를 입력해주세요."
          min={0}
          required
        />
      </div>
      <div className="input-field">
        <label>은메달</label>
        <input
          type="number"
          value={silverCount}
          onChange={(event) => setSilverCount(event.target.value)}
          placeholder="은메달의 개수를 입력해주세요."
          min={0}
          required
        />
      </div>
      <div className="input-field">
        <label>동메달</label>
        <input
          type="number"
          value={bronzeCount}
          onChange={(event) => setBronzeCount(event.target.value)}
          placeholder="동메달의 개수를 입력해주세요."
          min={0}
          required
        />
      </div>
      <div className="clickBtn">
        <button type="submit" name="addBtn">
          국가 추가
        </button>
        <button type="submit" name="updateBtn">
          업데이트
        </button>
      </div>
    </form>
  );
};

// PropTypes 추가
Form.propTypes = {
  countryName: PropTypes.string.isRequired,
  setCountryName: PropTypes.func.isRequired,
  goldCount: PropTypes.string.isRequired,
  setGoldCount: PropTypes.func.isRequired,
  silverCount: PropTypes.string.isRequired,
  setSilverCount: PropTypes.func.isRequired,
  bronzeCount: PropTypes.string.isRequired,
  setBronzeCount: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Form;
