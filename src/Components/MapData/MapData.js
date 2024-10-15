function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
let state = [{ name: "Assam", district: [{}, {}] }];
export const AllStateDist = {
  Assam: {
    districts: [
      {
        name: "Baksa",
        color: getRandomColor(),
        fpos: [{ name: "FPO 1", position: { lat: 26.7, lng: 91.25 } }],
      },
      {
        name: "Barpeta",
        color: getRandomColor(),
        fpos: [{ name: "FPO 2", position: { lat: 26.32, lng: 91.01 } }],
      },
      {
        name: "Biswanath",
        color: getRandomColor(),
        fpos: [{ name: "FPO 3", position: { lat: 26.75, lng: 93.15 } }],
      },
      {
        name: "Bongaigaon",
        color: getRandomColor(),
        fpos: [{ name: "FPO 4", position: { lat: 26.47, lng: 90.56 } }],
      },
      {
        name: "Cachar",
        color: getRandomColor(),
        fpos: [{ name: "FPO 5", position: { lat: 24.83, lng: 92.78 } }],
      },
      {
        name: "Charaideo",
        color: getRandomColor(),
        fpos: [{ name: "FPO 6", position: { lat: 27.02, lng: 95.02 } }],
      },
      {
        name: "Chirang",
        color: getRandomColor(),
        fpos: [{ name: "FPO 7", position: { lat: 26.5, lng: 90.52 } }],
      },
      {
        name: "Darrang",
        color: getRandomColor(),
        fpos: [{ name: "FPO 8", position: { lat: 26.45, lng: 92.03 } }],
      },
      {
        name: "Dhemaji",
        color: getRandomColor(),
        fpos: [{ name: "FPO 9", position: { lat: 27.48, lng: 94.58 } }],
      },
      {
        name: "Dhubri",
        color: getRandomColor(),
        fpos: [{ name: "FPO 10", position: { lat: 26.02, lng: 89.98 } }],
      },
      {
        name: "Dibrugarh",
        color: getRandomColor(),
        fpos: [{ name: "FPO 11", position: { lat: 27.48, lng: 94.91 } }],
      },
      {
        name: "Dima Hasao",
        color: getRandomColor(),
        fpos: [{ name: "FPO 12", position: { lat: 25.5, lng: 93.02 } }],
      },
      {
        name: "Goalpara",
        color: getRandomColor(),
        fpos: [{ name: "FPO 13", position: { lat: 26.17, lng: 90.62 } }],
      },
      {
        name: "Golaghat",
        color: getRandomColor(),
        fpos: [{ name: "FPO 14", position: { lat: 26.52, lng: 93.97 } }],
      },
      {
        name: "Hailakandi",
        color: getRandomColor(),
        fpos: [{ name: "FPO 15", position: { lat: 24.68, lng: 92.57 } }],
      },
      {
        name: "Hojai",
        color: getRandomColor(),
        fpos: [{ name: "FPO 16", position: { lat: 26.0, lng: 92.86 } }],
      },
      {
        name: "Jorhat",
        color: getRandomColor(),
        fpos: [{ name: "FPO 17", position: { lat: 26.75, lng: 94.22 } }],
      },
      {
        name: "Kamrup",
        color: getRandomColor(),
        fpos: [{ name: "FPO 18", position: { lat: 26.12, lng: 91.62 } }],
      },
      {
        name: "Kamrup Metropolitan",
        color: getRandomColor(),
        fpos: [{ name: "FPO 19", position: { lat: 26.15, lng: 91.77 } }],
      },
      {
        name: "Karbi Anglong",
        color: getRandomColor(),
        fpos: [{ name: "FPO 20", position: { lat: 26.0, lng: 93.52 } }],
      },
      {
        name: "Karimganj",
        color: getRandomColor(),
        fpos: [{ name: "FPO 21", position: { lat: 24.63, lng: 92.35 } }],
      },
      {
        name: "Kokrajhar",
        color: getRandomColor(),
        fpos: [{ name: "FPO 22", position: { lat: 26.4, lng: 90.27 } }],
      },
      {
        name: "Lakhimpur",
        color: getRandomColor(),
        fpos: [{ name: "FPO 23", position: { lat: 27.23, lng: 94.12 } }],
      },
      {
        name: "Majuli",
        color: getRandomColor(),
        fpos: [{ name: "FPO 24", position: { lat: 27.0, lng: 94.2 } }],
      },
      {
        name: "Morigaon",
        color: getRandomColor(),
        fpos: [{ name: "FPO 25", position: { lat: 26.25, lng: 92.35 } }],
      },
      {
        name: "Nagaon",
        color: getRandomColor(),
        fpos: [{ name: "FPO 26", position: { lat: 26.35, lng: 92.68 } }],
      },
      {
        name: "Nalbari",
        color: getRandomColor(),
        fpos: [{ name: "FPO 27", position: { lat: 26.45, lng: 91.43 } }],
      },
      {
        name: "Sivasagar",
        color: getRandomColor(),
        fpos: [{ name: "FPO 28", position: { lat: 26.98, lng: 94.64 } }],
      },
      {
        name: "Sonitpur",
        color: getRandomColor(),
        fpos: [{ name: "FPO 29", position: { lat: 26.72, lng: 92.85 } }],
      },
      {
        name: "South Salmara-Mankachar",
        color: getRandomColor(),
        fpos: [{ name: "FPO 30", position: { lat: 25.5, lng: 89.88 } }],
      },
      {
        name: "Tinsukia",
        color: getRandomColor(),
        fpos: [{ name: "FPO 31", position: { lat: 27.5, lng: 95.37 } }],
      },
      {
        name: "Udalguri",
        color: getRandomColor(),
        fpos: [{ name: "FPO 32", position: { lat: 26.72, lng: 92.1 } }],
      },
      {
        name: "West Karbi Anglong",
        color: getRandomColor(),
        fpos: [{ name: "FPO 33", position: { lat: 26.0, lng: 92.87 } }],
      },
    ],
  },
  "Arunachal Pradesh": {
    districts: [
      {
        name: "Tawang",
        color: getRandomColor(),
        fpos: [{ name: "FPO 34", position: { lat: 27.58, lng: 91.87 } }],
      },
      {
        name: "West Kameng",
        color: getRandomColor(),
        fpos: [{ name: "FPO 35", position: { lat: 27.27, lng: 92.4 } }],
      },
      {
        name: "East Kameng",
        color: getRandomColor(),
        fpos: [{ name: "FPO 36", position: { lat: 27.02, lng: 93.02 } }],
      },
      {
        name: "Papum Pare",
        color: getRandomColor(),
        fpos: [{ name: "FPO 37", position: { lat: 27.22, lng: 93.62 } }],
      },
      {
        name: "Kurung Kumey",
        color: getRandomColor(),
        fpos: [{ name: "FPO 38", position: { lat: 27.5, lng: 93.5 } }],
      },
      {
        name: "Kra Daadi",
        color: getRandomColor(),
        fpos: [{ name: "FPO 39", position: { lat: 27.33, lng: 93.4 } }],
      },
      {
        name: "Lower Subansiri",
        color: getRandomColor(),
        fpos: [{ name: "FPO 40", position: { lat: 27.63, lng: 93.92 } }],
      },
      {
        name: "Upper Subansiri",
        color: getRandomColor(),
        fpos: [{ name: "FPO 41", position: { lat: 27.83, lng: 94.22 } }],
      },
      {
        name: "West Siang",
        color: getRandomColor(),
        fpos: [{ name: "FPO 42", position: { lat: 28.33, lng: 94.62 } }],
      },
      {
        name: "East Siang",
        color: getRandomColor(),
        fpos: [{ name: "FPO 43", position: { lat: 28.07, lng: 95.33 } }],
      },
      {
        name: "Siang",
        color: getRandomColor(),
        fpos: [{ name: "FPO 44", position: { lat: 28.43, lng: 95.27 } }],
      },
      {
        name: "Upper Siang",
        color: getRandomColor(),
        fpos: [{ name: "FPO 45", position: { lat: 28.78, lng: 95.22 } }],
      },
      {
        name: "Lower Siang",
        color: getRandomColor(),
        fpos: [{ name: "FPO 46", position: { lat: 28.2, lng: 94.92 } }],
      },
      {
        name: "Lower Dibang Valley",
        color: getRandomColor(),
        fpos: [{ name: "FPO 47", position: { lat: 28.03, lng: 95.75 } }],
      },
      {
        name: "Dibang Valley",
        color: getRandomColor(),
        fpos: [{ name: "FPO 48", position: { lat: 28.92, lng: 95.93 } }],
      },
      {
        name: "Anjaw",
        color: getRandomColor(),
        fpos: [{ name: "FPO 49", position: { lat: 28.78, lng: 96.52 } }],
      },
      {
        name: "Lohit",
        color: getRandomColor(),
        fpos: [{ name: "FPO 50", position: { lat: 27.92, lng: 96.13 } }],
      },
      {
        name: "Namsai",
        color: getRandomColor(),
        fpos: [{ name: "FPO 51", position: { lat: 27.68, lng: 95.92 } }],
      },
      {
        name: "Changlang",
        color: getRandomColor(),
        fpos: [{ name: "FPO 52", position: { lat: 27.33, lng: 96.12 } }],
      },
      {
        name: "Tirap",
        color: getRandomColor(),
        fpos: [{ name: "FPO 53", position: { lat: 27.02, lng: 95.55 } }],
      },
      {
        name: "Longding",
        color: getRandomColor(),
        fpos: [{ name: "FPO 54", position: { lat: 27.0, lng: 95.32 } }],
      },
    ],
  },
  Manipur: {
    districts: [
      {
        name: "Bishnupur",
        color: getRandomColor(),
        fpos: [{ name: "FPO 55", position: { lat: 24.6, lng: 93.78 } }],
      },
      {
        name: "Chandel",
        color: getRandomColor(),
        fpos: [{ name: "FPO 56", position: { lat: 24.33, lng: 94.02 } }],
      },
      {
        name: "Churachandpur",
        color: getRandomColor(),
        fpos: [{ name: "FPO 57", position: { lat: 24.33, lng: 93.68 } }],
      },
      {
        name: "Imphal East",
        color: getRandomColor(),
        fpos: [{ name: "FPO 58", position: { lat: 24.8, lng: 93.95 } }],
      },
      {
        name: "Imphal West",
        color: getRandomColor(),
        fpos: [{ name: "FPO 59", position: { lat: 24.8, lng: 93.88 } }],
      },
      {
        name: "Kakching",
        color: getRandomColor(),
        fpos: [{ name: "FPO 60", position: { lat: 24.67, lng: 93.13 } }],
      },
      {
        name: "Senapati",
        color: getRandomColor(),
        fpos: [{ name: "FPO 61", position: { lat: 24.48, lng: 93.98 } }],
      },
      {
        name: "Tamenlong",
        color: getRandomColor(),
        fpos: [{ name: "FPO 62", position: { lat: 24.87, lng: 94.47 } }],
      },
      {
        name: "Tengnoupal",
        color: getRandomColor(),
        fpos: [{ name: "FPO 63", position: { lat: 25.03, lng: 93.5 } }],
      },
      {
        name: "Thoubal",
        color: getRandomColor(),
        fpos: [{ name: "FPO 64", position: { lat: 24.85, lng: 93.48 } }],
      },
    ],
  },
  Meghalaya: {
    districts: [
      {
        name: "East Garo Hills",
        color: getRandomColor(),
        fpos: [{ name: "FPO 71", position: { lat: 25.53, lng: 90.63 } }],
      },
      {
        name: "East Jaintia Hills",
        color: getRandomColor(),
        fpos: [{ name: "FPO 71", position: { lat: 25.53, lng: 90.63 } }],
      },
      {
        name: "East Khasi Hills",
        color: getRandomColor(),
        fpos: [{ name: "FPO 71", position: { lat: 25.53, lng: 90.63 } }],
      },
      {
        name: "Eastern West Khasi Hills",
        color: getRandomColor(),
        fpos: [{ name: "FPO 71", position: { lat: 25.53, lng: 90.63 } }],
      },
      {
        name: "North Garo Hills",
        color: getRandomColor(),
        fpos: [{ name: "FPO 72", position: { lat: 25.37, lng: 92.6 } }],
      },
      {
        name: "Ri Bhoi",
        color: getRandomColor(),
        fpos: [{ name: "FPO 105", position: { lat: 27.73, lng: 88.62 } }],
      },
      {
        name: "South Garo Hills",
        color: getRandomColor(),
        fpos: [{ name: "FPO 105", position: { lat: 27.73, lng: 88.62 } }],
      },
      {
        name: "West Khasi Hills",
        color: getRandomColor(),
        fpos: [{ name: "FPO 73", position: { lat: 25.57, lng: 91.88 } }],
      },
    ],
  },
  Mizoram: {
    districts: [
      {
        name: "Aizawl",
        color: getRandomColor(),
        fpos: [{ name: "FPO 82", position: { lat: 23.73, lng: 92.72 } }],
      },
      {
        name: "Champhai",
        color: getRandomColor(),
        fpos: [{ name: "FPO 83", position: { lat: 23.45, lng: 93.33 } }],
      },
      {
        name: "Kolasib",
        color: getRandomColor(),
        fpos: [{ name: "FPO 84", position: { lat: 24.23, lng: 92.68 } }],
      },
      {
        name: "Lawngtlai",
        color: getRandomColor(),
        fpos: [{ name: "FPO 85", position: { lat: 22.53, lng: 92.83 } }],
      },
      {
        name: "Lunglei",
        color: getRandomColor(),
        fpos: [{ name: "FPO 86", position: { lat: 22.88, lng: 92.73 } }],
      },
      {
        name: "Mamit",
        color: getRandomColor(),
        fpos: [{ name: "FPO 87", position: { lat: 23.92, lng: 92.48 } }],
      },
      {
        name: "Saiha",
        color: getRandomColor(),
        fpos: [{ name: "FPO 88", position: { lat: 22.48, lng: 92.97 } }],
      },
      {
        name: "Serchhip",
        color: getRandomColor(),
        fpos: [{ name: "FPO 89", position: { lat: 23.3, lng: 92.83 } }],
      },
      {
        name: "Saitual",
        color: getRandomColor(),
        fpos: [{ name: "FPO 90", position: { lat: 23.5, lng: 92.92 } }],
      },
      {
        name: "Khawzawl",
        color: getRandomColor(),
        fpos: [{ name: "FPO 91", position: { lat: 23.62, lng: 93.02 } }],
      },
      {
        name: "Hnahthial",
        color: getRandomColor(),
        fpos: [{ name: "FPO 92", position: { lat: 23.03, lng: 92.83 } }],
      },
    ],
  },
  Nagaland: {
    districts: [
      {
        name: "Chumoukedima",
        color: getRandomColor(),
        fpos: [{ name: "FPO 93", position: { lat: 25.9, lng: 93.73 } }],
      },
      {
        name: "KIPHIRE",
        color: getRandomColor(),
        fpos: [{ name: "FPO 94", position: { lat: 25.88, lng: 94.83 } }],
      },
      {
        name: "Kohima",
        color: getRandomColor(),
        fpos: [{ name: "FPO 95", position: { lat: 25.67, lng: 94.12 } }],
      },
      {
        name: "Mokokchung",
        color: getRandomColor(),
        fpos: [{ name: "FPO 96", position: { lat: 26.5, lng: 94.8 } }],
      },
      {
        name: "Mon",
        color: getRandomColor(),
        fpos: [{ name: "FPO 97", position: { lat: 26.33, lng: 94.53 } }],
      },
      {
        name: "Noklak",
        color: getRandomColor(),
        fpos: [{ name: "FPO 98", position: { lat: 26.75, lng: 95.0 } }],
      },
      {
        name: "Phek",
        color: getRandomColor(),
        fpos: [{ name: "FPO 99", position: { lat: 25.52, lng: 93.72 } }],
      },
      {
        name: "Shamator",
        color: getRandomColor(),
        fpos: [{ name: "FPO 100", position: { lat: 25.62, lng: 94.5 } }],
      },
      {
        name: "Tuensang",
        color: getRandomColor(),
        fpos: [{ name: "FPO 101", position: { lat: 26.28, lng: 94.83 } }],
      },
      {
        name: "Wokha",
        color: getRandomColor(),
        fpos: [{ name: "FPO 102", position: { lat: 26.1, lng: 94.27 } }],
      },
      {
        name: "Zunheboto",
        color: getRandomColor(),
        fpos: [{ name: "FPO 103", position: { lat: 26.0, lng: 94.52 } }],
      },
    ],
  },
  Sikkim: {
    districts: [
      {
        name: "Gangtok",
        color: getRandomColor(),
        fpos: [{ name: "FPO 104", position: { lat: 27.33, lng: 88.62 } }],
      },
      {
        name: "Mangan",
        color: getRandomColor(),
        fpos: [{ name: "FPO 105", position: { lat: 27.73, lng: 88.62 } }],
      },
      {
        name: "Namchi",
        color: getRandomColor(),
        fpos: [{ name: "FPO 105", position: { lat: 27.73, lng: 88.62 } }],
      },
      {
        name: "Gyalshing",
        color: getRandomColor(),
        fpos: [{ name: "FPO 105", position: { lat: 27.73, lng: 88.62 } }],
      },
      {
        name: "Pakyong",
        color: getRandomColor(),
        fpos: [{ name: "FPO 105", position: { lat: 27.73, lng: 88.62 } }],
      },
      {
        name: "Soreng",
        color: getRandomColor(),
        fpos: [{ name: "FPO 105", position: { lat: 27.73, lng: 88.62 } }],
      },
    ],
  },
  Tripura: {
    districts: [
      {
        name: "Dhalai",
        color: getRandomColor(),
        fpos: [{ name: "FPO 108", position: { lat: 23.82, lng: 91.97 } }],
      },
      {
        name: "Gomati",
        color: getRandomColor(),
        fpos: [{ name: "FPO 109", position: { lat: 23.5, lng: 91.52 } }],
      },
      {
        name: "Khowai",
        color: getRandomColor(),
        fpos: [{ name: "FPO 110", position: { lat: 24.08, lng: 91.63 } }],
      },
      {
        name: "North Tripura",
        color: getRandomColor(),
        fpos: [{ name: "FPO 111", position: { lat: 24.25, lng: 92.08 } }],
      },
      {
        name: "Sepahijala",
        color: getRandomColor(),
        fpos: [{ name: "FPO 112", position: { lat: 23.75, lng: 91.38 } }],
      },
      {
        name: "South Tripura",
        color: getRandomColor(),
        fpos: [{ name: "FPO 113", position: { lat: 23.25, lng: 91.5 } }],
      },
      {
        name: "Unakoti",
        color: getRandomColor(),
        fpos: [{ name: "FPO 114", position: { lat: 24.3, lng: 92.1 } }],
      },
      {
        name: "West Tripura",
        color: getRandomColor(),
        fpos: [{ name: "FPO 115", position: { lat: 23.83, lng: 91.32 } }],
      },
    ],
  },
  "West Bengal": {
    districts: [
      {
        name: "Alipurduar",
        color: getRandomColor(),
        fpos: [{ name: "FPO 116", position: { lat: 26.48, lng: 89.52 } }],
      },
      {
        name: "Bankura",
        color: getRandomColor(),
        fpos: [{ name: "FPO 117", position: { lat: 23.25, lng: 87.07 } }],
      },
      {
        name: "Birbhum",
        color: getRandomColor(),
        fpos: [{ name: "FPO 118", position: { lat: 23.83, lng: 87.67 } }],
      },
      {
        name: "Cooch Behar",
        color: getRandomColor(),
        fpos: [{ name: "FPO 119", position: { lat: 26.32, lng: 89.45 } }],
      },
      {
        name: "Dakshin Dinajpur",
        color: getRandomColor(),
        fpos: [{ name: "FPO 120", position: { lat: 25.43, lng: 88.77 } }],
      },
      {
        name: "Darjeeling",
        color: getRandomColor(),
        fpos: [{ name: "FPO 121", position: { lat: 27.03, lng: 88.26 } }],
      },
      {
        name: "Hooghly",
        color: getRandomColor(),
        fpos: [{ name: "FPO 122", position: { lat: 22.9, lng: 88.39 } }],
      },
      {
        name: "Howrah",
        color: getRandomColor(),
        fpos: [{ name: "FPO 123", position: { lat: 22.59, lng: 88.31 } }],
      },
      {
        name: "Jalpaiguri",
        color: getRandomColor(),
        fpos: [{ name: "FPO 124", position: { lat: 26.53, lng: 88.73 } }],
      },
      {
        name: "Jhargram",
        color: getRandomColor(),
        fpos: [{ name: "FPO 125", position: { lat: 22.45, lng: 86.98 } }],
      },
      {
        name: "Kalimpong",
        color: getRandomColor(),
        fpos: [{ name: "FPO 126", position: { lat: 27.06, lng: 88.47 } }],
      },
      {
        name: "Kolkata",
        color: getRandomColor(),
        fpos: [{ name: "FPO 127", position: { lat: 22.57, lng: 88.36 } }],
      },
      {
        name: "Malda",
        color: getRandomColor(),
        fpos: [{ name: "FPO 128", position: { lat: 25.0, lng: 88.13 } }],
      },
      {
        name: "Murshidabad",
        color: getRandomColor(),
        fpos: [{ name: "FPO 129", position: { lat: 24.18, lng: 88.25 } }],
      },
      {
        name: "Nadia",
        color: getRandomColor(),
        fpos: [{ name: "FPO 130", position: { lat: 23.48, lng: 88.5 } }],
      },
      {
        name: "North 24 Parganas",
        color: getRandomColor(),
        fpos: [{ name: "FPO 131", position: { lat: 22.63, lng: 88.42 } }],
      },
      {
        name: "Paschim Bardhaman",
        color: getRandomColor(),
        fpos: [{ name: "FPO 132", position: { lat: 23.79, lng: 87.4 } }],
      },
      {
        name: "Paschim Medinipur",
        color: getRandomColor(),
        fpos: [{ name: "FPO 133", position: { lat: 22.43, lng: 87.32 } }],
      },
      {
        name: "Purba Bardhaman",
        color: getRandomColor(),
        fpos: [{ name: "FPO 134", position: { lat: 23.25, lng: 87.85 } }],
      },
      {
        name: "Purba Medinipur",
        color: getRandomColor(),
        fpos: [{ name: "FPO 135", position: { lat: 21.9, lng: 87.78 } }],
      },
      {
        name: "Purulia",
        color: getRandomColor(),
        fpos: [{ name: "FPO 136", position: { lat: 23.33, lng: 86.37 } }],
      },
      {
        name: "South 24 Parganas",
        color: getRandomColor(),
        fpos: [{ name: "FPO 137", position: { lat: 22.15, lng: 88.4 } }],
      },
      {
        name: "Uttar Dinajpur",
        color: getRandomColor(),
        fpos: [{ name: "FPO 138", position: { lat: 25.63, lng: 88.12 } }],
      },
    ],
  },
};
