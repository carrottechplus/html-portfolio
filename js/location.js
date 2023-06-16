const mapContainer = document.querySelector('#map');
const position = new kakao.maps.LatLng(37.503598118960525, 126.97550644009758); //지도 위치 인스턴스
const mapOption = { center: position, level: 2 }; // 지도 생성 옵션
const map = new kakao.maps.Map(mapContainer, mapOption); // 지도 인스턴스 생성

const imgSrc = 'img/marker1.png';
const imgSize = new kakao.maps.Size(232, 99);
const imgOpt = { offset: new kakao.maps.Point(116, 99) };

const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize, imgOpt);

const marker = new kakao.maps.Marker({ position: position, image: markerImage }); // 마커 인스턴트 생성

// 마커 인스턴스에 setMap함수로 지도 인스턴스 바인딩
marker.setMap(map);
