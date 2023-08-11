import { useForm } from "../hooks";
import { HeroCard } from "../components";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { getHeroesByName } from "../helpers";
import { Hero } from "../interfaces";

export const SearchPage = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const {q = ''} = queryString.parse(location.search);
  const heroes: Hero[] = getHeroesByName(q as string);
  const { formState, onInputChange } = useForm({
    searchText: q as string
  });

  const onSearchSubmit = (event: React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
   /* if ( formState.searchText.trim().length <= 0) return;*/

    navigate(`?q=${formState.searchText.toLowerCase().trim()}`);
  }

  const showSerach: boolean =(q!.length ===0);
  const showError: boolean = (q!.length >0 && heroes.length===0);
  
  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={ onSearchSubmit }>
            <input 
              type="text"
              placeholder="Search a hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={formState.searchText}
              onChange={ onInputChange }
            />

            <button type="submit" className="btn btn-outline-primary mt-1">
              Search
            </button>
          </form>
        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {/*
            (q==='')
            ? <div className="alert alert-primary" style={{ display:'none'}}> Search a hero <b>{q}</b>      </div>
            :(heroes.length ===0)
            &&<div className="alert alert-danger">No hero with <b>{q}</b></div>

          */}
       <div className="alert alert-primary animate_animated  animate_fadeIn" style={{ display: showSerach?'': "none"}}>
        Search a hero <b>{q}</b>
        </div>
        <div className="alert alert-danger animate_animated  animate_fadeIn"style={{display:showError?'':"none"}}>No hero with <b>{q}</b></div>
          {
            heroes.map( hero => (
              <HeroCard key={hero.id} {...hero}/>
            ))
          }
        </div>
      </div>
    </>
  )
}