import s from "./SearchBar.module.css";
import toast from "react-hot-toast";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const handleSubmit = (formData: FormData) => {
    const query = formData.get("query") as string;

    if (!query.trim()) {
      toast.error("Please enter your search query.", {
        duration: 2900,
        position: "bottom-right",
      });
      return;
    }
    onSubmit(query);
  };

  return (
    <header className={s.header}>
      <div className={s.container}>
        <a
          className={s.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={s.form} action={handleSubmit}>
          <input
            className={s.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={s.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default SearchBar;
