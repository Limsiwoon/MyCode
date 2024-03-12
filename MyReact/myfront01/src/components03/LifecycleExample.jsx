import React from 'react';

// ** LifeCycle 메소드
// => 클래스 컴포넌트 에서 사용가능 (LifecycleExample 로 Test)

// => 함수 컴포넌트에서는 Hooks (useEffect) 를 이용해서 처리가능
// => 실습순서 : 카운터 앱 만들기, useEffect Test

// ** LifeCycle Test
// 1. 생성
// => App 실행, 호출
//    생성시작 - constructor - componentDidMount -> 생성완료

// 2. 변경 Test
// => test1) shouldComponentUpdate() : return false 추가 비교
// => test2) shouldComponentUpdate() : return false 추가 후
//           componentDidMount() :  1), 2) 비교 


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ** 컴포넌트 LifeCycle
// => 컴포넌트는 개념적으로 props를 input으로 하고
//    UI가 어떻게 보여야 하는지 정의하는 React Element를 output으로 하는 함수.
// => UI를 구성하기 위해서는 화면에 컴포넌트를 
//    그리고(Mounting), 갱신하고(Updating), 지워야(Unmounting) 함. 
// => 컴포넌트는 이 과정에서 각 프로세스 진행단계 별로 Lifecycle 함수로 불리는 특별한 함수가 실행됨.
//    개발자는 이를 재정의하여 컴포넌트를 제어할 수 있음. (클래스컴포넌트)

// => Mounting : 컴포넌트를 페이지에 처음 랜더링 할때
// => Updating : State, Props 값이 바뀌거나 부모컴포넌트가 리랜더 하면서 자신도 리랜더 될때
// => Unmounting : 컴포넌트가 페이지에서 제거될때 (더이상 랜더링하지않음)

// => 함수 컴포넌트에서는 useEffect 를 이용하여 제어함.

// ** useEffect
// => 어떤 값이 변경될때 마다 특정코드를 실행하는 리액트훅이며
//    이것을 "특정값을 검사한다" 라고 표현함
// => 예를 들면 State 값이 바뀔때 마다 변경된 값을 콘솔에 출력하게 할 수 있음

// => useEffect(callback_함수, [deps]_의존성 배열)
//    두번쨰 인자인 의존성 배열요소의 값이 변경되면 첫번째 인자인 콜백함수를 실행함   

// ** Test
// => 1) State 변수인 count 값이 바뀌면 바뀐값을 콘솔로 출력한다.
// => 2) State 변수 text 추가후 확인하기.
// => 3) LifeCycle 제어
// => 4) Mount 제어
// => 5) Update(리랜더링)시에만 호출하도록 변경
// => 6) UnMount 제어
//    6.1) 클린업 이해 (setInterval 활용)
//    6.2) 클린업을 이용한 언마운트 제어하기

class LifecycleExample extends React.Component {
  static getDerivedStateFromProps() {
    console.log('getDerivedStateFromProps 호출');
    return {};
  }
  constructor(props) {
    super(props);
    // getDerivedStateFromProps를 사용하기 때문에
    // 경고 메세지를 건너뛰기위해 초기 상태를 설정합니다.
    this.state = {};
    console.log('constructor 호출');
  }
  componentDidMount() {
    console.log('componentDidMount 호출');
    // => 1) , 2)  를 번갈아 추가하며 비교
    // => shouldComponentUpdate() 의 return 값과 무관하게 동기화 진행
    //this.setState({ updated: true});  // 1) 상태값 변경
    this.forceUpdate();  // 2) 
    // => forceUpdate() 메서드
    //    클래스형 컴포넌트에서는 공식적으로 리렌더를 강제하는 API.
    //    this.forceUpdate()를 호출하면 shouldComponentUpdate()를 건너뛰고 
    //    render() 메서드가 호출되므로 React가 가상 DOM과 DOM의 상태를 재비교하도록 강제하여 리랜더를 강제함.
  }
  componentDidUpdate() {
    console.log('componentDidUpdate 호출');
  }
  componentWillUnmount() {
    console.log('componentWillUnmount 호출');
  }
  getSnapshotBeforeUpdate() {
    console.log('getSnapshotBeforeUpdate 호출');
    return {};
  }
  shouldComponentUpdate() {
    console.log('shouldComponentUpdate 호출');
    // 강제로 false 를 return 해본다.
    return false;
  }
  render() {
    console.log('render 호출');
    return null;
  }
}

export default LifecycleExample;
