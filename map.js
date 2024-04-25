 // Initialize and add the map
  let map;

  async function initMap() {
    // Position de REIMS
    const position = { lat: 49.255973, lng: 4.026451 };

    // Demande des bibliothèques nécessaires.
    const { Map } = await google.maps.importLibrary("maps");

    // La carte, centrée sur REIMS
    map = new Map(document.getElementById("map"), {
      zoom: 16,
      center: position,
      mapId: "DEMO_MAP_ID",
    });

    // Le marqueur, positionné à REIMS
    const marker = new google.maps.Marker({
      map: map,
      position: position,
      title: "L'Ernest Café",
    });
  }

  initMap();