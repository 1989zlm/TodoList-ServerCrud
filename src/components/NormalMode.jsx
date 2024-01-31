import getStatus from "../helpers/getStatus";

const NormalMode = ({ todo, setIsEditMode, handleDelete }) => {
  console.log(todo);
  return (
    <>
      {getStatus(todo.status)}
      <span>{todo.title}</span>
      <div className="btn-group">
        <button
          onClick={() => setIsEditMode(true)}
          className="btn btn-sm btn-primary"
        >
          Düzenle
        </button>
        <button onClick={handleDelete} className="btn btn-sm btn-danger">
          Sil
        </button>
      </div>
    </>
  );
};

export default NormalMode;

// GET STATUSU BURADA İMPORT ETTİK NEDEN ?
