// tarihi alır ay/gün formatına çevirir bu fonksiyon detastring yazdık
const formatDate = (dateStr) => {
  // console.log(dateStr);
  //metin formatındaki tarihi aralardaki - göre parçalara ayırdık
  const date = dateStr.split(".");

  // formatlayıp döndür
  return date[0] + "/" + date[1];
};

export default formatDate;

// bu kod bileşenini listıtedan buraya kopyaladık

//KONSOLDA TARİH KISMI - GELİYORSA SPLİT('-') YAZILIR
// YOK / GELİYORSA SPLİT('/') YAZILIR
