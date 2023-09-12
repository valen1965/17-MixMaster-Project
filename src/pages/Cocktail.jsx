import { Link, useLoaderData, Navigate } from 'react-router-dom';
import axios from 'axios';
import Wrapper from '../assets/wrappers/CocktailPage';
import { QueryClient, useQuery } from '@tanstack/react-query';

const singleCocktailUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const singleCocktailQuery = (id) => {
  return {
    queryKey: ['cocktail', id],
    queryFn: async () => {
      const { data } = await axios.get(`${singleCocktailUrl}${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;
    await queryClient.ensureQueryData(singleCocktailQuery(id));
    // console.log(response);
    // const { data } = response;

    return { id };
  };

const Cocktail = () => {
  const { id } = useLoaderData();

  // additional check for errors

  // if (!data) return <h2>something went wrong...</h2>;

  const { data } = useQuery(singleCocktailQuery(id));

  if (!data) return <Navigate to='/' />;

  const singleDrink = data.drinks[0];
  // console.log(singleDrink);
  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strCategory: category,
    strGlass: glass,
    strInstructions: instructions,
  } = singleDrink;

  const validIngredients = Object.keys(singleDrink).filter(
    (key) => key.startsWith('strIngredient') && singleDrink[key] !== null
  );

  const ingredients = validIngredients.map((key) => singleDrink[key]);
  // console.log(validIngredients);
  // console.log(ingredients);

  return (
    <Wrapper>
      <header>
        <Link to='/' className='btn'>
          back home
        </Link>
        <h3>{name}</h3>
      </header>
      <div className='drink'>
        <img src={image} alt={name} className='img' />
        <div className='drink-info'>
          <p>
            <span className='drink-data'>name: </span>
            {name}
          </p>
          <p>
            <span className='drink-data'>category: </span>
            {category}
          </p>
          <p>
            <span className='drink-data'>info: </span>
            {info}
          </p>
          <p>
            <span className='drink-data'>glass: </span>
            {glass}
          </p>
          <p>
            <span className='drink-data'>ingredients: </span>
            {ingredients.map((item, index) => {
              return (
                <span className='img' key={item}>
                  {item}
                  {index < ingredients.length - 1 ? ',' : '.'}
                </span>
              );
            })}
          </p>
          <p>
            <span className='drink-data'>instruction: </span>
            {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};
export default Cocktail;