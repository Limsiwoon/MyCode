import IngredientsList from './IngredientsList'
import Instructions from './Instructions'

const Recipe = ({ name, ingredients, steps}) =>
    // name , ingredients , steps 를 담아서 list에 전달하게 됨. 
    // section 의 id는 Baked Salmon로 받아감. 
    <section id={name.toLowerCase().replace(/ /g, '-')}>
        <h1>{name}</h1>
        <IngredientsList list={ingredients} />
        <Instructions title="조리 절차"
                      steps={steps} />
    </section>

Recipe.displayName = 'Recipe'

export default Recipe
