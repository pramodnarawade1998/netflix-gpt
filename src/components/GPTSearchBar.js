import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGPTMovieResult } from "../utils/gptSlice";

function GPTSearchBar() {
  const dispatch = useDispatch();

  const langKey = useSelector((store) => store.config.language);
  const searchText = useRef(null);

  // Search Movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS,
    );

    const json = data.json();

    return json.results;
  };

  const handleGPTSearchClick = async () => {
    console.log(searchText.current.value);

    // Make an API Call to GPT API and Movie Results

    const gptQuery =
      "Act as a Movie Recommendation System and Suggest some Movies for the Query" +
      searchText.current.value +
      ". Only give me Names of 5 Movies, Comma Separated like the Example Result given ahead. Example Result : Gadar, Sholay, Don, Golmal, Koi Mil Gaya";

    const gptResults = await openai.chat.completions.create({
      model: "gpt-5.2",
      messages: [{ role: "user", content: gptQuery }],
    });

    if (!gptResults.choices) {
      // TODO : Write Error Handling Here.
    }

    console.log(gptResults.choices?.[0]?.message?.content);
    // "Andaz Apna Apna, Hera Pheri, Chupke Chupke, Jaane Bhi Do Yaaro, Padosan"

    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
    // ["Andaz Apna Apna", "Hera Pheri", "Chupke Chupke", "Jaane Bhi Do Yaaro", "Padosan"]

    // For each Movie I will Search TMDB API

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    // [Promise, Promise, Promise, Promise, Promise]

    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);

    dispatch(
      addGPTMovieResult({ movieNames: gptMovies, movieResults: tmdbResults }),
    );
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="col-span-9 p-4 m-4"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          onClick={handleGPTSearchClick}
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
}

export default GPTSearchBar;
