import Myheader from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
// ** import
// => 컴포넌트는 MyComp from real_File_path; 
//    내부 코드에서 MyComp 이름으로 인식

function App() {
  // 실습 : 객체를 정의하고, 컴포넌트로 전달하여 출력하기
  // test1) Header로 전달
  const bestDress={
    color : 'Red',
    style : 'long',
    price : 99000,
    size : ['small','medium','large']
  }
  
  //test2) Body 로 전달
  const name="GreenComputer";


  return (
    <div className="App">
      <Myheader dresser={bestDress}/>
      <Body alala={name} country={'분당구 미금역 근처'}/>
      <Footer />
    </div>                                                                                                                                              
  );
}

export default App;
