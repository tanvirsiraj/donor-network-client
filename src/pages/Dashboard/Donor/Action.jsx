const Action = ({ handleUpdate, handleDelete }) => {
  return (
    <>
      <button
        onClick={handleUpdate}
        className="text-blue-600 hover:text-blue-800"
        title="Update"
      >
        ✏️
      </button>
      <button
        onClick={handleDelete}
        className="text-red-600 hover:text-red-800"
        title="Delete"
      >
        🗑️
      </button>
    </>
  );
};
export default Action;
