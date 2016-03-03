var indexConfig = {
  "general": {
    "defaultHost": "http://toto.fr"
  },
  "logger": {
    "prefixPattern": "fiburo [%3$s] - %2$s - %1$s => ",
    "datetimePattern": "YYYY-MM-DDTHH:mm:ssZ",
    "logLevels": {
      "app.httpcalls": "TRACE",
      "app.home": "TRACE",
      "app": "TRACE",
      "*": "ERROR"
    }
  },
  "httpcalls": {
    "githubApiBase": "https://api.github.com",
    "gericoApiBase": "http://localhost:18080/gerico/api/v1",
    "analyseApiBase": "http://localhost:18080/analyse/api/v1",
    "timestampMarker": true,
    "override": true,
    "httpGet": {
      "override": true,
      "configs": [
        {
          "rank": 1,
          "override": true,
          "pathParams": true,
          "origin": {
            "protocol": "http",
            "host": "localhost",
            "port": "18080",
            "endpoint": "gerico/api/v1/entreprise/entites-juridiques/{idej}/contacts",
            "pathParams": [
              {
                "id": 1,
                "key": "{idej}",
                "slashNumberBefore": 8
              }
            ]
          },
          "target": {
            "protocol": "http",
            "host": "localhost",
            "port": "28080",
            "endpoint": "ficonef/api/v1/entreprise/entites-juridiques/{idej}/contacts",
            "pathParams": [
              {
                "id": 1,
                "idOrigin": 1,
                "key": "{idej}",
                "slashNumberBefore": 8
              }
            ]
          }
        },
        {
          "rank": 2,
          "override": true,
          "pathParams": true,
          "origin": {
            "protocol": "http",
            "host": "localhost",
            "port": "18080",
            "endpoint": "gerico/api/v1/entreprise/entites-juridiques/{idej}/contacts/{idcontact}",
            "pathParams": [
              {
                "id": 1,
                "key": "{idej}",
                "slashNumberBefore": 8
              },
              {
                "id": 2,
                "key": "{idcontact}",
                "slashNumberBefore": 10
              }
            ]
          },
          "target": {
            "protocol": "http",
            "host": "localhost",
            "port": "28080",
            "endpoint": "ficonef/api/v1/entreprise/entites-juridiques/{idej}/contacts/{idcontact}",
            "pathParams": [
              {
                "id": 1,
                "idOrigin": 1,
                "key": "{idej}",
                "slashNumberBefore": 8
              },
              {
                "id": 2,
                "idOrigin": 2,
                "key": "{idcontact}",
                "slashNumberBefore": 10
              }
            ]
          }
        },
        {
          "rank": 3,
          "override": true,
          "pathParams": true,
          "origin": {
            "protocol": "http",
            "host": "localhost",
            "port": "18080",
            "endpoint": "analyse/api/v1/entreprise/entites-juridiques/{idej}/cotation-simplifiee",
            "pathParams": [
              {
                "id": 1,
                "key": "{idej}",
                "slashNumberBefore": 8
              }
            ]
          },
          "target": {
            "protocol": "http",
            "host": "localhost",
            "port": "28080",
            "endpoint": "ficonef/api/v1/entreprise/entites-juridiques/{idej}/cotation-simplifiee",
            "pathParams": [
              {
                "id": 1,
                "idOrigin": 1,
                "key": "{idej}",
                "slashNumberBefore": 8
              }
            ]
          }
        },
        {
          "rank": 4,
          "override": true,
          "pathParams": false,
          "origin": {
            "protocol": "http",
            "host": "localhost",
            "port": "18080",
            "endpoint": "analyse/api/v1/entreprise/synthese",
          },
          "target": {
            "protocol": "http",
            "host": "localhost",
            "port": "18080",
            "endpoint": "ficonef-ws-common/api/v1/commons/entreprise/synthese"
          }
        }
      ]
    },
    "httpPost": {
      "override": false
    },
    "httpPut": {
      "override": false
    },
    "httpDelete": {
      "override": false
    }
  }
};
