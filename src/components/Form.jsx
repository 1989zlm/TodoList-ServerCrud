import { v4 } from "uuid";
import axios from "axios";

const Form = ({ setTodos }) => {
  const handleSubmit = (e) => {
    //2)
    e.preventDefault();

    //formdan verileri alma 3)
    const title = e.target[0].value;
    const status = e.target[1].value;

    // console.log(title, status);

    //boş inputa karşı ınutu kontrol et
    if (!title) {
      // başlık yoksa uyarı ver ancak çalışma demek
      //için alertin önüne return ekledik yoksa hem uyarı verir hem çalışmaya devam ederdi.
      return alert("lutfen başlık girniz");
    }
    // console.log("veri veri tabanına eklendi");

    // VERİTABANINA EKLENİCEK VERİYİ HAZIRLA
    const newTodo = {
      title: title,
      status: status,
      id: v4(),
      date: new Date().toLocaleDateString(),
    };
    // console.log(newTodo);
    // OLUŞTURDUĞUMUZ TODOYU APİ'YE KAYDEDER VERİ TABANINA EKLENECEK BUUNLAR
    //1.yol
    // fetch("http://localhost:3000/todos", {
    //   method: "POST",
    //   body: JSON.stringify(newTodo),
    // })
    // (api isteği başarılı oluursa) NEWTODOYU STATE EKLE (DB.JSONDAKİ NOTUN DEVAMI VE AŞAĞIDA)
    // .then(() => setTodos((prev) => [newTodo, ...prev]))
    // api isteği başarısız olursa
    // .catch(() => alert("üzgünüz bir sorun oluştu")); //aşağıda açıklama var

    //Axios yöntemi 2.yol
    axios
      .post("/todos", newTodo)
      // (api isteği başarılı oluursa) NEWTODOYU STATE EKLE (DB.JSONDAKİ NOTUN DEVAMI VE AŞAĞIDA)
      .then(() => setTodos((prev) => [newTodo, ...prev]))
      // api isteği başarısız olursa
      .catch(() => alert("üzgünüz bir sorun oluştu")); //aşağıda açıklama var
  };

  return (
    //form alanına bi onsubmıt ekleyip form çalıştığı anda
    //bi fonk.çalıştıralım (formdan alınan verilerle apiye yeni eleman eklenmesi için)
    <form
      onSubmit={handleSubmit} //1)
      className="d-flex justify-content-center gap-3 my-5"
    >
      <input placeholder="örn:iş" className="form-control shadow" type="text" />

      <select className="form-select w-50 shadow">
        <option>Varsayılan</option>
        <option value="important">Önemli</option>
        <option value="daily">Günlük</option>
        <option value="job">İş</option>
      </select>

      <button type="submit" className="btn btn-primary shadow">
        Gönder
      </button>
    </form>
  );
};

export default Form;

// VERİ TABANINA EKLENECEK VERİY HAZIRLARKEN BENZERSİZ BİR İD İÇİN NPMJS.COM ADRESİNDEN
// NPM İNSTALL UUİD PAKETİNİ İNDİRMELİYİz
// sonra KULLANDIĞIMIZ BU SAYFAYA İMPORT EDERİZ.
//GERÇEK BİR PROJEYE UYGUN OLMASI İÇİN.
//o yuzden ID YERİNE NEW DATE GATE İD YAZMADIK

// NEW TODOYU STAE E EKLEMEK İÇİN EĞER SET TODOS ([ NEWTODO]) YAZARSAK OZAMAN EN SON GİRDİĞİMİZ VERİYİ TEK EKRANDA GÖRÜRÜZ
// ESKİ VE YENİ VERİLERİ BERABER GÖRMEK GEREK OYUZDEN SETTODOS((prev) => [...prev, newTodo]);
// fonksiyonu yazmalıyız. YANİ SET TODO İÖERİSİNDE BİR DİZİ OLACAK VE BU DİZİDE ÖNCEKİ TODOLAR VE YENİ TODO
// OLACAK setTodos((todos)=> [...todos,newTodo]) da diyebiliriz

//ekrana basma isteği state güncelleme işlemii apiden bağımsız gerçekleşiyor
// yani apiden başarısz istekte gelse ekrana ekleme yapıyr
//ekrana yansıyacak  veri isteğinin apiye bağımlı olması lazım
// bu nedenle try catch veya then catch uygulayabiliriz
// ALTIN KURAL HERZAMAN EKRAN GÜNCELLEMELEİ APİ İSTEĞİ İLE BİRBİRİNE BAĞLI OLMALI
