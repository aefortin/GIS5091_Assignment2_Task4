require([
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/ImageryLayer",
        "esri/layers/support/RasterFunction"
      ], (Map, MapView, ImageryLayer, RasterFunction) => {
        /***************************************
         * Set up popup template of image layer
         **************************************/

        const imagePopupTemplate = {
          // autocasts as new PopupTemplate()
          title: "Data from {SensorName} satellite",
          content: `
            Rendered RGB values: <b>{Raster.ServicePixelValue} </b>
            <br>Original values (B, G, R, NIR): <b>{Raster.ItemPixelValue} </b>
            `
        };

        /*******************************************************************
         * Create image layer with server defined raster function templates
         ******************************************************************/

        const serviceRFT = new RasterFunction({
          functionName: "MidwestFalseColor",
          variableName: "Raster"
        });

        const layer = new ImageryLayer({
          url: "https://landsat2.arcgis.com/arcgis/rest/services/Landsat8_Views/ImageServer",
          rasterFunction: "NDVI Colorized",
          popupTemplate: imagePopupTemplate
        });

        /*************************
         * Add image layer to map
         ************************/

        const map = new Map({
          basemap: "hybrid",
          layers: [layer]
        });

        const view = new MapView({
          container: "viewDiv",
          map: map,
          center: {
            // autocasts as esri/geometry/Point
            x: -9972028.7047,
            y: 4813697.1152,
            spatialReference: 3857
          },
          zoom: 9,
          popup: {
            actions: []
          }
        });
      });
