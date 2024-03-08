// ** 1컴포넌트 1화일
// => 그러므로  export default 많이 사용됨.

export default function Header(props){
    return (
      <header>
        <h1> ** Header ** </h1>
        <h3> 안녕하세요 ~~ </h3>
        <p>금주의 베스트 드레스 를 알려드립니다! 드레서~ 아닙미다<br/>
            Best_Dress : color = {props.dresser.color} , style = {props.dresser.style} , price = {props.dresser.price} <br/>
            size는 {props.dresser.size.length} 개의 종류가 있습미다</p>
      </header>  

    );
}

