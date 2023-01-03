import { useState, useEffect, useContext } from "react";
import { DELETE, DELETE_SELECTED, SAVE_EDIT, SELECTED } from "../actionTypes";
import { StateContext } from "../adminPage";
import { Pagination } from "../components";

export const Table = ({ dispatch }) => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState([]);
  const userData = useContext(StateContext);
  const [editable, setEditable] = useState([]);
  const [editedName, setEditedName] = useState({});
  const [editedEmail, setEditedEmail] = useState({});
  const [editedRole, setEditedRole] = useState({});

  useEffect(() => {
    let user = userData.users;
    let filteredList = userData.filteredUserList;
    let start = userData.currentPage * 10 - 10;
    let end = userData.currentPage * 10;

    let temp =
      filteredList.length > 0
        ? filteredList.slice(start, end)
        : user.slice(start, end);
    setData([...temp]);
  }, [userData]);

  const handleSelect = (id) => {
    let temp = [...selected];
    if (temp.includes(id)) {
      temp = temp.filter((i) => i !== id);
    } else {
      temp.push(id);
    }
    setSelected([...temp]);
  };

  const handleSelectAll = () => {
    let temp = [...selectAll];
    if (selectAll.includes(userData.currentPage)) {
      temp = temp.filter((cur) => cur !== userData.currentPage);
    } else {
      temp.push(userData.currentPage);
    }
    setSelectAll([...temp]);
  };

  useEffect(() => {
    if (selectAll.includes(userData.currentPage)) {
      let temp = data.map((item) => item.id);
      setSelected([...selected, ...temp]);
    } else {
      let ids = data.map((item) => item.id);
      let temp = [...selected];
      temp = temp.filter((i) => !ids.includes(i));
      setSelected([...temp]);
    }
  }, [selectAll]);

  useEffect(() => {
    dispatch({
      type: SELECTED,
      payload: [...selected],
    });
  }, [selected]);

  const handleDelete = (id) => {
    dispatch({
      type: DELETE,
      payload: id,
    });
  };

  const handleDeleteSelected = () => {
    if (selectAll.length > 0) {
      setSelectAll([]);
    }
    dispatch({
      type: DELETE_SELECTED,
    });
  };

  const handleEditable = (id) => {
    if (!editable.includes(id)) {
      let temp = [...editable];
      temp.push(id);
      setEditable([...temp]);
    }
  };

  const handleEditCancel = (id) => {
    if (editable.includes(id)) {
      let temp = editable.filter((ids) => ids !== id);
      setEditable([...temp]);
      let newEditName = { ...editedName };
      delete newEditName[id];
      let newEditEmail = { ...editedEmail };
      delete newEditEmail[id];
      let newEditRole = { ...editedRole };
      delete newEditRole[id];
      setEditedName({ ...newEditName });
      setEditedEmail({ ...newEditEmail });
      setEditedRole({ ...newEditRole });
    }
  };

  const handleNameChange = (id, value) => {
    let userNameChange = { ...editedName };
    userNameChange[id] = value;
    setEditedName({ ...userNameChange });
  };

  const handleEmailChange = (id, value) => {
    let userEmailChange = { ...editedEmail };
    userEmailChange[id] = value;
    setEditedEmail({ ...userEmailChange });
  };

  const handleRoleChange = (id, value) => {
    let userRoleChange = { ...editedRole };
    userRoleChange[id] = value;
    setEditedRole({ ...userRoleChange });
  };

  const handleSaveEdit = (user) => {
    let editedUser = {
      id: user.id,
      name: editedName[user.id] || user.name,
      email: editedEmail[user.id] || user.email,
      role: editedRole[user.id] || user.role,
    };
    dispatch({
      type: SAVE_EDIT,
      payload: editedUser,
    });
    handleEditCancel(user.id);
  };

  return (
    <>
      <table
        className="mt-4 table-auto text-left w-full"
        cellPadding={16}
        data-testid="table"
      >
        <thead className="border-b">
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={() => handleSelectAll()}
                value={selectAll.includes(userData.currentPage)}
                checked={selectAll.includes(userData.currentPage)}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody data-testid="table-body">
          {data.map((item, index) => {
            return (
              <tr
                className="border-b"
                key={item.id}
                style={{
                  backgroundColor: selected.includes(item.id) && "#cccccc",
                }}
                data-testid="data-row"
              >
                <td>
                  <input
                    type="checkbox"
                    onChange={() => handleSelect(item.id)}
                    value={selected.includes(item.id)}
                    checked={selected.includes(item.id)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={
                      item.id in editedName ? editedName[item.id] : item.name
                    }
                    readOnly={!editable.includes(item.id)}
                    className="outline-none"
                    style={{
                      borderBottom:
                        editable.includes(item.id) && "1px solid #ccc",
                    }}
                    onChange={(e) => handleNameChange(item.id, e.target.value)}
                    data-testid={`name-${index}`}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={
                      item.id in editedEmail ? editedEmail[item.id] : item.email
                    }
                    readOnly={!editable.includes(item.id)}
                    className="outline-none"
                    style={{
                      borderBottom:
                        editable.includes(item.id) && "1px solid #ccc",
                    }}
                    onChange={(e) => handleEmailChange(item.id, e.target.value)}
                    data-testid={`email-${index}`}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={
                      item.id in editedRole ? editedRole[item.id] : item.role
                    }
                    readOnly={!editable.includes(item.id)}
                    className="outline-none"
                    style={{
                      borderBottom:
                        editable.includes(item.id) && "1px solid #ccc",
                    }}
                    onChange={(e) => handleRoleChange(item.id, e.target.value)}
                    data-testid={`role-${index}`}
                  />
                </td>
                <td className="flex gap-3">
                  {editable.includes(item.id) ? (
                    <>
                      <span
                        className="hover:cursor-pointer"
                        aria-label="check-mark"
                        onClick={() => handleSaveEdit(item)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                      </span>
                      <span
                        className="hover:cursor-pointer"
                        aria-label="cross-mark"
                        onClick={() => handleEditCancel(item.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </span>
                    </>
                  ) : (
                    <>
                      <span
                        className="hover:cursor-pointer"
                        onClick={() => handleEditable(item.id)}
                        aria-label="edit-icon"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.2"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </span>
                      <span
                        className="hover:cursor-pointer"
                        onClick={() => handleDelete(item.id)}
                        aria-label="delete-icon"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.2"
                          stroke="red"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </span>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-6 flex items-center relative">
        <button
          className="bg-red-400 rounded-full px-5 py-2 text-white"
          onClick={handleDeleteSelected}
        >
          Delete selected
        </button>
        <Pagination userData={userData} dispatch={dispatch} />
      </div>
    </>
  );
};
