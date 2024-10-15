function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
let state = [{ name: "Assam", district: [{}, {}] }];
export const colorList = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#FF33A5",
  "#A533FF",
  "#FF8C33",
  "#33FF8C",
  "#338CFF",
  "#FF338C",
  "#A5FF33",
  "#FFD700",
  "#40E0D0",
  "#6495ED",
  "#DC143C",
  "#7FFF00",
  "#8A2BE2",
  "#FF4500",
  "#00FA9A",
  "#FF69B4",
  "#B22222",
  "#FF6347",
  "#3CB371",
  "#4682B4",
  "#EE82EE",
  "#20B2AA",
  "#DAA520",
  "#1E90FF",
  "#FF1493",
  "#32CD32",
  "#FFB6C1",
  "#9932CC",
  "#FF7F50",
  "#00FF7F",
  "#87CEFA",
  "#FF00FF",
  "#FFDEAD",
  "#2E8B57",
  "#FF4500",
  "#9400D3",
  "#FF8C00",
  "#00FF00",
  "#7B68EE",
  "#FF00FF",
  "#FF6347",
  "#008B8B",
  "#FFD700",
  "#DC143C",
  "#00CED1",
  "#FF1493",
  "#DA70D6",
];
export const AllStateDist = {
  Assam: {
    districts: [
      {
        name: "TAMULPUR",
        color: getRandomColor(),
        fpos: [{ name: "FPO 55", position: { lat: 24.6, lng: 93.78 } }],
      },
      {
        name: "BAJALI",
        color: getRandomColor(),
        fpos: [{ name: "FPO 1", position: { lat: 26.7, lng: 91.25 } }],
      },
      {
        name: "BAKSA",
        color: getRandomColor(),
        fpos: [{ name: "FPO 1", position: { lat: 26.7, lng: 91.25 } }],
      },
      {
        name: "BARPETA",
        color: getRandomColor(),
        fpos: [{ name: "FPO 2", position: { lat: 26.32, lng: 91.01 } }],
      },
      {
        name: "BISWANATH",
        color: getRandomColor(),
        fpos: [{ name: "FPO 3", position: { lat: 26.75, lng: 93.15 } }],
      },
      {
        name: "BONGAIGAON",
        color: getRandomColor(),
        fpos: [{ name: "FPO 4", position: { lat: 26.47, lng: 90.56 } }],
      },
      {
        name: "CACHAR",
        color: getRandomColor(),
        fpos: [{ name: "FPO 5", position: { lat: 24.83, lng: 92.78 } }],
      },
      {
        name: "CHARAIDEO",
        color: getRandomColor(),
        fpos: [{ name: "FPO 6", position: { lat: 27.02, lng: 95.02 } }],
      },
      {
        name: "CHIRANG",
        color: getRandomColor(),
        fpos: [{ name: "FPO 7", position: { lat: 26.5, lng: 90.52 } }],
      },
      {
        name: "DARRANG",
        color: getRandomColor(),
        fpos: [{ name: "FPO 8", position: { lat: 26.45, lng: 92.03 } }],
      },
      {
        name: "DHEMAJI",
        color: getRandomColor(),
        fpos: [{ name: "FPO 9", position: { lat: 27.48, lng: 94.58 } }],
      },
      {
        name: "DHUBRI",
        color: getRandomColor(),
        fpos: [{ name: "FPO 10", position: { lat: 26.02, lng: 89.98 } }],
      },
      {
        name: "DIBRUGARH",
        color: getRandomColor(),
        fpos: [{ name: "FPO 11", position: { lat: 27.48, lng: 94.91 } }],
      },
      {
        name: "DIMA HASAO",
        color: getRandomColor(),
        fpos: [{ name: "FPO 12", position: { lat: 25.5, lng: 93.02 } }],
      },
      {
        name: "GOALPARA",
        color: getRandomColor(),
        fpos: [{ name: "FPO 13", position: { lat: 26.17, lng: 90.62 } }],
      },
      {
        name: "GOLAGHAT",
        color: getRandomColor(),
        fpos: [{ name: "FPO 14", position: { lat: 26.52, lng: 93.97 } }],
      },
      {
        name: "HAILAKANDI",
        color: getRandomColor(),
        fpos: [{ name: "FPO 15", position: { lat: 24.68, lng: 92.57 } }],
      },
      {
        name: "HOJAI",
        color: getRandomColor(),
        fpos: [{ name: "FPO 16", position: { lat: 26.0, lng: 92.86 } }],
      },
      {
        name: "JORHAT",
        color: getRandomColor(),
        fpos: [{ name: "FPO 17", position: { lat: 26.75, lng: 94.22 } }],
      },
      {
        name: "KAMRUP",
        color: getRandomColor(),
        fpos: [{ name: "FPO 18", position: { lat: 26.12, lng: 91.62 } }],
      },
      {
        name: "KAMRUP METROPOLITAN",
        color: getRandomColor(),
        fpos: [{ name: "FPO 19", position: { lat: 26.15, lng: 91.77 } }],
      },
      {
        name: "KARBI ANGLONG",
        color: getRandomColor(),
        fpos: [{ name: "FPO 20", position: { lat: 26.0, lng: 93.52 } }],
      },
      {
        name: "KARIMGANJ",
        color: getRandomColor(),
        fpos: [{ name: "FPO 21", position: { lat: 24.63, lng: 92.35 } }],
      },
      {
        name: "KOKRAJHAR",
        color: getRandomColor(),
        fpos: [{ name: "FPO 22", position: { lat: 26.4, lng: 90.27 } }],
      },
      {
        name: "LAKHIMPUR",
        color: getRandomColor(),
        fpos: [{ name: "FPO 23", position: { lat: 27.23, lng: 94.12 } }],
      },
      {
        name: "MAJULI",
        color: getRandomColor(),
        fpos: [{ name: "FPO 24", position: { lat: 27.0, lng: 94.2 } }],
      },
      {
        name: "MARIGAON",
        color: getRandomColor(),
        fpos: [{ name: "FPO 25", position: { lat: 26.25, lng: 92.35 } }],
      },
      {
        name: "NAGAON",
        color: getRandomColor(),
        fpos: [{ name: "FPO 26", position: { lat: 26.35, lng: 92.68 } }],
      },
      {
        name: "NALBARI",
        color: getRandomColor(),
        fpos: [{ name: "FPO 27", position: { lat: 26.45, lng: 91.43 } }],
      },
      {
        name: "SIVASAGAR",
        color: getRandomColor(),
        fpos: [{ name: "FPO 28", position: { lat: 26.98, lng: 94.64 } }],
      },
      {
        name: "SONITPUR",
        color: getRandomColor(),
        fpos: [{ name: "FPO 29", position: { lat: 26.72, lng: 92.85 } }],
      },
      {
        name: "SOUTH SALMARA-MANKACHAR",
        color: getRandomColor(),
        fpos: [{ name: "FPO 30", position: { lat: 25.5, lng: 89.88 } }],
      },
      {
        name: "TINSUKIA",
        color: getRandomColor(),
        fpos: [{ name: "FPO 31", position: { lat: 27.5, lng: 95.37 } }],
      },
      {
        name: "UDALGURI",
        color: getRandomColor(),
        fpos: [{ name: "FPO 32", position: { lat: 26.72, lng: 92.1 } }],
      },
      {
        name: "WEST KARBI ANGLONG",
        color: getRandomColor(),
        fpos: [{ name: "FPO 33", position: { lat: 26.0, lng: 92.87 } }],
      },
    ],
  },
  "Arunachal Pradesh": {
    districts: [
      {
        name: "TAWANG",
        color: getRandomColor(),
        fpos: [{ name: "FPO 34", position: { lat: 27.58, lng: 91.87 } }],
      },
      {
        name: "WEST KAMENG",
        color: getRandomColor(),
        fpos: [{ name: "FPO 35", position: { lat: 27.27, lng: 92.4 } }],
      },
      {
        name: "EAST KAMENG",
        color: getRandomColor(),
        fpos: [{ name: "FPO 36", position: { lat: 27.02, lng: 93.02 } }],
      },
      {
        name: "PAPUM PARE",
        color: getRandomColor(),
        fpos: [{ name: "FPO 37", position: { lat: 27.22, lng: 93.62 } }],
      },
      {
        name: "SHI YOMI",
        color: getRandomColor(),
        fpos: [{ name: "FPO 37", position: { lat: 27.22, lng: 93.62 } }],
      },
      {
        name: "KURUNG KUMEY",
        color: getRandomColor(),
        fpos: [{ name: "FPO 38", position: { lat: 27.5, lng: 93.5 } }],
      },
      {
        name: "KRA DAADI",
        color: getRandomColor(),
        fpos: [{ name: "FPO 39", position: { lat: 27.33, lng: 93.4 } }],
      },
      {
        name: "LOWER SUBANSIRI",
        color: getRandomColor(),
        fpos: [{ name: "FPO 40", position: { lat: 27.63, lng: 93.92 } }],
      },
      {
        name: "UPPER SUBANSIRI",
        color: getRandomColor(),
        fpos: [{ name: "FPO 41", position: { lat: 27.83, lng: 94.22 } }],
      },
      {
        name: "WEST SIANG",
        color: getRandomColor(),
        fpos: [{ name: "FPO 42", position: { lat: 28.33, lng: 94.62 } }],
      },
      {
        name: "EAST SIANG",
        color: getRandomColor(),
        fpos: [{ name: "FPO 43", position: { lat: 28.07, lng: 95.33 } }],
      },
      {
        name: "KAMLE",
        color: getRandomColor(),
        fpos: [{ name: "FPO 43", position: { lat: 28.07, lng: 95.33 } }],
      },
      {
        name: "SIANG",
        color: getRandomColor(),
        fpos: [{ name: "FPO 44", position: { lat: 28.43, lng: 95.27 } }],
      },
      {
        name: "UPPER SIANG",
        color: getRandomColor(),
        fpos: [{ name: "FPO 45", position: { lat: 28.78, lng: 95.22 } }],
      },
      {
        name: "LOWER SIANG",
        color: getRandomColor(),
        fpos: [{ name: "FPO 46", position: { lat: 28.2, lng: 94.92 } }],
      },
      {
        name: "LOWER DIBANG VALLEY",
        color: getRandomColor(),
        fpos: [{ name: "FPO 47", position: { lat: 28.03, lng: 95.75 } }],
      },
      {
        name: "LEPA RADA",
        color: getRandomColor(),
        fpos: [{ name: "FPO 47", position: { lat: 28.03, lng: 95.75 } }],
      },
      {
        name: "DIBANG VALLEY",
        color: getRandomColor(),
        fpos: [{ name: "FPO 48", position: { lat: 28.92, lng: 95.93 } }],
      },
      {
        name: "ANJAW",
        color: getRandomColor(),
        fpos: [{ name: "FPO 49", position: { lat: 28.78, lng: 96.52 } }],
      },
      {
        name: "LOHIT",
        color: getRandomColor(),
        fpos: [{ name: "FPO 50", position: { lat: 27.92, lng: 96.13 } }],
      },
      {
        name: "NAMSAI",
        color: getRandomColor(),
        fpos: [{ name: "FPO 51", position: { lat: 27.68, lng: 95.92 } }],
      },
      {
        name: "PAKKE KESSANG",
        color: getRandomColor(),
        fpos: [{ name: "FPO 51", position: { lat: 27.68, lng: 95.92 } }],
      },
      {
        name: "CHANGLANG",
        color: getRandomColor(),
        fpos: [{ name: "FPO 52", position: { lat: 27.33, lng: 96.12 } }],
      },
      {
        name: "TIRAP",
        color: getRandomColor(),
        fpos: [{ name: "FPO 53", position: { lat: 27.02, lng: 95.55 } }],
      },
      {
        name: "LONGDING",
        color: getRandomColor(),
        fpos: [{ name: "FPO 54", position: { lat: 27.0, lng: 95.32 } }],
      },
    ],
  },
  Manipur: {
    districts: [
      {
        name: "BISHNUPUR",
        color: getRandomColor(),
        fpos: [{ name: "FPO 55", position: { lat: 24.6, lng: 93.78 } }],
      },
      {
        name: "CHANDEL",
        color: getRandomColor(),
        fpos: [{ name: "FPO 56", position: { lat: 24.33, lng: 94.02 } }],
      },
      {
        name: "CHURACHANDPUR",
        color: getRandomColor(),
        fpos: [{ name: "FPO 57", position: { lat: 24.33, lng: 93.68 } }],
      },
      {
        name: "IMPHAL EAST",
        color: getRandomColor(),
        fpos: [{ name: "FPO 58", position: { lat: 24.8, lng: 93.95 } }],
      },
      {
        name: "IMPHAL WEST",
        color: getRandomColor(),
        fpos: [{ name: "FPO 59", position: { lat: 24.8, lng: 93.88 } }],
      },
      {
        name: "KAKCHING",
        color: getRandomColor(),
        fpos: [{ name: "FPO 60", position: { lat: 24.67, lng: 93.13 } }],
      },
      {
        name: "Senapati",
        color: getRandomColor(),
        fpos: [{ name: "FPO 61", position: { lat: 24.48, lng: 93.98 } }],
      },
      {
        name: "TAMENGLONG",
        color: getRandomColor(),
        fpos: [{ name: "FPO 62", position: { lat: 24.87, lng: 94.47 } }],
      },
      {
        name: "TENGNOUPAL",
        color: getRandomColor(),
        fpos: [{ name: "FPO 63", position: { lat: 25.03, lng: 93.5 } }],
      },
      {
        name: "THOUBAL",
        color: getRandomColor(),
        fpos: [{ name: "FPO 64", position: { lat: 24.85, lng: 93.48 } }],
      },
      {
        name: "UKHRUL",
        color: getRandomColor(),
        fpos: [{ name: "FPO 64", position: { lat: 24.85, lng: 93.48 } }],
      },
      {
        name: "NONEY",
        color: getRandomColor(),
        fpos: [{ name: "FPO 64", position: { lat: 24.85, lng: 93.48 } }],
      },
      {
        name: "PHERZAWL",
        color: getRandomColor(),
        fpos: [{ name: "FPO 64", position: { lat: 24.85, lng: 93.48 } }],
      },
      {
        name: "JIRIBAM",
        color: getRandomColor(),
        fpos: [{ name: "FPO 64", position: { lat: 24.85, lng: 93.48 } }],
      },
      {
        name: "KAMJONG",
        color: getRandomColor(),
        fpos: [{ name: "FPO 64", position: { lat: 24.85, lng: 93.48 } }],
      },
      {
        name: "KANGPOKPI",
        color: getRandomColor(),
        fpos: [{ name: "FPO 64", position: { lat: 24.85, lng: 93.48 } }],
      },
    ],
  },
  Meghalaya: {
    districts: [
      {
        name: "EAST GARO HILLS",
        color: getRandomColor(),
        fpos: [{ name: "FPO 71", position: { lat: 25.53, lng: 90.63 } }],
      },
      {
        name: "NORTH GARO HILLS",
        color: getRandomColor(),
        fpos: [{ name: "FPO 71", position: { lat: 25.53, lng: 90.63 } }],
      },
      {
        name: "SOUTH GARO HILLS",
        color: getRandomColor(),
        fpos: [{ name: "FPO 71", position: { lat: 25.53, lng: 90.63 } }],
      },
      {
        name: "WEST GARO HILLS",
        color: getRandomColor(),
        fpos: [{ name: "FPO 71", position: { lat: 25.53, lng: 90.63 } }],
      },
      {
        name: "SOUTH WEST GARO HILLS",
        color: getRandomColor(),
        fpos: [{ name: "FPO 72", position: { lat: 25.37, lng: 92.6 } }],
      },
      {
        name: "EAST KHASI HILLS",
        color: getRandomColor(),
        fpos: [{ name: "FPO 105", position: { lat: 27.73, lng: 88.62 } }],
      },
      {
        name: "WEST JAINTIA HILLS",
        color: getRandomColor(),
        fpos: [{ name: "FPO 105", position: { lat: 27.73, lng: 88.62 } }],
      },
      {
        name: "East JAINTIA HILLS",
        color: getRandomColor(),
        fpos: [{ name: "FPO 105", position: { lat: 27.73, lng: 88.62 } }],
      },
      {
        name: "SOUTH WEST KHASI HILLS",
        color: getRandomColor(),
        fpos: [{ name: "FPO 105", position: { lat: 27.73, lng: 88.62 } }],
      },
      {
        name: "WEST KHASI HILLS",
        color: getRandomColor(),
        fpos: [{ name: "FPO 105", position: { lat: 27.73, lng: 88.62 } }],
      },
      {
        name: "EASTERN WEST KHASI HILLS",
        color: getRandomColor(),
        fpos: [{ name: "FPO 73", position: { lat: 25.57, lng: 91.88 } }],
      },
      {
        name: "RI BHOI",
        color: getRandomColor(),
        fpos: [{ name: "FPO 73", position: { lat: 25.57, lng: 91.88 } }],
      },
    ],
  },
  Mizoram: {
    districts: [
      {
        name: "AIZAWL",
        color: getRandomColor(),
        fpos: [{ name: "FPO 82", position: { lat: 23.73, lng: 92.72 } }],
      },
      {
        name: "CHAMPHAI",
        color: getRandomColor(),
        fpos: [{ name: "FPO 83", position: { lat: 23.45, lng: 93.33 } }],
      },
      {
        name: "KOLASIB",
        color: getRandomColor(),
        fpos: [{ name: "FPO 84", position: { lat: 24.23, lng: 92.68 } }],
      },
      {
        name: "LAWNGTLAI",
        color: getRandomColor(),
        fpos: [{ name: "FPO 85", position: { lat: 22.53, lng: 92.83 } }],
      },
      {
        name: "LUNGLEI",
        color: getRandomColor(),
        fpos: [{ name: "FPO 86", position: { lat: 22.88, lng: 92.73 } }],
      },
      {
        name: "MAMIT",
        color: getRandomColor(),
        fpos: [{ name: "FPO 87", position: { lat: 23.92, lng: 92.48 } }],
      },
      {
        name: "SAIHA",
        color: getRandomColor(),
        fpos: [{ name: "FPO 88", position: { lat: 22.48, lng: 92.97 } }],
      },
      {
        name: "SERCHHIP",
        color: getRandomColor(),
        fpos: [{ name: "FPO 89", position: { lat: 23.3, lng: 92.83 } }],
      },
      {
        name: "SAITUAL",
        color: getRandomColor(),
        fpos: [{ name: "FPO 90", position: { lat: 23.5, lng: 92.92 } }],
      },
      {
        name: "KHAWZAWL",
        color: getRandomColor(),
        fpos: [{ name: "FPO 91", position: { lat: 23.62, lng: 93.02 } }],
      },
      {
        name: "HNAHTHIAL",
        color: getRandomColor(),
        fpos: [{ name: "FPO 92", position: { lat: 23.03, lng: 92.83 } }],
      },
    ],
  },
  Nagaland: {
    districts: [
      {
        name: "CHUMOUKEDIMA",
        color: getRandomColor(),
        fpos: [{ name: "FPO 93", position: { lat: 25.9, lng: 93.73 } }],
      },
      {
        name: "KIPHIRE",
        color: getRandomColor(),
        fpos: [{ name: "FPO 94", position: { lat: 25.88, lng: 94.83 } }],
      },
      {
        name: "KOHIMA",
        color: getRandomColor(),
        fpos: [{ name: "FPO 95", position: { lat: 25.67, lng: 94.12 } }],
      },
      {
        name: "MOKOKCHUNG",
        color: getRandomColor(),
        fpos: [{ name: "FPO 96", position: { lat: 26.5, lng: 94.8 } }],
      },
      {
        name: "MON",
        color: getRandomColor(),
        fpos: [{ name: "FPO 97", position: { lat: 26.33, lng: 94.53 } }],
      },
      {
        name: "NOKLAK",
        color: getRandomColor(),
        fpos: [{ name: "FPO 98", position: { lat: 26.75, lng: 95.0 } }],
      },
      {
        name: "PHEK",
        color: getRandomColor(),
        fpos: [{ name: "FPO 99", position: { lat: 25.52, lng: 93.72 } }],
      },
      {
        name: "SHAMATOR",
        color: getRandomColor(),
        fpos: [{ name: "FPO 100", position: { lat: 25.62, lng: 94.5 } }],
      },
      {
        name: "TUENSANG",
        color: getRandomColor(),
        fpos: [{ name: "FPO 101", position: { lat: 26.28, lng: 94.83 } }],
      },
      {
        name: "WOKHA",
        color: getRandomColor(),
        fpos: [{ name: "FPO 102", position: { lat: 26.1, lng: 94.27 } }],
      },
      {
        name: "ZUNHEBOTO",
        color: getRandomColor(),
        fpos: [{ name: "FPO 103", position: { lat: 26.0, lng: 94.52 } }],
      },
      {
        name: "DIMAPUR",
        color: getRandomColor(),
        fpos: [{ name: "FPO 103", position: { lat: 26.0, lng: 94.52 } }],
      },
      {
        name: "LONGLENG",
        color: getRandomColor(),
        fpos: [{ name: "FPO 103", position: { lat: 26.0, lng: 94.52 } }],
      },
      {
        name: "NIULAND",
        color: getRandomColor(),
        fpos: [{ name: "FPO 103", position: { lat: 26.0, lng: 94.52 } }],
      },
      {
        name: "PEREN",
        color: getRandomColor(),
        fpos: [{ name: "FPO 103", position: { lat: 26.0, lng: 94.52 } }],
      },
      {
        name: "TSEMINYU",
        color: getRandomColor(),
        fpos: [{ name: "FPO 103", position: { lat: 26.0, lng: 94.52 } }],
      },
    ],
  },
  Sikkim: {
    districts: [
      {
        name: "GANGTOK",
        color: getRandomColor(),
        fpos: [{ name: "FPO 104", position: { lat: 27.33, lng: 88.62 } }],
      },
      {
        name: "MANGAN",
        color: getRandomColor(),
        fpos: [{ name: "FPO 105", position: { lat: 27.73, lng: 88.62 } }],
      },
      {
        name: "NAMCHI",
        color: getRandomColor(),
        fpos: [{ name: "FPO 105", position: { lat: 27.73, lng: 88.62 } }],
      },
      {
        name: "GYALSHING",
        color: getRandomColor(),
        fpos: [{ name: "FPO 105", position: { lat: 27.73, lng: 88.62 } }],
      },
      {
        name: "PAKYONG",
        color: getRandomColor(),
        fpos: [{ name: "FPO 105", position: { lat: 27.73, lng: 88.62 } }],
      },
      {
        name: "SORENG",
        color: getRandomColor(),
        fpos: [{ name: "FPO 105", position: { lat: 27.73, lng: 88.62 } }],
      },
    ],
  },
  Tripura: {
    districts: [
      {
        name: "DHALAI",
        color: getRandomColor(),
        fpos: [{ name: "FPO 108", position: { lat: 23.82, lng: 91.97 } }],
      },
      {
        name: "GOMATI",
        color: getRandomColor(),
        fpos: [{ name: "FPO 109", position: { lat: 23.5, lng: 91.52 } }],
      },
      {
        name: "KHOWAI",
        color: getRandomColor(),
        fpos: [{ name: "FPO 110", position: { lat: 24.08, lng: 91.63 } }],
      },
      {
        name: "NORTH TRIPURA",
        color: getRandomColor(),
        fpos: [{ name: "FPO 111", position: { lat: 24.25, lng: 92.08 } }],
      },
      {
        name: "SIPAHIJALA",
        color: getRandomColor(),
        fpos: [{ name: "FPO 112", position: { lat: 23.75, lng: 91.38 } }],
      },
      {
        name: "SOUTH TRIPURA",
        color: getRandomColor(),
        fpos: [{ name: "FPO 113", position: { lat: 23.25, lng: 91.5 } }],
      },
      {
        name: "UNAKOTI",
        color: getRandomColor(),
        fpos: [{ name: "FPO 114", position: { lat: 24.3, lng: 92.1 } }],
      },
      {
        name: "WEST TRIPURA",
        color: getRandomColor(),
        fpos: [{ name: "FPO 115", position: { lat: 23.83, lng: 91.32 } }],
      },
    ],
  },
  "West Bengal": {
    districts: [
      {
        name: "ALIPURDUAR",
        color: getRandomColor(),
        fpos: [{ name: "FPO 116", position: { lat: 26.48, lng: 89.52 } }],
      },
      {
        name: "BANKURA",
        color: getRandomColor(),
        fpos: [{ name: "FPO 117", position: { lat: 23.25, lng: 87.07 } }],
      },
      {
        name: "BIRBHUM",
        color: getRandomColor(),
        fpos: [{ name: "FPO 118", position: { lat: 23.83, lng: 87.67 } }],
      },
      {
        name: "COOCH BEHAR",
        color: getRandomColor(),
        fpos: [{ name: "FPO 119", position: { lat: 26.32, lng: 89.45 } }],
      },
      {
        name: "DAKSHIN DINAJPUR",
        color: getRandomColor(),
        fpos: [{ name: "FPO 120", position: { lat: 25.43, lng: 88.77 } }],
      },
      {
        name: "DARJEELING",
        color: getRandomColor(),
        fpos: [{ name: "FPO 121", position: { lat: 27.03, lng: 88.26 } }],
      },
      {
        name: "HOOGHLY",
        color: getRandomColor(),
        fpos: [{ name: "FPO 122", position: { lat: 22.9, lng: 88.39 } }],
      },
      {
        name: "HOWRAH",
        color: getRandomColor(),
        fpos: [{ name: "FPO 123", position: { lat: 22.59, lng: 88.31 } }],
      },
      {
        name: "JALPAIGURI",
        color: getRandomColor(),
        fpos: [{ name: "FPO 124", position: { lat: 26.53, lng: 88.73 } }],
      },
      {
        name: "JHARGRAM",
        color: getRandomColor(),
        fpos: [{ name: "FPO 125", position: { lat: 22.45, lng: 86.98 } }],
      },
      {
        name: "KALIMPONG",
        color: getRandomColor(),
        fpos: [{ name: "FPO 126", position: { lat: 27.06, lng: 88.47 } }],
      },
      {
        name: "KOLKATA",
        color: getRandomColor(),
        fpos: [{ name: "FPO 127", position: { lat: 22.57, lng: 88.36 } }],
      },
      {
        name: "MALDA",
        color: getRandomColor(),
        fpos: [{ name: "FPO 128", position: { lat: 25.0, lng: 88.13 } }],
      },
      {
        name: "MURSHIDABAD",
        color: getRandomColor(),
        fpos: [{ name: "FPO 129", position: { lat: 24.18, lng: 88.25 } }],
      },
      {
        name: "NADIA",
        color: getRandomColor(),
        fpos: [{ name: "FPO 130", position: { lat: 23.48, lng: 88.5 } }],
      },
      {
        name: "NORTH 24 PARGANAS",
        color: getRandomColor(),
        fpos: [{ name: "FPO 131", position: { lat: 22.63, lng: 88.42 } }],
      },
      {
        name: "PASHIM BARDHAMAN",
        color: getRandomColor(),
        fpos: [{ name: "FPO 132", position: { lat: 23.79, lng: 87.4 } }],
      },
      {
        name: "PASCHIM MEDINIPUR",
        color: getRandomColor(),
        fpos: [{ name: "FPO 133", position: { lat: 22.43, lng: 87.32 } }],
      },
      {
        name: "PURBA BARDHAMAN",
        color: getRandomColor(),
        fpos: [{ name: "FPO 134", position: { lat: 23.25, lng: 87.85 } }],
      },
      {
        name: "PURBA MEDINIPUR",
        color: getRandomColor(),
        fpos: [{ name: "FPO 135", position: { lat: 21.9, lng: 87.78 } }],
      },
      {
        name: "PURULIA",
        color: getRandomColor(),
        fpos: [{ name: "FPO 136", position: { lat: 23.33, lng: 86.37 } }],
      },
      {
        name: "SOUTH 24 PARGANAS",
        color: getRandomColor(),
        fpos: [{ name: "FPO 137", position: { lat: 22.15, lng: 88.4 } }],
      },
      {
        name: "UTTAR DINAJPUR",
        color: getRandomColor(),
        fpos: [{ name: "FPO 138", position: { lat: 25.63, lng: 88.12 } }],
      },
    ],
  },
};
