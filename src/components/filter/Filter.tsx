import "./Filter.scss";

type FilterProps = {
  filterValue: "all" | "completed" | "not completed";
  setFilterValue: (filterValue: "all" | "completed" | "not completed") => void;
  searchText: string;
  setSearchText: (text: string) => void;
};

const Filter = ({
  filterValue,
  setFilterValue,
  searchText,
  setSearchText,
}: FilterProps) => {
  return (
    <div className="filter">
      <label>
        <select
          value={filterValue}
          onChange={(miEvento) =>
            setFilterValue(
              miEvento.target.value as "all" | "completed" | "not completed"
            )
          }
        >
          <option value="all">View all</option>
          <option value="completed">Completed</option>
          <option value="not completed">Not completed</option>
        </select>
      </label>

      <label>
        <input
          type="text"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search by text"
        />
      </label>
    </div>
  );
};

export default Filter;
