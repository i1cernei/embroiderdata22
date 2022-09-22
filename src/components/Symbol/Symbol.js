import React, { Component } from "react";
import Papa from 'papaparse';
import WorkCanvas from "../canvas/WorkCanvas";
import RelationshipCanvas from "../canvas/RelationshipCanvas";
import LivingCanvas from "../canvas/LivingCanvas";
import HomeCanvas from "../canvas/HomeCanvas";
import PartnerCanvas from "../canvas/PartnerCanvas";
import { SocketContext } from '../../context/socket';

class Symbol extends Component {
  static contextType = SocketContext;
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      questionValues: [],
      currentQuestion: 0,
      countries: [],
      origin: '',
      residence: '',
      cultures: '',
      sections: [],
      currentSection: 0,
      svg: '',
      rotate: false,
    };

    this.initialState = {
      "data": [],
      "questionValues": [
          {
              "country": "Azerbaijan",
              "population": "9651000",
              "perc_continent_pop": "1.13",
              "minority_percent": "8.4",
              "minorities": "5",
              "cultural_group": "caucasus",
              "gdp": "73537"
          },
          {
              "country": "Austria",
              "population": "8608000",
              "perc_continent_pop": "1.01",
              "minority_percent": "8.9",
              "minorities": "7",
              "cultural_group": "central",
              "gdp": "437123"
          }
      ],
      "currentQuestion": 4,
      "countries": [
          {
              "country": "Åland Islands (Finland)",
              "population": "29000",
              "perc_continent_pop": "0.00",
              "minority_percent": "6.6",
              "minorities": "5",
              "cultural_group": "northern",
              "gdp": "271175"
          },
          {
              "country": "Albania",
              "population": "2887000",
              "perc_continent_pop": "0.34",
              "minority_percent": "5",
              "minorities": "6",
              "cultural_group": "southeastern",
              "gdp": "12724"
          },
          {
              "country": "Andorra",
              "population": "78000",
              "perc_continent_pop": "0.01",
              "minority_percent": "51",
              "minorities": "4",
              "cultural_group": "southern",
              "gdp": "4800"
          },
          {
              "country": "Antigua and Barbuda",
              "population": "91800",
              "perc_continent_pop": "0.02",
              "minority_percent": "9",
              "minorities": "4",
              "cultural_group": "creole",
              "gdp": "2060"
          },
          {
              "country": "Argentina",
              "population": "43132000",
              "perc_continent_pop": "6.98",
              "minority_percent": "4.18704674",
              "minorities": "14",
              "cultural_group": "iberoamerican",
              "gdp": "953029"
          },
          {
              "country": "Armenia",
              "population": "3010000",
              "perc_continent_pop": "0.35",
              "minority_percent": "2",
              "minorities": "2",
              "cultural_group": "caucasus",
              "gdp": "10431"
          },
          {
              "country": "Austria",
              "population": "8608000",
              "perc_continent_pop": "1.01",
              "minority_percent": "8.9",
              "minorities": "7",
              "cultural_group": "central",
              "gdp": "437123"
          },
          {
              "country": "Azerbaijan",
              "population": "9651000",
              "perc_continent_pop": "1.13",
              "minority_percent": "8.4",
              "minorities": "5",
              "cultural_group": "caucasus",
              "gdp": "73537"
          },
          {
              "country": "Belarus",
              "population": "9487000",
              "perc_continent_pop": "1.11",
              "minority_percent": "19.8",
              "minorities": "4",
              "cultural_group": "eastern",
              "gdp": "71710"
          },
          {
              "country": "Belgium",
              "population": "11264000",
              "perc_continent_pop": "1.32",
              "minority_percent": "42",
              "minorities": "2",
              "cultural_group": "western",
              "gdp": "534672"
          },
          {
              "country": "Bolivia",
              "population": "10520000",
              "perc_continent_pop": "1.70",
              "minority_percent": "65.74840304",
              "minorities": "14",
              "cultural_group": "indoamerican",
              "gdp": "74836"
          },
          {
              "country": "Bosnia and Herzegovina",
              "population": "3750000",
              "perc_continent_pop": "0.44",
              "minority_percent": "52",
              "minorities": "3",
              "cultural_group": "southeastern",
              "gdp": "17828"
          },
          {
              "country": "Brazil",
              "population": "204519000",
              "perc_continent_pop": "33.07",
              "minority_percent": "33.1",
              "minorities": "12",
              "cultural_group": "mestizo",
              "gdp": "3259000"
          },
          {
              "country": "Bulgaria",
              "population": "7185000",
              "perc_continent_pop": "0.84",
              "minority_percent": "16",
              "minorities": "5",
              "cultural_group": "southeastern",
              "gdp": "53046"
          },
          {
              "country": "Canada",
              "population": "33476688",
              "perc_continent_pop": "9.47",
              "minority_percent": "27.2",
              "minorities": "11",
              "cultural_group": "western",
              "gdp": "1552386"
          },
          {
              "country": "Chile",
              "population": "18006000",
              "perc_continent_pop": "2.91",
              "minority_percent": "9.6",
              "minorities": "14",
              "cultural_group": "mestizo",
              "gdp": "431802"
          },
          {
              "country": "Colombia",
              "population": "48218000",
              "perc_continent_pop": "11.07",
              "minority_percent": "14",
              "minorities": "13",
              "cultural_group": "iberoamerican",
              "gdp": "682977"
          },
          {
              "country": "Costa Rica",
              "population": "4851000",
              "perc_continent_pop": "0.78",
              "minority_percent": "9.03",
              "minorities": "14",
              "cultural_group": "mestizo",
              "gdp": "75138"
          },
          {
              "country": "Croatia",
              "population": "4230000",
              "perc_continent_pop": "0.50",
              "minority_percent": "10",
              "minorities": "6",
              "cultural_group": "central",
              "gdp": "57371"
          },
          {
              "country": "Cuba",
              "population": "11252000",
              "perc_continent_pop": "1.82",
              "minority_percent": "26",
              "minorities": "10",
              "cultural_group": "iberoamerican",
              "gdp": "121000"
          },
          {
              "country": "Cyprus",
              "population": "876000",
              "perc_continent_pop": "0.10",
              "minority_percent": "50",
              "minorities": "2",
              "cultural_group": "southeastern",
              "gdp": "21919"
          },
          {
              "country": "Czech Republic",
              "population": "10535000",
              "perc_continent_pop": "1.24",
              "minority_percent": "9.6",
              "minorities": "4",
              "cultural_group": "central",
              "gdp": "205658"
          },
          {
              "country": "Denmark",
              "population": "5673000",
              "perc_continent_pop": "0.67",
              "minority_percent": "10",
              "minorities": "6",
              "cultural_group": "northern",
              "gdp": "340806"
          },
          {
              "country": "Dominican Republic",
              "population": "9980000",
              "perc_continent_pop": "1.61",
              "minority_percent": "37",
              "minorities": "14",
              "cultural_group": "mestizo",
              "gdp": "144052"
          },
          {
              "country": "Ecuador",
              "population": "16279000",
              "perc_continent_pop": "2.63",
              "minority_percent": "29",
              "minorities": "7",
              "cultural_group": "southern",
              "gdp": "192728"
          },
          {
              "country": "El Salvador",
              "population": "6460000",
              "perc_continent_pop": "1.04",
              "minority_percent": "13.33",
              "minorities": "14",
              "cultural_group": "creole",
              "gdp": "52776"
          },
          {
              "country": "Estonia",
              "population": "1315000",
              "perc_continent_pop": "0.15",
              "minority_percent": "32",
              "minorities": "5",
              "cultural_group": "baltic",
              "gdp": "24888"
          },
          {
              "country": "Faroe Islands (Denmark)",
              "population": "49000",
              "perc_continent_pop": "0.01",
              "minority_percent": "10",
              "minorities": "0",
              "cultural_group": "northern",
              "gdp": "205658"
          },
          {
              "country": "Finland",
              "population": "5476000",
              "perc_continent_pop": "0.64",
              "minority_percent": "6.6",
              "minorities": "5",
              "cultural_group": "northern",
              "gdp": "271165"
          },
          {
              "country": "France",
              "population": "64319000",
              "perc_continent_pop": "7.54",
              "minority_percent": "16",
              "minorities": "4",
              "cultural_group": "western",
              "gdp": "2846889"
          },
          {
              "country": "French Guiana",
              "population": "262000",
              "perc_continent_pop": "0.04",
              "minority_percent": "43.5",
              "minorities": "10",
              "cultural_group": "western",
              "gdp": "5814"
          },
          {
              "country": "Georgia",
              "population": "4506000",
              "perc_continent_pop": "0.53",
              "minority_percent": "16",
              "minorities": "4",
              "cultural_group": "caucasus",
              "gdp": "16162"
          },
          {
              "country": "Germany",
              "population": "81340000",
              "perc_continent_pop": "9.54",
              "minority_percent": "19",
              "minorities": "7",
              "cultural_group": "central",
              "gdp": "3859547"
          },
          {
              "country": "Gibraltar (UK)",
              "population": "34000",
              "perc_continent_pop": "0.00",
              "minority_percent": "15",
              "minorities": "7",
              "cultural_group": "western",
              "gdp": "1106"
          },
          {
              "country": "Greece",
              "population": "10769000",
              "perc_continent_pop": "1.26",
              "minority_percent": "7",
              "minorities": "8",
              "cultural_group": "southeastern",
              "gdp": "238023"
          },
          {
              "country": "Guadeloupe (France)",
              "population": "405000",
              "perc_continent_pop": "0.07",
              "minority_percent": "25",
              "minorities": "4",
              "cultural_group": "western",
              "gdp": "9740"
          },
          {
              "country": "Guatemala",
              "population": "16176000",
              "perc_continent_pop": "2.62",
              "minority_percent": "48.5",
              "minorities": "15",
              "cultural_group": "indoamerican",
              "gdp": "125318"
          },
          {
              "country": "Guernsey (UK)",
              "population": "64000",
              "perc_continent_pop": "0.01",
              "minority_percent": "15",
              "minorities": "2",
              "cultural_group": "western",
              "gdp": "2742"
          },
          {
              "country": "Haiti",
              "population": "10994000",
              "perc_continent_pop": "1.78",
              "minority_percent": "10",
              "minorities": "6",
              "cultural_group": "creole",
              "gdp": "19576"
          },
          {
              "country": "Honduras",
              "population": "8950000",
              "perc_continent_pop": "1.45",
              "minority_percent": "8",
              "minorities": "7",
              "cultural_group": "creole",
              "gdp": "40895"
          },
          {
              "country": "Hungary",
              "population": "9835000",
              "perc_continent_pop": "1.15",
              "minority_percent": "7.7",
              "minorities": "2",
              "cultural_group": "central",
              "gdp": "132260"
          },
          {
              "country": "Iceland",
              "population": "331000",
              "perc_continent_pop": "0.04",
              "minority_percent": "6",
              "minorities": "3",
              "cultural_group": "northern",
              "gdp": "14656"
          },
          {
              "country": "Ireland",
              "population": "4630000",
              "perc_continent_pop": "0.54",
              "minority_percent": "12.6",
              "minorities": "4",
              "cultural_group": "western",
              "gdp": "246438"
          },
          {
              "country": "Isle of Man (UK)",
              "population": "89000",
              "perc_continent_pop": "0.01",
              "minority_percent": "15",
              "minorities": "2",
              "cultural_group": "western",
              "gdp": "4076"
          },
          {
              "country": "Italy",
              "population": "60963000",
              "perc_continent_pop": "7.15",
              "minority_percent": "8.3",
              "minorities": "5",
              "cultural_group": "southern",
              "gdp": "2147952"
          },
          {
              "country": "Jersey (UK)",
              "population": "103000",
              "perc_continent_pop": "0.01",
              "minority_percent": "15",
              "minorities": "7",
              "cultural_group": "western",
              "gdp": "5100"
          },
          {
              "country": "Kazakhstan",
              "population": "17543000",
              "perc_continent_pop": "2.06",
              "minority_percent": "36.9",
              "minorities": "7",
              "cultural_group": "eastern",
              "gdp": "212260"
          },
          {
              "country": "Kosovo",
              "population": "1867000",
              "perc_continent_pop": "0.22",
              "minority_percent": "8",
              "minorities": "8",
              "cultural_group": "southeastern",
              "gdp": "6827"
          },
          {
              "country": "Latvia",
              "population": "1980000",
              "perc_continent_pop": "0.23",
              "minority_percent": "37.9",
              "minorities": "6",
              "cultural_group": "baltic",
              "gdp": "30953"
          },
          {
              "country": "Liechtenstein",
              "population": "37000",
              "perc_continent_pop": "0.00",
              "minority_percent": "34.4",
              "minorities": "4",
              "cultural_group": "central",
              "gdp": "5113"
          },
          {
              "country": "Lithuania",
              "population": "2909000",
              "perc_continent_pop": "0.34",
              "minority_percent": "16.5",
              "minorities": "4",
              "cultural_group": "baltic",
              "gdp": "46507"
          },
          {
              "country": "Luxembourg",
              "population": "570000",
              "perc_continent_pop": "0.07",
              "minority_percent": "43",
              "minorities": "7",
              "cultural_group": "central",
              "gdp": "60402"
          },
          {
              "country": "Macedonia",
              "population": "2072000",
              "perc_continent_pop": "0.24",
              "minority_percent": "36",
              "minorities": "5",
              "cultural_group": "southeastern",
              "gdp": "10238"
          },
          {
              "country": "Malta",
              "population": "425000",
              "perc_continent_pop": "0.05",
              "minority_percent": "4.7",
              "minorities": "2",
              "cultural_group": "southern",
              "gdp": "9545"
          },
          {
              "country": "Martinique (France)",
              "population": "383000",
              "perc_continent_pop": "0.06",
              "minority_percent": "10",
              "minorities": "8",
              "cultural_group": "western",
              "gdp": "9610"
          },
          {
              "country": "Mexico",
              "population": "121006000",
              "perc_continent_pop": "19.57",
              "minority_percent": "20",
              "minorities": "9",
              "cultural_group": "mestizo",
              "gdp": "2224000"
          },
          {
              "country": "Moldova",
              "population": "4083000",
              "perc_continent_pop": "0.48",
              "minority_percent": "24",
              "minorities": "5",
              "cultural_group": "southeastern",
              "gdp": "7935"
          },
          {
              "country": "Monaco",
              "population": "37000",
              "perc_continent_pop": "0.00",
              "minority_percent": "53",
              "minorities": "3",
              "cultural_group": "western",
              "gdp": "5748"
          },
          {
              "country": "Montenegro",
              "population": "620000",
              "perc_continent_pop": "0.07",
              "minority_percent": "55.02",
              "minorities": "7",
              "cultural_group": "southeastern",
              "gdp": "4377"
          },
          {
              "country": "Netherlands",
              "population": "16933000",
              "perc_continent_pop": "1.99",
              "minority_percent": "19.3",
              "minorities": "8",
              "cultural_group": "western",
              "gdp": "866354"
          },
          {
              "country": "Nicaragua",
              "population": "6514000",
              "perc_continent_pop": "1.05",
              "minority_percent": "17",
              "minorities": "7",
              "cultural_group": "mestizo",
              "gdp": "31618"
          },
          {
              "country": "Norway",
              "population": "5194000",
              "perc_continent_pop": "0.61",
              "minority_percent": "15",
              "minorities": "3",
              "cultural_group": "northern",
              "gdp": "500244"
          },
          {
              "country": "Panama",
              "population": "3764000",
              "perc_continent_pop": "0.61",
              "minority_percent": "22",
              "minorities": "7",
              "cultural_group": "mestizo",
              "gdp": "83421"
          },
          {
              "country": "Paraguay",
              "population": "7003000",
              "perc_continent_pop": "1.13",
              "minority_percent": "8",
              "minorities": "12",
              "cultural_group": "mestizo",
              "gdp": "61587"
          },
          {
              "country": "Peru",
              "population": "31153000",
              "perc_continent_pop": "5.04",
              "minority_percent": "30",
              "minorities": "12",
              "cultural_group": "indoamerican",
              "gdp": "550226"
          },
          {
              "country": "Poland",
              "population": "38494000",
              "perc_continent_pop": "4.51",
              "minority_percent": "3",
              "minorities": "4",
              "cultural_group": "central",
              "gdp": "546644"
          },
          {
              "country": "Portugal",
              "population": "10311000",
              "perc_continent_pop": "1.21",
              "minority_percent": "5",
              "minorities": "2",
              "cultural_group": "southern",
              "gdp": "230012"
          },
          {
              "country": "Puerto Rico",
              "population": "3508000",
              "perc_continent_pop": "0.57",
              "minority_percent": "10",
              "minorities": "2",
              "cultural_group": "western",
              "gdp": "101500"
          },
          {
              "country": "Romania",
              "population": "19822000",
              "perc_continent_pop": "2.32",
              "minority_percent": "10.5",
              "minorities": "5",
              "cultural_group": "southeastern",
              "gdp": "199950"
          },
          {
              "country": "Russia",
              "population": "144031000",
              "perc_continent_pop": "16.88",
              "minority_percent": "20",
              "minorities": "6",
              "cultural_group": "eastern",
              "gdp": "1857461"
          },
          {
              "country": "Saint Barthélemy (France)",
              "population": "10000",
              "perc_continent_pop": "0.00",
              "minority_percent": "6",
              "minorities": "3",
              "cultural_group": "western",
              "gdp": "255"
          },
          {
              "country": "Saint Kitts and Nevis",
              "population": "53000",
              "perc_continent_pop": "0.01",
              "minority_percent": "16.6",
              "minorities": "3",
              "cultural_group": "western",
              "gdp": "1227"
          },
          {
              "country": "Saint Lucia",
              "population": "183600",
              "perc_continent_pop": "0.03",
              "minority_percent": "5",
              "minorities": "2",
              "cultural_group": "southern",
              "gdp": "2109"
          },
          {
              "country": "Saint Martin (France)",
              "population": "36000",
              "perc_continent_pop": "0.01",
              "minority_percent": "49",
              "minorities": "2",
              "cultural_group": "western",
              "gdp": "73056"
          },
          {
              "country": "Saint Vincent and the Grenadines",
              "population": "109903",
              "perc_continent_pop": "0.02",
              "minority_percent": "13",
              "minorities": "3",
              "cultural_group": "southern",
              "gdp": "1252"
          },
          {
              "country": "San Marino",
              "population": "33000",
              "perc_continent_pop": "0.00",
              "minority_percent": "0",
              "minorities": "1",
              "cultural_group": "southern",
              "gdp": "1802"
          },
          {
              "country": "Serbia",
              "population": "7103000",
              "perc_continent_pop": "0.83",
              "minority_percent": "17",
              "minorities": "4",
              "cultural_group": "southeastern",
              "gdp": "42492"
          },
          {
              "country": "Slovakia",
              "population": "5426000",
              "perc_continent_pop": "0.64",
              "minority_percent": "14",
              "minorities": "3",
              "cultural_group": "central",
              "gdp": "95805"
          },
          {
              "country": "Slovenia",
              "population": "2065000",
              "perc_continent_pop": "0.24",
              "minority_percent": "16.9",
              "minorities": "4",
              "cultural_group": "central",
              "gdp": "48005"
          },
          {
              "country": "Spain",
              "population": "46335000",
              "perc_continent_pop": "5.43",
              "minority_percent": "11",
              "minorities": "8",
              "cultural_group": "southern",
              "gdp": "1406855"
          },
          {
              "country": "Suriname",
              "population": "573311",
              "perc_continent_pop": "0.09",
              "minority_percent": "47",
              "minorities": "12",
              "cultural_group": "creole",
              "gdp": "9766"
          },
          {
              "country": "Svalbard and Jan Mayen(Norway)",
              "population": "3000",
              "perc_continent_pop": "0.00",
              "minority_percent": "44.7",
              "minorities": "3",
              "cultural_group": "northern",
              "gdp": "500244"
          },
          {
              "country": "Sweden",
              "population": "9795000",
              "perc_continent_pop": "1.15",
              "minority_percent": "12",
              "minorities": "7",
              "cultural_group": "northern",
              "gdp": "570137"
          },
          {
              "country": "Switzerland",
              "population": "8265000",
              "perc_continent_pop": "0.97",
              "minority_percent": "21",
              "minorities": "4",
              "cultural_group": "central",
              "gdp": "712050"
          },
          {
              "country": "The Bahamas",
              "population": "9394",
              "perc_continent_pop": "0.00",
              "minority_percent": "5",
              "minorities": "4",
              "cultural_group": "creole",
              "gdp": "9394"
          },
          {
              "country": "Trinidad and Tobago",
              "population": "43914",
              "perc_continent_pop": "0.01",
              "minority_percent": "80",
              "minorities": "5",
              "cultural_group": "creole",
              "gdp": "43914"
          },
          {
              "country": "Turkey",
              "population": "78214000",
              "perc_continent_pop": "9.17",
              "minority_percent": "25",
              "minorities": "3",
              "cultural_group": "caucasus",
              "gdp": "806108"
          },
          {
              "country": "Ukraine",
              "population": "42858000",
              "perc_continent_pop": "5.02",
              "minority_percent": "22.2",
              "minorities": "10",
              "cultural_group": "eastern",
              "gdp": "178313"
          },
          {
              "country": "United Kingdom",
              "population": "64915000",
              "perc_continent_pop": "7.61",
              "minority_percent": "15",
              "minorities": "5",
              "cultural_group": "western",
              "gdp": "2945146"
          },
          {
              "country": "United States of America",
              "population": "318860000",
              "perc_continent_pop": "90.24",
              "minority_percent": "79",
              "minorities": "4",
              "cultural_group": "western",
              "gdp": "17947000"
          },
          {
              "country": "Uruguay",
              "population": "3310000",
              "perc_continent_pop": "0.54",
              "minority_percent": "80",
              "minorities": "7",
              "cultural_group": "southern",
              "gdp": "73056"
          },
          {
              "country": "Vatican City",
              "population": "800",
              "perc_continent_pop": "0.00",
              "minority_percent": "0",
              "minorities": "0",
              "cultural_group": "southern",
              "gdp": "0"
          },
          {
              "country": "Venezuela",
              "population": "30620000",
              "perc_continent_pop": "4.95",
              "minority_percent": "10",
              "minorities": "11",
              "cultural_group": "iberoamerican",
              "gdp": "403322"
          }
      ],
      "origin": {
          "country": "Azerbaijan",
          "population": "9651000",
          "perc_continent_pop": "1.13",
          "minority_percent": "8.4",
          "minorities": "5",
          "cultural_group": "caucasus",
          "gdp": "73537"
      },
      "residence": {
          "country": "Austria",
          "population": "8608000",
          "perc_continent_pop": "1.01",
          "minority_percent": "8.9",
          "minorities": "7",
          "cultural_group": "central",
          "gdp": "437123"
      },
      "cultures": [
          "northern",
          "southeastern",
          "southern",
          "creole",
          "iberoamerican",
          "caucasus",
          "central",
          "eastern",
          "western",
          "indoamerican",
          "mestizo",
          "baltic"
      ],
      "sections": [
          {
              "data": [
                  {
                      "id": 18,
                      "date": "2022-08-29T17:02:32",
                      "date_gmt": "2022-08-29T17:02:32",
                      "guid": {
                          "rendered": "https://dev.blackandfield.com/embroider/?post_type=question&#038;p=18"
                      },
                      "modified": "2022-08-30T20:31:26",
                      "modified_gmt": "2022-08-30T20:31:26",
                      "slug": "where-do-you-come-from",
                      "status": "publish",
                      "type": "question",
                      "link": "https://dev.blackandfield.com/embroider/question/where-do-you-come-from/",
                      "title": {
                          "rendered": "Where do you come from ?"
                      },
                      "content": {
                          "rendered": "",
                          "protected": false
                      },
                      "featured_media": 0,
                      "comment_status": "open",
                      "ping_status": "closed",
                      "template": "",
                      "meta": [],
                      "categories": [
                          2
                      ],
                      "acf": {
                          "question_body": "Where do you come from ?",
                          "question_type": "4",
                          "question_options": null,
                          "question_range_min": "",
                          "question_range_max": ""
                      },
                      "_links": {
                          "self": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question/18"
                              }
                          ],
                          "collection": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question"
                              }
                          ],
                          "about": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/types/question"
                              }
                          ],
                          "replies": [
                              {
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/comments?post=18"
                              }
                          ],
                          "wp:attachment": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/media?parent=18"
                              }
                          ],
                          "wp:term": [
                              {
                                  "taxonomy": "category",
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/categories?post=18"
                              }
                          ],
                          "curies": [
                              {
                                  "name": "wp",
                                  "href": "https://api.w.org/{rel}",
                                  "templated": true
                              }
                          ]
                      }
                  },
                  {
                      "id": 19,
                      "date": "2022-08-29T17:02:52",
                      "date_gmt": "2022-08-29T17:02:52",
                      "guid": {
                          "rendered": "https://dev.blackandfield.com/embroider/?post_type=question&#038;p=19"
                      },
                      "modified": "2022-08-29T17:02:52",
                      "modified_gmt": "2022-08-29T17:02:52",
                      "slug": "where-do-you-currently-live",
                      "status": "publish",
                      "type": "question",
                      "link": "https://dev.blackandfield.com/embroider/question/where-do-you-currently-live/",
                      "title": {
                          "rendered": "Where do you currently live ?"
                      },
                      "content": {
                          "rendered": "",
                          "protected": false
                      },
                      "featured_media": 0,
                      "comment_status": "open",
                      "ping_status": "closed",
                      "template": "",
                      "meta": [],
                      "categories": [
                          2
                      ],
                      "acf": {
                          "question_body": "Where do you currently live ?",
                          "question_type": "4",
                          "question_options": null,
                          "question_range_min": "",
                          "question_range_max": ""
                      },
                      "_links": {
                          "self": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question/19"
                              }
                          ],
                          "collection": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question"
                              }
                          ],
                          "about": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/types/question"
                              }
                          ],
                          "replies": [
                              {
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/comments?post=19"
                              }
                          ],
                          "wp:attachment": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/media?parent=19"
                              }
                          ],
                          "wp:term": [
                              {
                                  "taxonomy": "category",
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/categories?post=19"
                              }
                          ],
                          "curies": [
                              {
                                  "name": "wp",
                                  "href": "https://api.w.org/{rel}",
                                  "templated": true
                              }
                          ]
                      }
                  },
                  {
                      "id": 20,
                      "date": "2022-08-29T17:03:52",
                      "date_gmt": "2022-08-29T17:03:52",
                      "guid": {
                          "rendered": "https://dev.blackandfield.com/embroider/?post_type=question&#038;p=20"
                      },
                      "modified": "2022-08-29T17:03:52",
                      "modified_gmt": "2022-08-29T17:03:52",
                      "slug": "migration-background",
                      "status": "publish",
                      "type": "question",
                      "link": "https://dev.blackandfield.com/embroider/question/migration-background/",
                      "title": {
                          "rendered": "Migration background"
                      },
                      "content": {
                          "rendered": "",
                          "protected": false
                      },
                      "featured_media": 0,
                      "comment_status": "open",
                      "ping_status": "closed",
                      "template": "",
                      "meta": [],
                      "categories": [
                          2
                      ],
                      "acf": {
                          "question_body": "Do you have a migration background? Meaning, have you or your family changed living locations in the last two generations.",
                          "question_type": "2",
                          "question_options": [
                              {
                                  "choice_label": "Second generation of foreign origin",
                                  "choice_value": "2"
                              },
                              {
                                  "choice_label": "First generation of foreign origin",
                                  "choice_value": "1"
                              },
                              {
                                  "choice_label": "No",
                                  "choice_value": "0"
                              }
                          ],
                          "question_range_min": "",
                          "question_range_max": ""
                      },
                      "_links": {
                          "self": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question/20"
                              }
                          ],
                          "collection": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question"
                              }
                          ],
                          "about": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/types/question"
                              }
                          ],
                          "replies": [
                              {
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/comments?post=20"
                              }
                          ],
                          "wp:attachment": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/media?parent=20"
                              }
                          ],
                          "wp:term": [
                              {
                                  "taxonomy": "category",
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/categories?post=20"
                              }
                          ],
                          "curies": [
                              {
                                  "name": "wp",
                                  "href": "https://api.w.org/{rel}",
                                  "templated": true
                              }
                          ]
                      }
                  },
                  {
                      "id": 21,
                      "date": "2022-08-29T17:04:31",
                      "date_gmt": "2022-08-29T17:04:31",
                      "guid": {
                          "rendered": "https://dev.blackandfield.com/embroider/?post_type=question&#038;p=21"
                      },
                      "modified": "2022-08-29T17:04:31",
                      "modified_gmt": "2022-08-29T17:04:31",
                      "slug": "do-you-own-your-home",
                      "status": "publish",
                      "type": "question",
                      "link": "https://dev.blackandfield.com/embroider/question/do-you-own-your-home/",
                      "title": {
                          "rendered": "Do you own your home"
                      },
                      "content": {
                          "rendered": "",
                          "protected": false
                      },
                      "featured_media": 0,
                      "comment_status": "open",
                      "ping_status": "closed",
                      "template": "",
                      "meta": [],
                      "categories": [
                          2
                      ],
                      "acf": {
                          "question_body": "Do you own your home ?",
                          "question_type": "2",
                          "question_options": [
                              {
                                  "choice_label": "Yes",
                                  "choice_value": "1"
                              },
                              {
                                  "choice_label": "No",
                                  "choice_value": "0"
                              }
                          ],
                          "question_range_min": "",
                          "question_range_max": ""
                      },
                      "_links": {
                          "self": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question/21"
                              }
                          ],
                          "collection": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question"
                              }
                          ],
                          "about": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/types/question"
                              }
                          ],
                          "replies": [
                              {
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/comments?post=21"
                              }
                          ],
                          "wp:attachment": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/media?parent=21"
                              }
                          ],
                          "wp:term": [
                              {
                                  "taxonomy": "category",
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/categories?post=21"
                              }
                          ],
                          "curies": [
                              {
                                  "name": "wp",
                                  "href": "https://api.w.org/{rel}",
                                  "templated": true
                              }
                          ]
                      }
                  },
                  {
                      "id": 23,
                      "date": "2022-08-29T17:06:34",
                      "date_gmt": "2022-08-29T17:06:34",
                      "guid": {
                          "rendered": "https://dev.blackandfield.com/embroider/?post_type=question&#038;p=23"
                      },
                      "modified": "2022-08-31T07:36:39",
                      "modified_gmt": "2022-08-31T07:36:39",
                      "slug": "how-many-rooms",
                      "status": "publish",
                      "type": "question",
                      "link": "https://dev.blackandfield.com/embroider/question/how-many-rooms/",
                      "title": {
                          "rendered": "how many rooms"
                      },
                      "content": {
                          "rendered": "",
                          "protected": false
                      },
                      "featured_media": 0,
                      "comment_status": "open",
                      "ping_status": "closed",
                      "template": "",
                      "meta": [],
                      "categories": [
                          2
                      ],
                      "acf": {
                          "question_body": "How many rooms does your home have ? (A room counts as any space that is not a hallway, bathroom, kitchen or outside, like a loggia or balcony)",
                          "question_type": "0",
                          "question_options": null,
                          "question_range_min": 0,
                          "question_range_max": 7
                      },
                      "_links": {
                          "self": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question/23"
                              }
                          ],
                          "collection": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question"
                              }
                          ],
                          "about": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/types/question"
                              }
                          ],
                          "replies": [
                              {
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/comments?post=23"
                              }
                          ],
                          "wp:attachment": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/media?parent=23"
                              }
                          ],
                          "wp:term": [
                              {
                                  "taxonomy": "category",
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/categories?post=23"
                              }
                          ],
                          "curies": [
                              {
                                  "name": "wp",
                                  "href": "https://api.w.org/{rel}",
                                  "templated": true
                              }
                          ]
                      }
                  },
                  {
                      "id": 24,
                      "date": "2022-08-29T17:07:01",
                      "date_gmt": "2022-08-29T17:07:01",
                      "guid": {
                          "rendered": "https://dev.blackandfield.com/embroider/?post_type=question&#038;p=24"
                      },
                      "modified": "2022-08-29T17:07:01",
                      "modified_gmt": "2022-08-29T17:07:01",
                      "slug": "how-many-people",
                      "status": "publish",
                      "type": "question",
                      "link": "https://dev.blackandfield.com/embroider/question/how-many-people/",
                      "title": {
                          "rendered": "how many people"
                      },
                      "content": {
                          "rendered": "",
                          "protected": false
                      },
                      "featured_media": 0,
                      "comment_status": "open",
                      "ping_status": "closed",
                      "template": "",
                      "meta": [],
                      "categories": [
                          2
                      ],
                      "acf": {
                          "question_body": "How many people are in your current household ? Any person that you share your living space with (like parents, partners, flatmates) counts as a member of your household.",
                          "question_type": "0",
                          "question_options": null,
                          "question_range_min": "",
                          "question_range_max": ""
                      },
                      "_links": {
                          "self": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question/24"
                              }
                          ],
                          "collection": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question"
                              }
                          ],
                          "about": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/types/question"
                              }
                          ],
                          "replies": [
                              {
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/comments?post=24"
                              }
                          ],
                          "wp:attachment": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/media?parent=24"
                              }
                          ],
                          "wp:term": [
                              {
                                  "taxonomy": "category",
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/categories?post=24"
                              }
                          ],
                          "curies": [
                              {
                                  "name": "wp",
                                  "href": "https://api.w.org/{rel}",
                                  "templated": true
                              }
                          ]
                      }
                  },
                  {
                      "id": 25,
                      "date": "2022-08-29T17:07:37",
                      "date_gmt": "2022-08-29T17:07:37",
                      "guid": {
                          "rendered": "https://dev.blackandfield.com/embroider/?post_type=question&#038;p=25"
                      },
                      "modified": "2022-08-29T17:07:40",
                      "modified_gmt": "2022-08-29T17:07:40",
                      "slug": "ground",
                      "status": "publish",
                      "type": "question",
                      "link": "https://dev.blackandfield.com/embroider/question/ground/",
                      "title": {
                          "rendered": "Ground"
                      },
                      "content": {
                          "rendered": "",
                          "protected": false
                      },
                      "featured_media": 0,
                      "comment_status": "open",
                      "ping_status": "closed",
                      "template": "",
                      "meta": [],
                      "categories": [
                          2
                      ],
                      "acf": {
                          "question_body": "Is your living location on the ground floor or on an upper story?",
                          "question_type": "2",
                          "question_options": [
                              {
                                  "choice_label": "Ground",
                                  "choice_value": "0"
                              },
                              {
                                  "choice_label": "Upper Story",
                                  "choice_value": "7"
                              }
                          ],
                          "question_range_min": "",
                          "question_range_max": ""
                      },
                      "_links": {
                          "self": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question/25"
                              }
                          ],
                          "collection": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question"
                              }
                          ],
                          "about": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/types/question"
                              }
                          ],
                          "replies": [
                              {
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/comments?post=25"
                              }
                          ],
                          "wp:attachment": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/media?parent=25"
                              }
                          ],
                          "wp:term": [
                              {
                                  "taxonomy": "category",
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/categories?post=25"
                              }
                          ],
                          "curies": [
                              {
                                  "name": "wp",
                                  "href": "https://api.w.org/{rel}",
                                  "templated": true
                              }
                          ]
                      }
                  },
                  {
                      "id": 27,
                      "date": "2022-08-29T17:11:00",
                      "date_gmt": "2022-08-29T17:11:00",
                      "guid": {
                          "rendered": "https://dev.blackandfield.com/embroider/?post_type=question&#038;p=27"
                      },
                      "modified": "2022-08-29T17:11:00",
                      "modified_gmt": "2022-08-29T17:11:00",
                      "slug": "distance",
                      "status": "publish",
                      "type": "question",
                      "link": "https://dev.blackandfield.com/embroider/question/distance/",
                      "title": {
                          "rendered": "Distance"
                      },
                      "content": {
                          "rendered": "",
                          "protected": false
                      },
                      "featured_media": 0,
                      "comment_status": "open",
                      "ping_status": "closed",
                      "template": "",
                      "meta": [],
                      "categories": [
                          2
                      ],
                      "acf": {
                          "question_body": "How long does it take you to get to the center of your locality using public transport?",
                          "question_type": "2",
                          "question_options": [
                              {
                                  "choice_label": "Over 2 hours",
                                  "choice_value": "10"
                              },
                              {
                                  "choice_label": "Over an hour",
                                  "choice_value": "7"
                              },
                              {
                                  "choice_label": "Over 45 minutes",
                                  "choice_value": "6"
                              },
                              {
                                  "choice_label": "Over 30 minutes",
                                  "choice_value": "5"
                              },
                              {
                                  "choice_label": "Under 30 minutes",
                                  "choice_value": "4"
                              },
                              {
                                  "choice_label": "Under 20 minutes",
                                  "choice_value": "2"
                              },
                              {
                                  "choice_label": "Under 10 minutes",
                                  "choice_value": "1"
                              }
                          ],
                          "question_range_min": "",
                          "question_range_max": ""
                      },
                      "_links": {
                          "self": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question/27"
                              }
                          ],
                          "collection": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question"
                              }
                          ],
                          "about": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/types/question"
                              }
                          ],
                          "replies": [
                              {
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/comments?post=27"
                              }
                          ],
                          "wp:attachment": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/media?parent=27"
                              }
                          ],
                          "wp:term": [
                              {
                                  "taxonomy": "category",
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/categories?post=27"
                              }
                          ],
                          "curies": [
                              {
                                  "name": "wp",
                                  "href": "https://api.w.org/{rel}",
                                  "templated": true
                              }
                          ]
                      }
                  },
                  {
                      "id": 28,
                      "date": "2022-08-29T17:13:15",
                      "date_gmt": "2022-08-29T17:13:15",
                      "guid": {
                          "rendered": "https://dev.blackandfield.com/embroider/?post_type=question&#038;p=28"
                      },
                      "modified": "2022-08-29T17:13:51",
                      "modified_gmt": "2022-08-29T17:13:51",
                      "slug": "what-is-your-main-means-of-transportation",
                      "status": "publish",
                      "type": "question",
                      "link": "https://dev.blackandfield.com/embroider/question/what-is-your-main-means-of-transportation/",
                      "title": {
                          "rendered": "What is your main means of transportation"
                      },
                      "content": {
                          "rendered": "",
                          "protected": false
                      },
                      "featured_media": 0,
                      "comment_status": "open",
                      "ping_status": "closed",
                      "template": "",
                      "meta": [],
                      "categories": [
                          2
                      ],
                      "acf": {
                          "question_body": "What is your main means of transportation ?",
                          "question_type": "2",
                          "question_options": [
                              {
                                  "choice_label": "Personal Car",
                                  "choice_value": "10"
                              },
                              {
                                  "choice_label": "Car sharing services",
                                  "choice_value": "8"
                              },
                              {
                                  "choice_label": "App Transfer (Uber, Bolt, Taxify, Taxi)",
                                  "choice_value": "7"
                              },
                              {
                                  "choice_label": "Public Transport",
                                  "choice_value": "6"
                              },
                              {
                                  "choice_label": "Walking",
                                  "choice_value": "2"
                              },
                              {
                                  "choice_label": "Cycling",
                                  "choice_value": "5"
                              }
                          ],
                          "question_range_min": "",
                          "question_range_max": ""
                      },
                      "_links": {
                          "self": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question/28"
                              }
                          ],
                          "collection": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question"
                              }
                          ],
                          "about": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/types/question"
                              }
                          ],
                          "replies": [
                              {
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/comments?post=28"
                              }
                          ],
                          "wp:attachment": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/media?parent=28"
                              }
                          ],
                          "wp:term": [
                              {
                                  "taxonomy": "category",
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/categories?post=28"
                              }
                          ],
                          "curies": [
                              {
                                  "name": "wp",
                                  "href": "https://api.w.org/{rel}",
                                  "templated": true
                              }
                          ]
                      }
                  }
              ],
              "questionValues": [
                  0,
                  0,
                  2,
                  1,
                  7,
                  1,
                  7,
                  4,
                  7
              ],
              "description": "This is the living and location section of the pattern. A section is made up of motifs and symmetries. Motifs are generated using answers to questions in the section, such as this one. Watch the pattern on the right to see how your answers change the design.",
              "title": "Living and Locations"
          },
          {
              "data": [
                  {
                      "id": 36,
                      "date": "2022-09-03T09:29:42",
                      "date_gmt": "2022-09-03T09:29:42",
                      "guid": {
                          "rendered": "https://dev.blackandfield.com/embroider/?post_type=question&#038;p=36"
                      },
                      "modified": "2022-09-03T09:29:42",
                      "modified_gmt": "2022-09-03T09:29:42",
                      "slug": "education",
                      "status": "publish",
                      "type": "question",
                      "link": "https://dev.blackandfield.com/embroider/question/education/",
                      "title": {
                          "rendered": "Education"
                      },
                      "content": {
                          "rendered": "",
                          "protected": false
                      },
                      "featured_media": 0,
                      "comment_status": "open",
                      "ping_status": "closed",
                      "template": "",
                      "meta": [],
                      "categories": [
                          3
                      ],
                      "acf": {
                          "question_body": "What is your highest academic degree ?",
                          "question_type": "2",
                          "question_options": [
                              {
                                  "choice_label": "No formal education",
                                  "choice_value": "2"
                              },
                              {
                                  "choice_label": "Primary School",
                                  "choice_value": "4"
                              },
                              {
                                  "choice_label": "Middle-School",
                                  "choice_value": "8"
                              },
                              {
                                  "choice_label": "High-School",
                                  "choice_value": "12"
                              },
                              {
                                  "choice_label": "BA, BSc, Bphil, BFA, Bachellor",
                                  "choice_value": "15"
                              },
                              {
                                  "choice_label": "MA, MSC, MPhil, MFA, Diplom / Master's",
                                  "choice_value": "17"
                              },
                              {
                                  "choice_label": "Phd Doctorate",
                                  "choice_value": "23"
                              },
                              {
                                  "choice_label": "Post-Doc",
                                  "choice_value": "27"
                              }
                          ],
                          "question_range_min": "",
                          "question_range_max": ""
                      },
                      "_links": {
                          "self": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question/36"
                              }
                          ],
                          "collection": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question"
                              }
                          ],
                          "about": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/types/question"
                              }
                          ],
                          "replies": [
                              {
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/comments?post=36"
                              }
                          ],
                          "wp:attachment": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/media?parent=36"
                              }
                          ],
                          "wp:term": [
                              {
                                  "taxonomy": "category",
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/categories?post=36"
                              }
                          ],
                          "curies": [
                              {
                                  "name": "wp",
                                  "href": "https://api.w.org/{rel}",
                                  "templated": true
                              }
                          ]
                      }
                  },
                  {
                      "id": 37,
                      "date": "2022-09-03T09:31:31",
                      "date_gmt": "2022-09-03T09:31:31",
                      "guid": {
                          "rendered": "https://dev.blackandfield.com/embroider/?post_type=question&#038;p=37"
                      },
                      "modified": "2022-09-03T09:31:31",
                      "modified_gmt": "2022-09-03T09:31:31",
                      "slug": "employment",
                      "status": "publish",
                      "type": "question",
                      "link": "https://dev.blackandfield.com/embroider/question/employment/",
                      "title": {
                          "rendered": "Employment"
                      },
                      "content": {
                          "rendered": "",
                          "protected": false
                      },
                      "featured_media": 0,
                      "comment_status": "open",
                      "ping_status": "closed",
                      "template": "",
                      "meta": [],
                      "categories": [
                          3
                      ],
                      "acf": {
                          "question_body": "What is your form of employment ?",
                          "question_type": "2",
                          "question_options": [
                              {
                                  "choice_label": "Employee",
                                  "choice_value": "5"
                              },
                              {
                                  "choice_label": "Self-Employed Freelancer",
                                  "choice_value": "7"
                              },
                              {
                                  "choice_label": "Self-Employed Company",
                                  "choice_value": "13"
                              },
                              {
                                  "choice_label": "Unemployed",
                                  "choice_value": "0"
                              },
                              {
                                  "choice_label": "Student",
                                  "choice_value": "3"
                              }
                          ],
                          "question_range_min": "",
                          "question_range_max": ""
                      },
                      "_links": {
                          "self": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question/37"
                              }
                          ],
                          "collection": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question"
                              }
                          ],
                          "about": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/types/question"
                              }
                          ],
                          "replies": [
                              {
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/comments?post=37"
                              }
                          ],
                          "wp:attachment": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/media?parent=37"
                              }
                          ],
                          "wp:term": [
                              {
                                  "taxonomy": "category",
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/categories?post=37"
                              }
                          ],
                          "curies": [
                              {
                                  "name": "wp",
                                  "href": "https://api.w.org/{rel}",
                                  "templated": true
                              }
                          ]
                      }
                  },
                  {
                      "id": 39,
                      "date": "2022-09-03T09:36:22",
                      "date_gmt": "2022-09-03T09:36:22",
                      "guid": {
                          "rendered": "https://dev.blackandfield.com/embroider/?post_type=question&#038;p=39"
                      },
                      "modified": "2022-09-11T17:26:35",
                      "modified_gmt": "2022-09-11T17:26:35",
                      "slug": "field-of-work",
                      "status": "publish",
                      "type": "question",
                      "link": "https://dev.blackandfield.com/embroider/question/field-of-work/",
                      "title": {
                          "rendered": "Field of work"
                      },
                      "content": {
                          "rendered": "",
                          "protected": false
                      },
                      "featured_media": 0,
                      "comment_status": "open",
                      "ping_status": "closed",
                      "template": "",
                      "meta": [],
                      "categories": [
                          3
                      ],
                      "acf": {
                          "question_body": "What field/s do you work in ?",
                          "question_type": "3",
                          "question_options": [
                              {
                                  "choice_label": "Architecture",
                                  "choice_value": "27"
                              },
                              {
                                  "choice_label": "Art and Culture",
                                  "choice_value": "20"
                              },
                              {
                                  "choice_label": "Business & Commerce",
                                  "choice_value": "14"
                              },
                              {
                                  "choice_label": "Broadcasting & Media ",
                                  "choice_value": "17"
                              },
                              {
                                  "choice_label": "Building & Construction",
                                  "choice_value": "9"
                              },
                              {
                                  "choice_label": "Charity & Volunteering",
                                  "choice_value": "12"
                              },
                              {
                                  "choice_label": "Craft",
                                  "choice_value": "10"
                              },
                              {
                                  "choice_label": "Design",
                                  "choice_value": "24"
                              },
                              {
                                  "choice_label": "Educattion",
                                  "choice_value": "13"
                              },
                              {
                                  "choice_label": "Energy & Utilities ",
                                  "choice_value": "7"
                              },
                              {
                                  "choice_label": "Engineering",
                                  "choice_value": "25"
                              },
                              {
                                  "choice_label": "Environment & Agriculture",
                                  "choice_value": "15"
                              },
                              {
                                  "choice_label": "Finance & Banking",
                                  "choice_value": "23"
                              },
                              {
                                  "choice_label": "Healthcare",
                                  "choice_value": "30"
                              },
                              {
                                  "choice_label": "Information Technology",
                                  "choice_value": "22"
                              },
                              {
                                  "choice_label": "Law",
                                  "choice_value": "16"
                              },
                              {
                                  "choice_label": "PR & Communications",
                                  "choice_value": "18"
                              },
                              {
                                  "choice_label": "Science",
                                  "choice_value": "12"
                              },
                              {
                                  "choice_label": "Service",
                                  "choice_value": "19"
                              },
                              {
                                  "choice_label": "State & Administration",
                                  "choice_value": "15"
                              },
                              {
                                  "choice_label": "Transport ",
                                  "choice_value": "21"
                              }
                          ],
                          "question_range_min": "",
                          "question_range_max": ""
                      },
                      "_links": {
                          "self": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question/39"
                              }
                          ],
                          "collection": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question"
                              }
                          ],
                          "about": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/types/question"
                              }
                          ],
                          "replies": [
                              {
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/comments?post=39"
                              }
                          ],
                          "wp:attachment": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/media?parent=39"
                              }
                          ],
                          "wp:term": [
                              {
                                  "taxonomy": "category",
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/categories?post=39"
                              }
                          ],
                          "curies": [
                              {
                                  "name": "wp",
                                  "href": "https://api.w.org/{rel}",
                                  "templated": true
                              }
                          ]
                      }
                  },
                  {
                      "id": 40,
                      "date": "2022-09-03T09:40:25",
                      "date_gmt": "2022-09-03T09:40:25",
                      "guid": {
                          "rendered": "https://dev.blackandfield.com/embroider/?post_type=question&#038;p=40"
                      },
                      "modified": "2022-09-03T09:40:25",
                      "modified_gmt": "2022-09-03T09:40:25",
                      "slug": "commute",
                      "status": "publish",
                      "type": "question",
                      "link": "https://dev.blackandfield.com/embroider/question/commute/",
                      "title": {
                          "rendered": "Commute"
                      },
                      "content": {
                          "rendered": "",
                          "protected": false
                      },
                      "featured_media": 0,
                      "comment_status": "open",
                      "ping_status": "closed",
                      "template": "",
                      "meta": [],
                      "categories": [
                          3
                      ],
                      "acf": {
                          "question_body": "How long do you spend on your daily commute to work ?",
                          "question_type": "2",
                          "question_options": [
                              {
                                  "choice_label": "Less than 10 minutes",
                                  "choice_value": "2"
                              },
                              {
                                  "choice_label": "Less than 20 minutes",
                                  "choice_value": "5"
                              },
                              {
                                  "choice_label": "Less than 30 minutes",
                                  "choice_value": "7"
                              },
                              {
                                  "choice_label": "Less than one hour",
                                  "choice_value": "9"
                              },
                              {
                                  "choice_label": "One hour",
                                  "choice_value": "11"
                              },
                              {
                                  "choice_label": "More than one hour",
                                  "choice_value": "13"
                              },
                              {
                                  "choice_label": "More than 2 hours",
                                  "choice_value": "15"
                              }
                          ],
                          "question_range_min": "",
                          "question_range_max": ""
                      },
                      "_links": {
                          "self": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question/40"
                              }
                          ],
                          "collection": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question"
                              }
                          ],
                          "about": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/types/question"
                              }
                          ],
                          "replies": [
                              {
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/comments?post=40"
                              }
                          ],
                          "wp:attachment": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/media?parent=40"
                              }
                          ],
                          "wp:term": [
                              {
                                  "taxonomy": "category",
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/categories?post=40"
                              }
                          ],
                          "curies": [
                              {
                                  "name": "wp",
                                  "href": "https://api.w.org/{rel}",
                                  "templated": true
                              }
                          ]
                      }
                  },
                  {
                      "id": 41,
                      "date": "2022-09-03T09:40:50",
                      "date_gmt": "2022-09-03T09:40:50",
                      "guid": {
                          "rendered": "https://dev.blackandfield.com/embroider/?post_type=question&#038;p=41"
                      },
                      "modified": "2022-09-03T09:40:50",
                      "modified_gmt": "2022-09-03T09:40:50",
                      "slug": "time",
                      "status": "publish",
                      "type": "question",
                      "link": "https://dev.blackandfield.com/embroider/question/time/",
                      "title": {
                          "rendered": "Time"
                      },
                      "content": {
                          "rendered": "",
                          "protected": false
                      },
                      "featured_media": 0,
                      "comment_status": "open",
                      "ping_status": "closed",
                      "template": "",
                      "meta": [],
                      "categories": [
                          3
                      ],
                      "acf": {
                          "question_body": "How many hours per day do you work ?",
                          "question_type": "0",
                          "question_options": null,
                          "question_range_min": "",
                          "question_range_max": ""
                      },
                      "_links": {
                          "self": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question/41"
                              }
                          ],
                          "collection": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question"
                              }
                          ],
                          "about": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/types/question"
                              }
                          ],
                          "replies": [
                              {
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/comments?post=41"
                              }
                          ],
                          "wp:attachment": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/media?parent=41"
                              }
                          ],
                          "wp:term": [
                              {
                                  "taxonomy": "category",
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/categories?post=41"
                              }
                          ],
                          "curies": [
                              {
                                  "name": "wp",
                                  "href": "https://api.w.org/{rel}",
                                  "templated": true
                              }
                          ]
                      }
                  }
              ],
              "questionValues": [
                  17,
                  13,
                  [
                      42,
                      [
                          {
                              "label": "Art and Culture",
                              "value": "20"
                          },
                          {
                              "label": "Information Technology",
                              "value": "22"
                          }
                      ]
                  ],
                  7,
                  7
              ],
              "description": "This the work and education section of the pattern. While we shouldn't let ourselved be defined by our work and jobs, it cannot be ignored that it makes up a large part of our identity. ",
              "title": "Work and Education"
          },
          {
              "data": [
                  {
                      "id": 17,
                      "date": "2022-08-29T17:06:38",
                      "date_gmt": "2022-08-29T17:06:38",
                      "guid": {
                          "rendered": "https://dev.blackandfield.com/embroider/?post_type=question&#038;p=17"
                      },
                      "modified": "2022-08-31T13:10:08",
                      "modified_gmt": "2022-08-31T13:10:08",
                      "slug": "17",
                      "status": "publish",
                      "type": "question",
                      "link": "https://dev.blackandfield.com/embroider/question/17/",
                      "title": {
                          "rendered": "How many siblings do you have ?"
                      },
                      "content": {
                          "rendered": "",
                          "protected": false
                      },
                      "featured_media": 0,
                      "comment_status": "open",
                      "ping_status": "closed",
                      "template": "",
                      "meta": [],
                      "categories": [
                          4
                      ],
                      "acf": {
                          "question_body": "How many siblings do you have ?",
                          "question_type": "0",
                          "question_options": [
                              {
                                  "choice_label": "Rarely",
                                  "choice_value": "0"
                              },
                              {
                                  "choice_label": "Sometimes",
                                  "choice_value": "1"
                              },
                              {
                                  "choice_label": "Regularly",
                                  "choice_value": "2"
                              },
                              {
                                  "choice_label": "Many Times",
                                  "choice_value": "3"
                              }
                          ],
                          "question_range_min": "",
                          "question_range_max": ""
                      },
                      "_links": {
                          "self": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question/17"
                              }
                          ],
                          "collection": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question"
                              }
                          ],
                          "about": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/types/question"
                              }
                          ],
                          "replies": [
                              {
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/comments?post=17"
                              }
                          ],
                          "wp:attachment": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/media?parent=17"
                              }
                          ],
                          "wp:term": [
                              {
                                  "taxonomy": "category",
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/categories?post=17"
                              }
                          ],
                          "curies": [
                              {
                                  "name": "wp",
                                  "href": "https://api.w.org/{rel}",
                                  "templated": true
                              }
                          ]
                      }
                  },
                  {
                      "id": 29,
                      "date": "2022-09-03T08:59:27",
                      "date_gmt": "2022-09-03T08:59:27",
                      "guid": {
                          "rendered": "https://dev.blackandfield.com/embroider/?post_type=question&#038;p=29"
                      },
                      "modified": "2022-09-03T08:59:27",
                      "modified_gmt": "2022-09-03T08:59:27",
                      "slug": "how-old-are-you-now",
                      "status": "publish",
                      "type": "question",
                      "link": "https://dev.blackandfield.com/embroider/question/how-old-are-you-now/",
                      "title": {
                          "rendered": "How old are you now ?"
                      },
                      "content": {
                          "rendered": "",
                          "protected": false
                      },
                      "featured_media": 0,
                      "comment_status": "open",
                      "ping_status": "closed",
                      "template": "",
                      "meta": [],
                      "categories": [
                          4
                      ],
                      "acf": {
                          "question_body": "How old are you now ?",
                          "question_type": "0",
                          "question_options": null,
                          "question_range_min": "",
                          "question_range_max": ""
                      },
                      "_links": {
                          "self": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question/29"
                              }
                          ],
                          "collection": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question"
                              }
                          ],
                          "about": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/types/question"
                              }
                          ],
                          "replies": [
                              {
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/comments?post=29"
                              }
                          ],
                          "wp:attachment": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/media?parent=29"
                              }
                          ],
                          "wp:term": [
                              {
                                  "taxonomy": "category",
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/categories?post=29"
                              }
                          ],
                          "curies": [
                              {
                                  "name": "wp",
                                  "href": "https://api.w.org/{rel}",
                                  "templated": true
                              }
                          ]
                      }
                  },
                  {
                      "id": 30,
                      "date": "2022-09-03T09:02:27",
                      "date_gmt": "2022-09-03T09:02:27",
                      "guid": {
                          "rendered": "https://dev.blackandfield.com/embroider/?post_type=question&#038;p=30"
                      },
                      "modified": "2022-09-17T09:40:19",
                      "modified_gmt": "2022-09-17T09:40:19",
                      "slug": "relationship-kind",
                      "status": "publish",
                      "type": "question",
                      "link": "https://dev.blackandfield.com/embroider/question/relationship-kind/",
                      "title": {
                          "rendered": "Relationship kind"
                      },
                      "content": {
                          "rendered": "",
                          "protected": false
                      },
                      "featured_media": 0,
                      "comment_status": "open",
                      "ping_status": "closed",
                      "template": "",
                      "meta": [],
                      "categories": [
                          4
                      ],
                      "acf": {
                          "question_body": "What kind of relationship are you in ?",
                          "question_type": "2",
                          "question_options": [
                              {
                                  "choice_label": "No relationship",
                                  "choice_value": "0"
                              },
                              {
                                  "choice_label": "Looking for / Dating",
                                  "choice_value": "1"
                              },
                              {
                                  "choice_label": "Open",
                                  "choice_value": "4"
                              },
                              {
                                  "choice_label": "Monogamous",
                                  "choice_value": "3"
                              },
                              {
                                  "choice_label": "Married",
                                  "choice_value": "5"
                              },
                              {
                                  "choice_label": "Widowed",
                                  "choice_value": "8"
                              },
                              {
                                  "choice_label": "Non-Monogamous",
                                  "choice_value": "6"
                              },
                              {
                                  "choice_label": "Undisclosed",
                                  "choice_value": "16"
                              }
                          ],
                          "question_range_min": "",
                          "question_range_max": ""
                      },
                      "_links": {
                          "self": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question/30"
                              }
                          ],
                          "collection": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question"
                              }
                          ],
                          "about": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/types/question"
                              }
                          ],
                          "replies": [
                              {
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/comments?post=30"
                              }
                          ],
                          "wp:attachment": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/media?parent=30"
                              }
                          ],
                          "wp:term": [
                              {
                                  "taxonomy": "category",
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/categories?post=30"
                              }
                          ],
                          "curies": [
                              {
                                  "name": "wp",
                                  "href": "https://api.w.org/{rel}",
                                  "templated": true
                              }
                          ]
                      }
                  },
                  {
                      "id": 32,
                      "date": "2022-09-03T09:05:21",
                      "date_gmt": "2022-09-03T09:05:21",
                      "guid": {
                          "rendered": "https://dev.blackandfield.com/embroider/?post_type=question&#038;p=32"
                      },
                      "modified": "2022-09-03T09:05:21",
                      "modified_gmt": "2022-09-03T09:05:21",
                      "slug": "social-circle",
                      "status": "publish",
                      "type": "question",
                      "link": "https://dev.blackandfield.com/embroider/question/social-circle/",
                      "title": {
                          "rendered": "social circle"
                      },
                      "content": {
                          "rendered": "",
                          "protected": false
                      },
                      "featured_media": 0,
                      "comment_status": "open",
                      "ping_status": "closed",
                      "template": "",
                      "meta": [],
                      "categories": [
                          4
                      ],
                      "acf": {
                          "question_body": "How large is your social circle ?",
                          "question_type": "2",
                          "question_options": [
                              {
                                  "choice_label": "Small, a few individuals",
                                  "choice_value": "5"
                              },
                              {
                                  "choice_label": "Medium, several groups",
                                  "choice_value": "7"
                              },
                              {
                                  "choice_label": "Large, many social groups",
                                  "choice_value": "9"
                              },
                              {
                                  "choice_label": "Very large, publicly exposed",
                                  "choice_value": "13"
                              }
                          ],
                          "question_range_min": "",
                          "question_range_max": ""
                      },
                      "_links": {
                          "self": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question/32"
                              }
                          ],
                          "collection": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question"
                              }
                          ],
                          "about": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/types/question"
                              }
                          ],
                          "replies": [
                              {
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/comments?post=32"
                              }
                          ],
                          "wp:attachment": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/media?parent=32"
                              }
                          ],
                          "wp:term": [
                              {
                                  "taxonomy": "category",
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/categories?post=32"
                              }
                          ],
                          "curies": [
                              {
                                  "name": "wp",
                                  "href": "https://api.w.org/{rel}",
                                  "templated": true
                              }
                          ]
                      }
                  },
                  {
                      "id": 35,
                      "date": "2022-09-03T09:08:08",
                      "date_gmt": "2022-09-03T09:08:08",
                      "guid": {
                          "rendered": "https://dev.blackandfield.com/embroider/?post_type=question&#038;p=35"
                      },
                      "modified": "2022-09-15T11:48:58",
                      "modified_gmt": "2022-09-15T11:48:58",
                      "slug": "parents",
                      "status": "publish",
                      "type": "question",
                      "link": "https://dev.blackandfield.com/embroider/question/parents/",
                      "title": {
                          "rendered": "parents"
                      },
                      "content": {
                          "rendered": "",
                          "protected": false
                      },
                      "featured_media": 0,
                      "comment_status": "open",
                      "ping_status": "closed",
                      "template": "",
                      "meta": [],
                      "categories": [
                          4
                      ],
                      "acf": {
                          "question_body": "Are your parents alive ?",
                          "question_type": "2",
                          "question_options": [
                              {
                                  "choice_label": "Yes, both",
                                  "choice_value": "2"
                              },
                              {
                                  "choice_label": "One of them",
                                  "choice_value": "1"
                              },
                              {
                                  "choice_label": "No",
                                  "choice_value": "0"
                              }
                          ],
                          "question_range_min": "",
                          "question_range_max": ""
                      },
                      "_links": {
                          "self": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question/35"
                              }
                          ],
                          "collection": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question"
                              }
                          ],
                          "about": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/types/question"
                              }
                          ],
                          "replies": [
                              {
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/comments?post=35"
                              }
                          ],
                          "wp:attachment": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/media?parent=35"
                              }
                          ],
                          "wp:term": [
                              {
                                  "taxonomy": "category",
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/categories?post=35"
                              }
                          ],
                          "curies": [
                              {
                                  "name": "wp",
                                  "href": "https://api.w.org/{rel}",
                                  "templated": true
                              }
                          ]
                      }
                  },
                  {
                      "id": 49,
                      "date": "2022-09-06T05:32:12",
                      "date_gmt": "2022-09-06T05:32:12",
                      "guid": {
                          "rendered": "https://dev.blackandfield.com/embroider/?post_type=question&#038;p=49"
                      },
                      "modified": "2022-09-06T05:32:12",
                      "modified_gmt": "2022-09-06T05:32:12",
                      "slug": "children",
                      "status": "publish",
                      "type": "question",
                      "link": "https://dev.blackandfield.com/embroider/question/children/",
                      "title": {
                          "rendered": "Children"
                      },
                      "content": {
                          "rendered": "",
                          "protected": false
                      },
                      "featured_media": 0,
                      "comment_status": "open",
                      "ping_status": "closed",
                      "template": "",
                      "meta": [],
                      "categories": [
                          4
                      ],
                      "acf": {
                          "question_body": "Do you have any children ?  How many ?",
                          "question_type": "0",
                          "question_options": null,
                          "question_range_min": "",
                          "question_range_max": ""
                      },
                      "_links": {
                          "self": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question/49"
                              }
                          ],
                          "collection": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/question"
                              }
                          ],
                          "about": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/types/question"
                              }
                          ],
                          "replies": [
                              {
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/comments?post=49"
                              }
                          ],
                          "wp:attachment": [
                              {
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/media?parent=49"
                              }
                          ],
                          "wp:term": [
                              {
                                  "taxonomy": "category",
                                  "embeddable": true,
                                  "href": "https://dev.blackandfield.com/embroider/wp-json/wp/v2/categories?post=49"
                              }
                          ],
                          "curies": [
                              {
                                  "name": "wp",
                                  "href": "https://api.w.org/{rel}",
                                  "templated": true
                              }
                          ]
                      }
                  }
              ],
              "questionValues": [
                  0,
                  35,
                  6,
                  9,
                  2,
                  3
              ],
              "description": "This is the social and relationships section of the pattern. Our relationships and social interactions make a big part of who we are and who we become, it used to be shown on the embroideries if you had a family, or wife or children.",
              "title": "Friends, family and relationships"
          }
      ],
      "currentSection": 0,
      "svg": ""
    }

    this.palettes = {
      northern: [
        '#ffca00',
        '#1f69fe',
        '#fe940d',
        '#c50f0e',
        '#101415'
      ],
      mestizo: [
        '#97ab74',
        '#657fd6',
        '#1f6db7',
        '#fda81a',
        '#1b1521',
      ],
      indoamerican: [
        '#fa880e',
        '#8bc6b2',
        '#e50537',
        '#8bc6b2',


        '#e71167',

      ],
      iberoamerican: [
        '#54b0af',
        '#7eafd0',
        '#f7da74',
        '#03257e',
        '#d6d8d5'
      ],
      creole: [
        '#d92e50',
        '#46b78c',
        '#bde686',
        '#65daee',
        '#40377a'
      ],
      central: [
        '#55a491',
        '#b9cbcf',
        '#34566f',
        '#afb090',
        '#42433e'
      ],
      caucasus: [
        '#a04846',
        '#b88491',
        '#347579',
        '#c6aa83',
        '#3b3630'
      ],
      baltic: [
        '#e35f5b',
        '#c4dff0',
        '#e2c780',
        '#6599d2',
        '#2a2f33'

      ],
      western: [
        '#203e5f',
        '#ffcc00',
        '#eaeaea',
        '#fee5b1',
        '#1a2634'
      ],
      southern: [
        '#2039c7',
        '#f2dcde',

        '#e8987f',
        '#121888',
        '#ca8d22',


      ],
      eastern: [
        '#b5b3a7',
        '#ce5f51',
        '#bd6964',
        '#fafafa',
        '#1a1c1a'
      ],
      southeastern: [
        '#305ee0',
        '#ffe8e7',
        '#c41815',
        '#c4cbe0',
        '#000000'
      ]

    }

  }


  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  componentDidMount() {
    const sockets = this.context;

    sockets.on('stateChange', (data) => {
      console.log('socketdata', data);
      this.setState(data);
    })

    this.timeoutIdTwo = setTimeout(function () {
      this.setState({ ...this.initialState });
    }.bind(this), 10)

    this.timeoutId = setTimeout(function () {
      this.setState({ rotate: true });
    }.bind(this), 200);



}

componentWillMount() {
    // let result = {};
      let localData = '';
  const values = [];

  const sectionIDs = [2, 4, 3, 5];
  const sections = [];
  const descriptions = [];



  const sectionData = [];


  // fetch(`https://dev.blackandfield.com/embroider/wp-json/wp/v2/categories/?order_by=id&order=asc`).then(response => response.json())
  //     .then(data => {
  //       // descriptions.push({ desc: cat.description, title: cat.name });
  //       data.map((val, index) => {
  //         if (val.id !== 1) {
  //           sectionData.push(val);
  //         }
  //       })

  //       sectionData.sort(function(a, b) {
  //         return a.id - b.id;
  //       });


  //       sectionData.map((value, index) => {
  //         const values = [];

  //         fetch(`https://dev.blackandfield.com/embroider/wp-json/wp/v2/question/?per_page=100&categories=${sectionData[index].id}&order=asc`).then(response => response.json())
  //         .then(data => {

  //           for (let question in data) {
  //             values.push(0);
  //           }

  //           // if(sectionData[index] !== undefined) {
  //           sections[index] = { data: data, questionValues: values, description: sectionData[index].description, title: sectionData[index].name }
  //           this.setState({ sections });
  //           // }
  //         }).catch(e => {console.log(e)});

  //         this.setState({ sections });
  //         console.log(sections)

  //         })



  //       console.log(sectionData);
  //     }).catch(e => {
  //       console.log(e);
  //     })







      // fetch('https://dev.blackandfield.com/embroider/wp-json/wp/v2/question/?per_page=100&categories=2&order=asc').then(response => response.json())
      //   .then(data => {

      //     for (let question in data) {
      //       values.push(0);
      //     }
      //     this.setState({ data, questionValues: values, sections })
      //   });

      const $this = this;

      // Papa.parse('/country-data.csv', {
      //   download: true,
      //   header: true,
      //   complete: function (results) {
      //     // console.log(results);
      //     const cultures = $this.findAllUniqueCultures(results.data);
      //     $this.setState({ countries: results.data, cultures  });
      //   }
      // });

  // sockets.on('connect', () => {

  //   sockets.on('stateChange', (data) => {
  //     this.setState({data})
  //   })
  // })
}



  render() {

    return (
      <div className="wrap max-w-full flex flex-row flex-nowrap gap-x-12 relative items-start bg-slate-800">

        {/*  svgOut={(svgdata) => this.handleSVG(svgdata)}  */}
        { (this.state.sections[this.state.currentSection] !== undefined) ?
          <div className="canvases w-full h-full flex flex-row flex-wrap relative pl-24 pr-24 pb-24 justify-center">
            {/* <NewCanvas
              className={'w-full h-96 origin-top-left'}
              origin={this.state.origin}
              residence={this.state.residence}
              livingdata={this.state.sections[0].questionValues}
              sections={this.state.sections}
              questionvalues={this.state.sections[this.state.currentSection].questionValues}
              width="100%"
              height="auto"
              stitch='x' /> */}
            <div className="canvasesInner w-1/2 ">
              <HomeCanvas
                  className={'h-80 w-full -mb-8'}
                  origin={this.state.origin}
                  residence={this.state.residence}
                  colors={this.palettes}
                  data={this.state.sections[0] !== undefined ? this.state.sections[0].questionValues : [0,0,0,0,0,0,0] }
                  sections={this.state.sections}
                  questionvalues={this.state.sections[this.state.currentSection].questionValues}
                  width="100%"
                  height="auto"
                  stitch='x' />
              <WorkCanvas
                className={' h-80 w-full'}
                origin={this.state.origin}
                residence={this.state.residence}
                colors={this.palettes}
                data={this.state.sections[1] !== undefined ? this.state.sections[1].questionValues : [0,0,0,0,0,0,0] }
                sections={this.state.sections}
                width="100%"
                height="auto"
                stitch='x' />
              <PartnerCanvas
                className={' h-72 w-full -mb-16 -mt-10'}
                origin={this.state.origin}
                residence={this.state.residence}
                colors={this.palettes}
                data={this.state.sections[2] !== undefined ? this.state.sections[2].questionValues : [1,0,0,0,0,0,0] }
                sections={this.state.sections}
                width="100%"
                height="auto"
                stitch='x' />
              <RelationshipCanvas
                className={'h-72 w-full -mt-20'}
                origin={this.state.origin}
                residence={this.state.residence}
                colors={this.palettes}
                data={this.state.sections[2] !== undefined ? this.state.sections[2].questionValues : [1,0,0,0,0,0,0] }
                sections={this.state.sections}
                width="100%"
                height="auto"
                stitch='x' />
            </div>
            <div className="canvasesInner w-1/2 h-full right-0 top-36 absolute">
              <LivingCanvas
                  className={ this.state.rotate ? 'h-80 w-extra translate-y-72 -translate-x-20 rotate-90' : 'h-80 w-extra'}
                  origin={this.state.origin}
                  residence={this.state.residence}
                  colors={this.palettes}
                  data={this.state.sections[0] !== undefined ? this.state.sections[0].questionValues : [0,0,0,0,0,0,0] }
                  sections={this.state.sections}
                  questionvalues={this.state.sections[this.state.currentSection].questionValues}
                  width="100%"
                  height="auto"
                stitch='x' />
            </div>
            <div className="canvasesInner w-1/2 h-full left-0 top-36 absolute">
              <LivingCanvas
                  className={ this.state.rotate ? 'h-80 w-extra translate-y-72 -translate-x-72 rotate-90' : 'h-80 w-extra'}
                  origin={this.state.origin}
                  residence={this.state.residence}
                  colors={this.palettes}
                  data={this.state.sections[0] !== undefined ? this.state.sections[0].questionValues : [0,0,0,0,0,0,0] }
                  sections={this.state.sections}
                  questionvalues={this.state.sections[this.state.currentSection].questionValues}
                  width="100%"
                  height="auto"
                stitch='x' />
            </div>


          </div>
          : ''}
        </div>
    )
  }
}

export default Symbol;