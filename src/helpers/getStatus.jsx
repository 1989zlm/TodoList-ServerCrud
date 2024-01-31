// BİR DEĞİŞKENİN ÖRN:STATÜSÜN ALABİLECEĞİ FARKLI DEĞERLER ÜZERİNDE KOŞULLAR
// YAZMAK İSTİYORSAK SWİTCH-CASE (İF ELSEDEN DAHA İYİ)

const getStatus = (status) => {
  console.log(status);
  switch (status) {
    case "important":
      return <span className="badge bg-danger">Önemli</span>;
    case "job":
      return <span className="badge bg-warning">İş</span>;
    case "daily":
      return <span className="badge bg-primary">Günlük</span>;
    default:
      return <span className="badge bg-secondary">Varsayılan</span>;
  }
};
export default getStatus;

// BREAK KULLANMADIK ÇÜNKÜ ELİMİZDE Bİ FONKSİYON VAR VE RETURN SATIRLARININ
// İKİNCİ GÖREVİ FONKSİYONU DURDURMAK OLD.İÇİN
