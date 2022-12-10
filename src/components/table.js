export const Table = () => {
  return (
    <table className="mt-4 table-auto text-left w-full" cellPadding={16}>
      <thead className="border-b">
        <tr>
          <th>
            <input type="checkbox" />
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b">
          <td>
            <input type="checkbox" />
          </td>
          <td>Aaron Miles</td>
          <td>aaron@geektrust.in</td>
          <td>Member</td>
          <td>edit,delete</td>
        </tr>
        <tr className="border-b">
          <td>
            <input type="checkbox" />
          </td>
          <td>Aaron Miles</td>
          <td>aaron@geektrust.in</td>
          <td>Member</td>
          <td>edit,delete</td>
        </tr>
      </tbody>
    </table>
  );
};
