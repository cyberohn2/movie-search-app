import { createContext, useState } from "react"

type FilterKey = "genre" | "year" | "rating" | "sort";

type SearchProviderProp = {
  children: React.ReactNode;
};

type SearchProviderState = {
  query: string;
  filterQuery: Record<FilterKey, string>;
  setQuery: (query: string) => void;
  setFilterQuery: (filter: Record<FilterKey, string>) => void;
};

const initialState: SearchProviderState = {
  query: "",
  filterQuery: {
    genre: "",
    year: "",
    rating: "",
    sort: "",
  },
  setQuery: () => null,
  setFilterQuery: () => null,
};

export const SearchProviderContext = createContext<SearchProviderState>(initialState);

export function SearchProvider({
    children,
}: SearchProviderProp) {
    const [newQuery, setNewQuery] = useState<string>("")
    const [newFilterQuery, setNewFilterQuery] = useState<
      Record<FilterKey, string>
    >({
      genre: "",
      year: "",
      rating: "",
      sort: "",
    });

    const value = {
        query: newQuery,
        filterQuery: newFilterQuery,
        setQuery: (query: string) => {
            setNewQuery(query)
        },
        setFilterQuery: (filter: Record<FilterKey, string>) => {
            setNewFilterQuery(filter)
        }
    }

    return (
        <SearchProviderContext.Provider value={value}>
            {children}
        </SearchProviderContext.Provider>
    )
}