const EditMode = ({ todo, setIsEditMode, handleEdit }) => {
  // console.log(todo);

  return (
    <form
      onSubmit={handleEdit}
      className="d-flex justify-content-between align-items-center w-100 gap-3"
    >
      <select defaultValue={todo.status} className="form-select shadow w-25">
        <option value="deafult">Varsayılan</option>
        <option value="important">Önemli</option>
        <option value="daily">Günlük</option>
        <option value="job">İş</option>
      </select>
      <input
        defaultValue={todo.title}
        className=" form-control w-50 shadow"
        type="text"
      />
      <div className=" btn-group">
        <button type="submit" className="btn btn-success btn-sm">
          Onayla
        </button>
        <button
          //düzenleme modu bitti demeek için
          type="button"
          onClick={() => setIsEditMode(false)}
          className="btn btn-secondary btn-sm"
        >
          İptal
        </button>
      </div>
    </form>
  );
};

export default EditMode;

// düzenle butonuna bastığımızda select alanında seçili olan option
// herseferinde varsayılan olarak geliyor ınput boş geliyor buu yuzden
// edit moda todo prof olrak atadık, select, optın ve ınputa value atadık
