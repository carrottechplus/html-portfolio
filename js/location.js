const mapContainer = document.querySelector('#map');
const position = new kakao.maps.LatLng(33.450701, 126.570667); //지도 위치 인스턴스
const mapOption = { center: position, level: 3 }; // 지도 생성 옵션
const map = new kakao.maps.Map(mapContainer, mapOption); // 지도 인스턴스 생성
const marker = new kakao.maps.Marker({ position: position }); // 마커 인스턴트 생성

// 마커 인스턴스에 setMap함수로 지도 인스턴스 바인딩
marker.setMap(map);
