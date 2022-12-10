export const SearchBar = () => {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search by name, email or role"
        className="outline-none border border-grey w-full py-1 px-3 rounded-md"
      />
    </div>
  );
};
