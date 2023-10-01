"use client";
import { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/config/store";
import { fetchQuote, fetchAuthorQuotes } from "@/store/actions/actionsQuote";

function Home() {
  const dispatch: AppDispatch = useDispatch(); // Obtiene la función dispatch de Redux

  // Obtiene datos relevantes del estado de Redux utilizando useSelector
  const { data, loading, error } = useSelector(
    (state: RootState) => state.quote
  );

  // Obtiene datos relacionados con las citas del autor desde el estado de Redux
  const authorQuotes = useSelector((state: RootState) => state.authorQuotes);

  // Estado local para controlar la visibilidad de los divs
  const [showQuoteDiv, setShowQuoteDiv] = useState(true); // Muestra el primer div
  const [showAuthorQuotesDiv, setShowAuthorQuotesDiv] = useState(false); // Oculta el segundo div

  // Este efecto se ejecuta al cargar el componente
  useEffect(() => {
    // Al cargar el componente, se llama a la acción fetchQuote para obtener una cita aleatoria
    dispatch(fetchQuote());
  }, [dispatch]); // La dependencia [dispatch] garantiza que se ejecute cuando cambie la función dispatch

  // Esta función maneja el evento de clic en el botón Reload
  const handleReload = () => {
    // Llama a la acción fetchQuote para obtener una nueva cita
    dispatch(fetchQuote());

    // Muestra el primer div y oculta el segundo div al hacer clic en Reload
    setShowQuoteDiv(true);
    setShowAuthorQuotesDiv(false);
  };

  // Esta función maneja el evento de clic en el autor
  const handleAuthorClick = () => {
    if (data && data.quoteAuthor) {
      // Llama a la acción fetchAuthorQuotes con el autor de la cita actual
      dispatch(fetchAuthorQuotes(data.quoteAuthor));

      // Oculta el primer div y muestra el segundo div al hacer clic en el autor
      setShowQuoteDiv(false);
      setShowAuthorQuotesDiv(true);
    }
  };

  return (
    <Fragment>
      <nav className="flex justify-end">
        <button onClick={handleReload} className="flex gap-1 items-center">
          <p className="text-lg">random</p>
          <i className="icon-reload"></i>
        </button>
      </nav>

      <section className="mt-10">
        {loading ? (
          <div className="animate-pulse ps-6 md:ps-36 p-4 mt-52 rounded-lg">
            <div className="bg-gray-200 h-28 w-3/4 mb-4"></div>
            <div className="bg-gray-200 h-4 w-1/2 mb-4"></div>
            <div className="bg-gray-200 h-4 w-1/4"></div>
          </div>
        ) : data ? (
          showQuoteDiv ? (
            <div key={data._id} className="mt-48">
              <p
                className="text-xl md:text-4xl md:ps-20 ps-8 md:m-16 m-6 w-9/12"
                style={{
                  borderLeft:"8px solid #F7DF94",
                }}
              >{`"${data.quoteText}"`}</p>
              <div
                onClick={handleAuthorClick}
                style={{ cursor: "pointer" }}
                className="hover-pointer ps-10 md:ps-24 md:m-16 m-6 "
              >
                <p className="text-xl">{data.quoteAuthor}</p>
                <span
                  className="text-sm"
                  style={{
                    color: "#828282",
                  }}
                >
                  {data.quoteGenre}
                </span>
              </div>
            </div>
          ) : null
        ) : (
          <p>{error}</p>
        )}

        {showAuthorQuotesDiv && authorQuotes.loading ? (
          <section className="ps-0 md:ps-40">
            <div className="animate-pulse p-4 rounded-lg">
              <div className="bg-gray-200 h-4 w-1/2 mb-4"></div>
              <div className="bg-gray-200 h-48 w-3/4 mb-4"></div>
            </div>
            <div className="animate-pulse p-4  rounded-lg">
              <div className="bg-gray-200 h-48 w-3/4 mb-4"></div>
            </div>
          </section>
        ) : showAuthorQuotesDiv && authorQuotes.data.length > 0 ? (
          <section className="mt-16">
            <p className="text-2xl font-bold ps-12 md:ps-40">{data?.quoteAuthor}</p>
            <div>
              {authorQuotes.data.map((quote) => (
                <p
                  key={quote._id}
                  className="text-xl md:text-4xl md:ps-20 ps-4 md:m-16 m-6 w-9/12"
                  style={{
                    borderLeft: "8px solid #F7DF94",
                  }}
                >
                  {`"${quote.quoteText}"`}
                </p>
              ))}
            </div>
          </section>
        ) : (
          showAuthorQuotesDiv && <p>{authorQuotes.error}</p>
        )}
      </section>
    </Fragment>
  );
}

export default Home;
