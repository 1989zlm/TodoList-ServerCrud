import { useEffect, useState } from "react";
import Form from "./components/Form";
import Loader from "./components/Loader";
import ListItem from "./components/ListItem";
import axios from "axios";

// varsayılan olarak basurl ekle
// yapılan bütün isteklerin başındaki api urlini belirle
axios.defaults.baseURL = `http://localhost:3000`;

function App() {
  const [todos, setTodos] = useState(null);
  const [page, setPage] = useState(1);
  const [maxPageCount, setMaxPageCount] = useState();

  //BİLEŞENİN EKRANA GELME OLAYI BASILMA OLAYI
  useEffect(() => {
    //APİDEN TODO VERİLERİNİ ALIR
    axios //1.yol
      .get(`/todos`, {
        timeout: 3000,
        timeoutErrorMessage: "zaman aşımı",
        params: {
          _per_page: 5,
          _page: page, // 1 yazdık hep sayfa bir göründu.o yuzden page yazıp dinamik kıldk
        },
      })
      .then((res) => {
        // console.log(res);
        setMaxPageCount(res.data.pages);
        setTodos(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.message === "zaman aşımı") {
          alert("istek zaman aşımına ugradı");
        }
      });

    //2. yol fetch("http://localhost:3000/todos")
    //   .then((res) => res.json())
    //   .then((data) => setTodos(data)); // console.log(data));
  }, [page]);

  return (
    <div className="container p-3 p-md-5">
      <h2 className="text-center">
        TODO<span className="text-warning"> LİST</span>{" "}
      </h2>
      <Form setTodos={setTodos} />
      <ul className="list-group">
        {/* apiden alacağımız her bir veri için bir
         kart basacağız 
         ** TODOSLAR İÇERİSİNDEKİ HERBİR TODO İÇİN EKRANA Bİ LİSTE BAS
         */}
        {/* VERİLER YOKSA LOADER BAS (EER TODOS YOKSA LODAER BAS) */}
        {!todos && <Loader />}

        {/*optional chaining// todos null değilse map yap  */}
        {todos?.map(
          (
            todo // aşağıda todoları prop olarak gönderdik
            //reacttın hata vermemesi için benzersiz bir key atadık
          ) => (
            <ListItem
              key={todo.id}
              todo={todo}
              todos={todos}
              setTodos={setTodos}
            />
            //ŞİMDİ LİSTITEM DOSYASINA GİDİP ORADA ÇEKEN VERİLERİ
            // EKRANDA GÖSTER (APİDEN GELEN VERŞLER YAZSIN) DİYECEĞİZ
            // SONRA EKRANDA DİNAMİK HALDE GÖRECEĞİZ.
          )
        )}
      </ul>
      <div className="d-flex justify-content-between my-5">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="btn btn-primary"
        >
          {"< Geri"}{" "}
        </button>
        <span>{page}</span>
        <button
          disabled={page === maxPageCount}
          onClick={() => setPage(page + 1)}
          className="btn btn-primary"
        >
          {"> İleri"}{" "}
        </button>
      </div>
    </div>
  );
}
// APİDEN VERİLERİ HEMEN ALIP KULLANMIYORUZ YUKARIDA USESTATE TTE BİR MÜDDET
//NULL KALIYOR O YUZDEN {todos.map((todo)=>(li ))} yazarız
// soru işareti yazarız.
export default App;

// sayfa değiştirme butonlarını tıklayınca sayfa sayısı değişiyor ama
// 2.sayfadakş bilgileri göremiyoruz,buunun nedeni useefectin state her değiştiğinde değil
//sayfa her yenilendiinde çalışmasıdır bunun için dolu bağımlılık dizini yanş
//useeffect fonk. sonundaki diziye page yazmalıyız
