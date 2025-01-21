import { useState } from "react";
import "./style.css";

const App = () => {
  // 상태 변수 선언
  const [countryName, setCountryName] = useState("");
  const [goldCount, setGoldCount] = useState("");
  const [silverCount, setSilverCount] = useState("");
  const [bronzeCount, setBronzeCount] = useState("");
  const [countries, setCountries] = useState([]);

  // 국가 추가 핸들러
  const handleAddCountry = (event) => {
    event.preventDefault();
    const newCountry = {
      name: countryName,
      gold: goldCount,
      silver: silverCount,
      bronze: bronzeCount,
    };
    setCountries([...countries, newCountry]);
    resetForm();
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
      return country;
    });

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

  return (
    <>
      <div className="header">
        <h1>2024 파리 올림픽</h1>
        <div className="headerContent">
          <form className="inputBox" onSubmit={handleAddCountry}>
            <div>
              <label>국가명</label>
              <input
                type="text"
                value={countryName}
                onChange={(event) => setCountryName(event.target.value)}
                placeholder="국가명을 입력해주세요."
                required
              />
            </div>
            <div>
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
            <div>
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
            <div>
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
        </div>
      </div>
      <div className="tableContainer">
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
    </>
  );
};

export default App;
