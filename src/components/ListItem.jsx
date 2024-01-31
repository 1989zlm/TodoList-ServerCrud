import axios from "axios";
import formatDate from "../helpers/formatDate";
import { useState } from "react";
import NormalMode from "./NormalMode";
import EditMode from "./EditMode";

const ListItem = ({ todo, setTodos, todos }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  //silme butuonuna tıklanınca çalışır
  const handleDelete = () => {
    // veriyi apiden sil
    axios
      .delete(`/todos/${todo.id}`)
      //veriyi stateden sil
      // ( bu iş için app.jsx de settodosu listıtem prop olarak
      //gönderdik sonra lisıtem.jsx de yukarıda todo nun yanına setTodos olarak yine yazdık)
      // aşağıda settodos yazılan yere direk todos yazıp onuda yine App.jsxde listıtem prop olarak
      // yazabilirdik ama extra prop kalabalığı olmasın diye bir fonksiyon methodu yazıyoruz
      .then(() =>
        setTodos((todos) => todos.filter((item) => item.id !== todo.id))
      );
  };
  // console.log(isEditMode);

  //form gönderilince çalışır
  const handleEdit = (e) => {
    e.preventDefault();
    // console.log("form gönderildi");

    // inputlardaki verilei al
    const newStatus = e.target[0].value;
    const newTitle = e.target[1].value;

    console.log(newStatus, newTitle);
    //apideki ilgili todoyu güncelle
    axios
      .patch(`/todos/${todo.id}`, {
        title: newTitle,
        status: newStatus,
      })
      //api isteği başarılı olursa (then ile) arayüzü güncelle
      .then(() => {
        // buurada axiosla yaptığımız değişiklikleri aynı anda ekranda
        //görebilmek için usestate ile arayuzu yeniden güncelliyoruz.
        //State teki eski todoyu kaldır yeni todoyu koy arayüzü güncelle
        //todonun title ve statusunu güncelle
        const updated = { ...todo, status: newStatus, title: newTitle };

        //Dizideki eski eski todoyu kaldır yerine yenisini koy aşağıda açıklama 4)
        const newTodos = todos.map((todo) =>
          todo.id === updated.id ? updated : todo
        );

        console.log(new Promise((resolve, reject) => {}));
        //state i güncelledik
        setTodos(newTodos);
      });
    //Düzenleme modunu kapat
    setIsEditMode(false);
  };

  return (
    <li className="relative p-3 list-group-item d-flex justify-content-between align-items-center gap-3">
      {/* <span className="badge bg-danger">{todo.status}</span> bunun yerine
    //   get status ü buraya yazıyoruz TODONUN DURUMUNA GÖRE SPAN DÖNDÜRÜR */}
      {!isEditMode ? (
        <NormalMode
          todo={todo}
          setIsEditMode={setIsEditMode}
          handleDelete={handleDelete}
        /> // çalışması için fonksiyonlarını prop  olarak gönderdik
      ) : (
        <EditMode
          todo={todo}
          setIsEditMode={setIsEditMode}
          handleEdit={handleEdit}
        />
      )}
      <span className="date">{formatDate(todo.date)}</span>
    </li>
  );
};

export default ListItem;

//<span className="badge bg-danger">{todo.status}</span>
//burada statülerin elimizdeki veriye yazı içeriğinin farklı olmasını istiyorum
// o yuzden
//<span className="badge bg-danger">{todo.status === 'important ? 'önemli :todo.status === 'job ? 'iş : 'vsvs }</span>
//yazabilirdik ama biz ikinici yolu switch-case i seçtik
//get status dosyasında

// eğerki yaptığımız güncellemeler sayfayı güncellmeden ekrana düşmüyorsa
// ozaman state i güncellmediğimiz veya yanlış güncellediğimiz anlamına gelir
//JS DE BU İŞ İÇİN RENDER FONKSİYONUNU EKRANA YENİDEN BASARIZ.

//EĞER BOOLEAN YANİ TRUE VE FALSE BİR USESTATE DEĞERİ TUTULACAKSA İS BAŞA GETİRRİLİR
//[İSEDİTMODE] YANİ DÜZENLEME MODUNDAYSAM DEMEK OLYOR..sonra ternary yapılırkoşullu renderlama

//4) eğerki bu elemanın id si benim güncelleyeceğim elamanın idsine eşitse
//ozaman güncelleyeceğim elemanı, değilse elemanın eski halini koy.
