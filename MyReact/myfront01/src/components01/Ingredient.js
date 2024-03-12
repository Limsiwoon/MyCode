
// parents로 부터 amount, measurement, name 를 받아오는 경우 

const Ingredient = ({ amount, measurement, name }) =>
    <li>
        <span className="name">{name}</span>
        <span className="amount">{amount} </span>
        <span className="measurement">{measurement} </span>
    </li>

Ingredient.displayName = 'Ingredient'

export default Ingredient
//list가 가져다 씀
