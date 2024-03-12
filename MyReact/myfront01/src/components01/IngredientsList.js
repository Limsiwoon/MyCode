import Ingredient from './Ingredient'

export const IngredientsList = ({ list }) =>
    <ul className="ingredients">
        {list.map((ingredient, i) => 
            //i(인덱스)굳이 사용할 일이 없더라도, 받아두어 key에 할당해 둘 것. 
            <Ingredient key={i} {...ingredient} />
            //map을 사용하면 반복문을 사용하지 않을 수 있음
            //list내부의 갯수 만큼 읽어 들임. 이름, 수량, 단위
            // => name : 연어 , amount : 500 , measurement : 그램 으로 담아서 전달. 
            //ingredient에 전달 된것을 return 
        )}
    </ul>

IngredientsList.displayName = 'IngredientsList'

export default IngredientsList
