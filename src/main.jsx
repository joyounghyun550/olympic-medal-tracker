import { StrictMode } from "react"; // React의 StrictMode를 가져옴
import { createRoot } from "react-dom/client"; // React 18에서 사용하는 새로운 렌더링 방식
import App from "./App.jsx"; // App 컴포넌트를 가져옴

// React 애플리케이션을 "root" DOM 노드에 렌더링
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* StrictMode는 애플리케이션에서 잠재적인 문제를 식별하고 경고를 표시 */}
    <App /> {/* 최상위 컴포넌트인 App을 렌더링 */}
  </StrictMode>
);
