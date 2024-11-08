export type Coordinate = [number, number];

export type Path = {
  code: number;
  name: string;
  korName: string;
  path: string;
};

export type RLGCode =
  | 11
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 36
  | 41
  | 43
  | 44
  | 46
  | 47
  | 48
  | 50
  | 51
  | 52;

export type RLGName =
  | "Seoul"
  | "Busan"
  | "Daegu"
  | "Incheon"
  | "Gwangju"
  | "Daejeon"
  | "Ulsan"
  | "Sejong-si"
  | "Gyeonggi-do"
  | "Chungcheongbuk-do"
  | "Chungcheongnam-do"
  | "Jeollanam-do"
  | "Gyeongsangbuk-do"
  | "Gyeongsangnam-do"
  | "Jeju Island"
  | "Gangwon State"
  | "Jeonbuk State";

export type RLGKorName =
  | "서울특별시"
  | "부산광역시"
  | "대구광역시"
  | "인천광역시"
  | "광주광역시"
  | "대전광역시"
  | "울산광역시"
  | "세종특별자치시"
  | "경기도"
  | "충청북도"
  | "충청남도"
  | "전라남도"
  | "경상북도"
  | "경상남도"
  | "제주특별자치도"
  | "강원특별자치도"
  | "전북특별자치도";
