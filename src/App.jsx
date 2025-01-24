import { useState } from "react";
import Header from "./components/Header.jsx";
import Form from "./components/Form.jsx";
import CountryTable from "./components/CountryTable.jsx";
import localStorageUtil, { STORAGE_KEYS } from "./util/localStorageUtil.js";
import "./style.css";

const App = () => {
  const [countryName, setCountryName] = useState("");
  const [goldCount, setGoldCount] = useState("");
  const [silverCount, setSilverCount] = useState("");
  const [bronzeCount, setBronzeCount] = useState("");
  const [countries, setCountries] = useState(
    localStorageUtil.get(STORAGE_KEYS.COUNTRIES)
  );
  const [isChecked, setIsChecked] = useState(false);

  const handleAddCountry = (event) => {
    event.preventDefault();
    const koreanPattern = /^[가-힣]+$/;
    if (!koreanPattern.test(countryName)) {
      alert("국가명은 한글로만 입력해야 합니다.");
      return;
    }
    if (countries.some((country) => country.name === countryName)) {
      alert("해당 국가명이 이미 존재합니다.");
    } else {
      const newCountry = {
        name: countryName,
        gold: goldCount,
        silver: silverCount,
        bronze: bronzeCount,
      };
      const updatedCountries = [...countries, newCountry];
      setCountries(updatedCountries);
      localStorageUtil.set(STORAGE_KEYS.COUNTRIES, updatedCountries);
    }
    resetForm();
  };

  const handleUpdateCountry = (event) => {
    event.preventDefault();

    const updatedCountries = countries.map((country) =>
      country.name === countryName
        ? {
            ...country,
            gold: goldCount,
            silver: silverCount,
            bronze: bronzeCount,
          }
        : country
    );

    if (updatedCountries.some((country) => country.name === countryName)) {
      setCountries(updatedCountries);
      localStorageUtil.set(STORAGE_KEYS.COUNTRIES, updatedCountries);
    } else {
      alert("해당 국가명이 존재하지 않습니다.");
    }
    resetForm();
  };

  const handleDeleteCountry = (countryName) => {
    const updatedCountries = countries.filter(
      (country) => country.name !== countryName
    );
    setCountries(updatedCountries);
    localStorageUtil.set(STORAGE_KEYS.COUNTRIES, updatedCountries);
  };

  const resetForm = () => {
    setCountryName("");
    setGoldCount("");
    setSilverCount("");
    setBronzeCount("");
  };

  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked);
  };

  const changeSortedItems = () => {
    const countriesCopy = [...countries];

    const sortByMedals = (a, b) => {
      const totalA = Number(a.gold) + Number(a.silver) + Number(a.bronze);
      const totalB = Number(b.gold) + Number(b.silver) + Number(b.bronze);
      return totalB - totalA;
    };

    const sortByIndividualMedals = (a, b) => {
      if (b.gold !== a.gold) return b.gold - a.gold;
      if (b.silver !== a.silver) return b.silver - a.silver;
      return b.bronze - a.bronze;
    };

    return isChecked
      ? countriesCopy.sort(sortByMedals)
      : countriesCopy.sort(sortByIndividualMedals);
  };

  return (
    <div className="container">
      <Header isChecked={isChecked} onCheck={handleCheckboxToggle} />
      <Form
        countryName={countryName}
        setCountryName={setCountryName}
        goldCount={goldCount}
        setGoldCount={setGoldCount}
        silverCount={silverCount}
        setSilverCount={setSilverCount}
        bronzeCount={bronzeCount}
        setBronzeCount={setBronzeCount}
        onAdd={handleAddCountry}
        onUpdate={handleUpdateCountry}
      />
      <CountryTable
        countries={changeSortedItems}
        onDelete={handleDeleteCountry}
      />
    </div>
  );
};

export default App;
