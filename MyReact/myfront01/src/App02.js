import Myheader from "./components/Header";
import Body from "./components02/Body04";
import MyFooter from "./components/Footer";
// import Recipe from "./components01/Recipe";

import { useState } from 'react';
import Menu from "./components01/Menu";
import Viewer from "./components03/Viewer";
import Controller from "./components03/Controller";

// ** Counter App
// => 숫자 더하기, 빼기만 있는 초간단 앱

// ** 요구사항 분석
// => UI
//    -> 1 Page 에 Count 버튼이 있는 Controller 와 결과를 출력하는 Viewer 2개 영역 
//       즉, App.js 외에 Controller,  Viewer 2개의 컴포넌트로 구성
//    -> Controller : 6개의 버튼 ( -1, -10, -100, +100, +10, +1 )
//    -> css : 적절하게 중앙에 위치하도록 App.css 수정

// => 기능구현
//    -> State 이용
//    -> Controller 의 버튼을 클릭하면 State값 변경 -> Viewer에 전달되어 출력됨
//    -> State 정의 위치 비교
//       ( Controller,  Viewer 사이는 Props로 전달 불가, 그러므로 부모인 App 에 정의 )

// ** 결론 (React 앱의 특징)
// => State : 자식 컴포넌트와 데이터, 이벤트 공유를 통해 관리가능
// => 데이터 (Props) : 부모 -> 자식 (단방향 데이터 흐름)
// => 이벤트 (함수)  : 자식 -> 부모
// => 이러한 점을 고려해서 앱을 설계한다

// ** 이벤트핸들러
// => Data 의 한종류 이므로 자식 컴포넌트에 전달가능

function App() {

  const [ count, setCount ] = useState(0);
  // 초기값은 0

  const onChangeState = (num) => {
    setCount(count+num) ;
    //set으로 정의한 것이 아니라면 활용 할 수 없음 주의 %% 
  }
  //count값이 변경되는 즉시, 전달되어감 

  console.log("** App Update !!! **");

  return (
    <div class="App"> 
      <h2> * Simple Counter * </h2>
      <Viewer count={count}/>
      <Controller onChangeState ={onChangeState}/>
    </div>
  );
}

export default App;
