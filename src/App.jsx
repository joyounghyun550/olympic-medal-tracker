import { useState } from "react"; // React에서 useState를 가져옴
import Header from "./components/Header.jsx"; // Header 컴포넌트 가져오기
import Form from "./components/Form.jsx"; // Form 컴포넌트 가져오기
import CountryTable from "./components/CountryTable.jsx"; // CountryTable 컴포넌트 가져오기
import localStorageUtil, { STORAGE_KEYS } from "./util/localStorageUtil.js"; // localStorage 유틸리티와 키값 가져오기
import "./style.css"; // 스타일 가져오기

// App 컴포넌트 정의
const App = () => {
  // 상태 선언: 국가 이름, 메달 수, 국가 리스트, 체크박스 상태
  const [countryName, setCountryName] = useState(""); // 국가 이름 상태
  const [goldCount, setGoldCount] = useState(""); // 금메달 수 상태
  const [silverCount, setSilverCount] = useState(""); // 은메달 수 상태
  const [bronzeCount, setBronzeCount] = useState(""); // 동메달 수 상태
  const [countries, setCountries] = useState(
    localStorageUtil.get(STORAGE_KEYS.COUNTRIES) // localStorage에서 국가 리스트 불러오기
  );
  const [isChecked, setIsChecked] = useState(false); // 정렬 방식 체크박스 상태

  // 국가 추가 핸들러
  const handleAddCountry = (event) => {
    event.preventDefault(); // 기본 폼 제출 동작 방지
    const koreanPattern = /^[가-힣]+$/; // 한글만 허용하는 정규식
    if (!koreanPattern.test(countryName)) {
      alert("국가명은 한글로만 입력해야 합니다."); // 한글이 아닐 경우 경고
      return;
    }
    if (countries.some((country) => country.name === countryName)) {
      alert("해당 국가명이 이미 존재합니다."); // 중복된 국가명일 경우 경고
    } else {
      // 새로운 국가 객체 생성
      const newCountry = {
        name: countryName,
        gold: goldCount,
        silver: silverCount,
        bronze: bronzeCount,
      };
      // 새로운 국가를 추가한 배열 생성 및 상태 업데이트
      const updatedCountries = [...countries, newCountry];
      setCountries(updatedCountries);
      localStorageUtil.set(STORAGE_KEYS.COUNTRIES, updatedCountries); // localStorage에 저장
    }
    resetForm(); // 폼 리셋
  };

  // 국가 정보 수정 핸들러
  const handleUpdateCountry = (event) => {
    event.preventDefault(); // 기본 폼 제출 동작 방지

    // 국가 이름이 일치하면 메달 정보를 업데이트, 아니면 그대로 유지
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

    // 수정 대상 국가가 존재하면 상태 및 localStorage 업데이트
    if (updatedCountries.some((country) => country.name === countryName)) {
      setCountries(updatedCountries);
      localStorageUtil.set(STORAGE_KEYS.COUNTRIES, updatedCountries);
    } else {
      alert("해당 국가명이 존재하지 않습니다."); // 국가명이 없으면 경고
    }
    resetForm(); // 폼 리셋
  };

  // 국가 삭제 핸들러
  const handleDeleteCountry = (countryName) => {
    // 삭제 대상 국가를 제외한 배열 생성
    const updatedCountries = countries.filter(
      (country) => country.name !== countryName
    );
    setCountries(updatedCountries); // 상태 업데이트
    localStorageUtil.set(STORAGE_KEYS.COUNTRIES, updatedCountries); // localStorage에 저장
  };

  // 폼 초기화 함수
  const resetForm = () => {
    setCountryName(""); // 국가 이름 초기화
    setGoldCount(""); // 금메달 수 초기화
    setSilverCount(""); // 은메달 수 초기화
    setBronzeCount(""); // 동메달 수 초기화
  };

  // 체크박스 상태 변경 핸들러
  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked); // 상태 토글
  };

  // 국가 리스트 정렬 함수
  const changeSortedItems = () => {
    const countriesCopy = [...countries]; // 원본 배열 복사

    // 총 메달 수 기준 정렬
    const sortByMedals = (a, b) => {
      const totalA = Number(a.gold) + Number(a.silver) + Number(a.bronze);
      const totalB = Number(b.gold) + Number(b.silver) + Number(b.bronze);
      return totalB - totalA; // 총합 내림차순
    };

    // 금, 은, 동 순서로 정렬
    const sortByIndividualMedals = (a, b) => {
      if (b.gold !== a.gold) return b.gold - a.gold; // 금메달 우선
      if (b.silver !== a.silver) return b.silver - a.silver; // 은메달 우선
      return b.bronze - a.bronze; // 동메달 우선
    };

    // 체크박스 상태에 따라 정렬 방식 선택
    return isChecked
      ? countriesCopy.sort(sortByMedals)
      : countriesCopy.sort(sortByIndividualMedals);
  };

  // UI 렌더링
  return (
    <div className="container">
      {/* 헤더 컴포넌트: 체크박스 상태 전달 */}
      <Header isChecked={isChecked} onCheck={handleCheckboxToggle} />
      {/* 폼 컴포넌트: 상태 및 핸들러 전달 */}
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
      {/* 국가 테이블 컴포넌트: 정렬된 데이터 및 삭제 핸들러 전달 */}
      <CountryTable
        countries={changeSortedItems()}
        onDelete={handleDeleteCountry}
      />
    </div>
  );
};

export default App; // 컴포넌트 내보내기
