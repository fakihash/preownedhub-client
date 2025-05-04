// HeaderSearch.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "@material-tailwind/react";
import { Search } from "lucide-react";

const HeaderSearch = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim() !== "") {
        const res = await axios.get(
          `http://localhost:4000/api/product/search?query=${query}`
        );
        setSuggestions(res.data); // assumes [{ title, category, _id }]
      } else {
        setSuggestions([]);
      }
    };

    const delay = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(delay);
  }, [query]);

  const handleSearch = (text) => {
    navigate(`/products?search=${encodeURIComponent(text)}`);
    setQuery("");
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <Input
        icon={<Search className="h-5 w-5 text-gray-500" />}
        label="Search products"
        className="w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        crossOrigin={undefined}
      />

      {suggestions.length > 0 && (
        <ul className="absolute bg-white border w-full mt-1 z-10 max-h-60 overflow-y-auto">
          {suggestions.map((item) => (
            <li
              key={item._id}
              onClick={() => handleSearch(item.title || item.category)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {item.title || item.category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HeaderSearch;
