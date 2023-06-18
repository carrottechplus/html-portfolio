const mapContainer = document.querySelector('#map');
const btns = document.querySelectorAll('.branch li');

const markerInfo = [
	{
		title: '광화문',
		position: new kakao.maps.LatLng(37.57598923870742, 126.9768610125929),
		imgSrc: 'img/marker1.png',
		imgSize: new kakao.maps.Size(232, 99),
		imgPos: { offset: new kakao.maps.Point(116, 99) },
		button: btns[0],
	},
	{
		title: '수정전',
		position: new kakao.maps.LatLng(37.578987, 126.976045),
		imgSrc: 'img/marker2.png',
		imgSize: new kakao.maps.Size(232, 99),
		imgPos: { offset: new kakao.maps.Point(116, 99) },
		button: btns[1],
	},
	{
		title: '카카오본사',
		position: new kakao.maps.LatLng(33.450701, 126.570667),
		imgSrc: 'img/marker1.png',
		imgSize: new kakao.maps.Size(232, 99),
		imgPos: { offset: new kakao.maps.Point(116, 99) },
		button: btns[2],
	},
];

//markerInfo의 첫번째 데이터로 기본 지도 인스턴스 생성
const map = new kakao.maps.Map(mapContainer, { center: markerInfo[0].position, level: 3 });

// markerInfo 배열 데이터를 통해서 기존 맵인스턴스에 반복을 돌며 마커 생성하고 바인딩
markerInfo.forEach((info) => {
	const marker = new kakao.maps.Marker({ position: info.position, image: new kakao.maps.MarkerImage(info.imgSrc, info.imgSize, info.imgPos) });

	marker.setMap(map);

	info.button.addEventListener('click', () => {
		map.panTo(info.position);
	});
});
