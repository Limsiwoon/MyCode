import Myheader from "./components/Header";
import Body from "./components02/Body04";
import MyFooter from "./components/Footer";
// import Recipe from "./components01/Recipe";

import { useEffect, useRef, useState } from 'react';
import Menu from "./components01/Menu";
import Viewer from "./components03/Viewer";
import Event from "./components03/Even";
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
  
  // ** LifeCycle Test ********************************
  // 1) useEffect 적용
  // => State 변수인 count 값이 바뀌면 바뀐값을 콘솔로 출력한다.
  // => count 값 초기화 할때도 감지함
  //useEffect(()=>{console.log(` ** useEffect Test1 -> count =${count} `)},[count]);
  
  
  // 2) State 변수 Text 추가 후 확인하기 
  const [text, setText ] = useState(`useEffect test`);
  const onChangeText = (e) => {setText(e.target.value)};
  //useEffect(()=>{console.log(` ** useEffect Test1 -> count =${count} , text =${text}  `)},[count]);
  //seEffect(()=>{console.log(` ** useEffect Test2 ->  count =${count} , text =${text} `)},[text]);
  //seEffect(()=>{console.log(` ** useEffect Test2 ->  count =${count} , text =${text} `)},[text, count]);

  // => [text] : count 값 변경시에는 출력안됨
  // => [count] : text 값 변경시에는 출력안됨
  // => [count, text] : count 또는 text 변경시 출력됨

  //3) LifeCycle 제어1 : 두번째 인자가 없는 useEffect 
  //  => 콜백함수 실행시켜주는 조건 값이 제시되지 않은 경우, == 조건이 없는 경우 
  //  => 랜더링이 될때마다 실행되는 것. 
  //useEffect(()=>{console.log(` ** useEffect lifeCycle 두번째 인자 X ->  count =${count} , text =${text} `)});

  // 4) LifeCycle 제어 2 : 두번째 인자가 빈배열 인경우, 
  // Mount 제어 
  //  -> useEffect 에 빈 배열을 전달하면 마운트 시점에만 콜백함수 실행
  //    ( 처음 한번만 실행됨 확인 -> 그러므로 Mount 제어에 이용)
  //useEffect(()=>{console.log(` ** useEffect 4) 빈배열인 경우 ->  count =${count} , text =${text} `)},[]);

  // => 5) LifeCycle 제어3
  //  -> Update(리랜더링)시에만 호출
  //  -> 3)의 경우(항상 렌더링)에서 4)의 경우(첫번째만 랜더링시)만 제외시켜줌 

  //  -> 최초 랜더링(마운트) 인지 확인하고, 아닌 경우에만 출력한다.
  //  -> 그러므로 최초 랜더링(마운트) 시점 인지 판별하는 변수를 정의하고 초기값을 false 로 지정
  //    Ref 객체로 생성
  //    ( Ref 객체는 DOM요소 참조 뿐만아니라 컴포넌트의 변수로도 활용됨 ) 
  const didMountRef = useRef(false);

  //그냥은 접근 불가 -> current 활용
  /*
  useEffect( ()=>{
    if( !didMountRef.current ){
      //최초 랜더링 시점 : mount 시점 => 출력 없이 return (콜백 함수 종료)
      didMountRef.current=true;
    } else {
      console.log(` ** useEffect Test 5) 리랜더링 count=${count} ,  text =${text}`);
    }

  } );
  */

  // 6) LifeCycle 제어 4 : UnMount 제어
  // => 클린업(CleanUp)
  //    특정함수가 실행되고 종료된 후 미처 정리하지못한 사항을 정리하는것
  // => 클린업 필요성 Test : useEffect (setInterval 사용하고 배열 없는) 추가

  //useEffect(() => { setInterval(()=>{ console.log('** 깜빡 **')}, 1000)}); 
  // 랜더링할때 마다 호출 (위3번 ) ,  클린업(CleanUp) 기능이 없는 코드

  // => 두번째 인자 배열이 없으므로 랜더링 할때마다 콜백함수 실행됨
  // => 콜백함수에서 호출한 setInterval 에 의해 1초마다 콘솔출력됨
  // => 그러나 + , - 클릭으로 리랜더링이 일어나면, 1초 상관없이 출력됨
  // => 콜백함수에서 호출한 setInterval 에 의해 1초마다 콘솔출력됨
  // => 이유 : setInterval 을 계속 호출하므로 복수의 setInterval 이 계속 생성되기때문
  //           호출한 setInterval 을 종료시켜주지 않았기 때문
  //          (setInterval 은 clearInterval 을 호출해서 종료시켜야 멈춤)
  // => 해결 : useEffect 의 클린업 기능

  // => 클린업 함수
  //    - useEffect 의 콜백함수에서 return 하는 함수
  //    - 콜백함수를 재호출하기 전에 실행됨.
  // => 그러므로 이를 이용하여 리랜더링 할때마다 새 setInterval 생성하고 
  //    기존 setInterval 은 삭제하도록 할 수 있다.  

  // 6.1) 클린업 함수로 setInterval 삭제 추가
  /*
  useEffect(() => { 
    const intervalId = setInterval(()=>{ console.log('** 깜빡 **');}, 1000);
    return () => {
      console.log('** 클린업 함수 **');
      clearInterval(intervalId);
    }}); //useEffect
   */
  // 6.2) 클린업을 이용한 언마운트 제어하기
  // => count 값이 짝수면  
  //    "짝수 입니다" 를 출력하는 컴포넌트 (Even.jsx) 를 만든다.
  // => 이를 이용하여 조건부 랜더링 구현 
  //    ( import, <Even /> 랜더링코드 추가 )
  // => Even 에 useEffect 를 추가해서 언마운트 메시지 출력하기




  console.log("** App Update !!! **");


  return (
    <div class="App"> 
      <h2> * Simple Counter * </h2>
      <section>
        <Viewer count={count}/>
              {/* 6.2 ) Test 
              => count  값이 짝수인 경우만 Event 출력*/}
        {count%2===0 &&<Event/>}
             {/* && : 앞쪽의 조건식이 참이면 뒤쪽 리턴값 랜더링
                 ( 거짓이면 아무것도 랜더링하지않음 ) */}
        <Controller onChangeState ={onChangeState}/>
      </section>
      <section>
        <input value={text} onChange={onChangeText}/> 
      </section>
    </div>
  );
}

export default App;
