import { useState } from "react";
import "./style.css";

const App = () => {
  // 상태 변수 선언
  const [countryName, setCountryName] = useState("");
  const [goldCount, setGoldCount] = useState("");
  const [silverCount, setSilverCount] = useState("");
  const [bronzeCount, setBronzeCount] = useState("");
  const [countries, setCountries] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  // 국가 추가 핸들러
  const handleAddCountry = (event) => {
    event.preventDefault();
    // 국가명 존재여부 검증
    if (countries.some((country) => country.name === countryName)) {
      alert("해당 국가명이 이미 존재합니다.");
      resetForm();
    } else {
      const newCountry = {
        name: countryName,
        gold: goldCount,
        silver: silverCount,
        bronze: bronzeCount,
      };
      setCountries([...countries, newCountry]);
      resetForm();
    }
  };

  // 국가 업데이트 핸들러
  const handleUpdateCountry = (event) => {
    event.preventDefault();
    const updatedCountries = countries.map((country) => {
      if (country.name === countryName) {
        return {
          ...country,
          gold: goldCount,
          silver: silverCount,
          bronze: bronzeCount,
        };
      }
      resetForm();
      return country;
    });

    // 국가명 업데이트 검증
    if (updatedCountries.some((country) => country.name === countryName)) {
      setCountries(updatedCountries);
      resetForm();
    } else {
      alert("해당 국가명이 존재하지 않습니다.");
    }
  };

  // 국가 삭제 핸들러
  const handleDeleteCountry = (countryName) => {
    const filteredCountries = countries.filter(
      (country) => country.name !== countryName
    );
    setCountries(filteredCountries);
  };

  // 입력값 변경 핸들러
  const handleInputChange = (setter) => (event) => {
    const value = Number(event.target.value);
    if (value >= 0 || event.target.value === "") {
      setter(event.target.value);
    }
  };

  // 폼 리셋 함수
  const resetForm = () => {
    setCountryName("");
    setGoldCount("");
    setSilverCount("");
    setBronzeCount("");
  };

  // 체크박스 확인 여부
  const CheckedHandler = () => {
    setIsChecked(!isChecked);
  };

  // 정렬된 리스트를 반환하는 함수
  const changeSortedItems = () => {
    const countriesCopy = [...countries];

    // 메달 수에 따라 정렬하는 함수
    const sortByMedals = (a, b) => {
      const totalA = Number(a.gold) + Number(a.silver) + Number(a.bronze);
      const totalB = Number(b.gold) + Number(b.silver) + Number(b.bronze);
      return totalB - totalA;
    };

    // 금, 은, 동 메달에 따라 정렬하는 함수
    const sortByIndividualMedals = (a, b) => {
      if (b.gold !== a.gold) {
        return b.gold - a.gold;
      } else if (b.silver !== a.silver) {
        return b.silver - a.silver;
      } else {
        return b.bronze - a.bronze;
      }
    };

    // isChecked에 따라 정렬 기준 선택
    return isChecked
      ? countriesCopy.sort(sortByMedals)
      : countriesCopy.sort(sortByIndividualMedals);
  };

  return (
    <>
      <div className="container">
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
              onChange={CheckedHandler}
            />
          </div>
        </div>
        <form className="inputBox" onSubmit={handleAddCountry}>
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
              onChange={handleInputChange(setGoldCount)}
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
              onChange={handleInputChange(setSilverCount)}
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
              onChange={handleInputChange(setBronzeCount)}
              placeholder="동메달의 개수를 입력해주세요."
              min={0}
              required
            />
          </div>
          <div className="clickBtn">
            <button type="submit" className="addBtn">
              국가 추가
            </button>
            <button onClick={handleUpdateCountry} className="updateBtn">
              업데이트
            </button>
          </div>
        </form>
        <div>
          {countries.length > 0 ? (
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
                {changeSortedItems().map((country, index) => {
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
                          onClick={() => handleDeleteCountry(country.name)}
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
          )}
        </div>
      </div>
    </>
  );
};

export default App;
