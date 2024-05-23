document.addEventListener("DOMContentLoaded", function () {
  let carousel = document.querySelector("#carousel");
  let items = carousel.querySelectorAll(".item");

  let carouselImage = carousel.querySelector("img");
  let carouselCaption = carousel.querySelector("figcaption");

  let drinks = [];
  let carouselIndex = 0;
  let currentCarouselItem = null;
  let drinkCarousel = [
    {
      name: "Bières",
      image: "img/caroussel/biere.png",
      caption: "Nos bières",
    },
    {
      name: "Café",
      image: "img/caroussel/cafe.png",
      caption: "Nos cafés",
    },
    {
      name: "Cocktails",
      image: "img/caroussel/cocktail.png",
      caption: "Nos Cocktails",
    },
    {
      name: "Soft",
      image: "img/caroussel/softs.png",
      caption: "Nos Softs",
    },
    {
      name: "Vins",
      image: "img/caroussel/vin.png",
      caption: "Nos Vins",
    },
    {
      name: "Liqueurs",
      image: "img/caroussel/liqueur.png",
      caption: "Nos Liqueurs",
    },
    {
      name: "Whisky",
      image: "img/caroussel/whisky.png",
      caption: "Nos Whisky",
    },
  ];

  // Fonction pour afficher les boissons filtrées dans le DOM
  function displayCategory(category) {
    const drinkIndex = drinkCarousel.findIndex((drink) => {
      return drink.name == category;
    });

    if (drinkIndex !== -1) {
      carouselIndex = drinkIndex;
      highlightMenuItem(drinkIndex);
      updateCarousel();
    }

    let filteredDrinks = drinks.filter((drink) => {
      return drink.categorie == category;
    });

    const displayArea = document.getElementById("displayArea");
    displayArea.innerHTML = ""; // Effacer les résultats précédents

    if (filteredDrinks.length === 0) {
      displayArea.innerHTML =
        "<p>Aucune boisson disponible dans cette catégorie.</p>";
    } else {
      filteredDrinks.forEach((drink) => {
        const drinkDiv = document.createElement("div");
        drinkDiv.className = "drink";
        drinkDiv.innerHTML = `
                  
                  <br>${drink.nom}<br>
                  <br>${drink.compositions.join(", ")}<br>
                  <br>${drink.contenance}<br>
                  <br>${drink.price} <br>`;

        if (drink.degre !== 0) {
          drinkDiv.innerHTML += `
                      Degré : ${drink.degre}°<br></br>
                      `;
        }

        displayArea.appendChild(drinkDiv);
      });
    }
  }

  function updateCarousel() {
    currentCarouselItem = drinkCarousel[carouselIndex];
    carouselImage.src = currentCarouselItem.image;
    carouselCaption.textContent = currentCarouselItem.caption;
    highlightMenuItem(carouselIndex);
  }

  function nextCarouselItem() {
    carouselIndex = (carouselIndex + 1) % drinkCarousel.length;
    updateCarousel();
    displayCategory(currentCarouselItem.name);
    highlightMenuItem(carouselIndex);
  }

  function previousCarouselItem() {
    if (carouselIndex == 0) carouselIndex = drinkCarousel.length - 1;
    else carouselIndex--;
    updateCarousel();
    displayCategory(currentCarouselItem.name);

    highlightMenuItem(carouselIndex);
  }

  function highlightMenuItem(index) {
    let buttonItem = document.querySelectorAll(".button-item");
    buttonItem.forEach((item, i) => {
      if (i === index) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  items.forEach((_, index) => {
    let menuItem = document.createElement("div");
    menuItem.className = "menu-items";
    menuItem.textContent = index + 1;
    menuItem.addEventListener("click", () => {
      showItem(index);
    });
    carousel.appendChild(menuItem);
  });

  let buttons = document.querySelectorAll(".button-item");
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      let category = button.getAttribute("data-category");
      displayCategory(category);
    });
  });

  function showItem(index) {
    carouselIndex = index;
    updateCarousel();
  }

  document.querySelector(".prev").addEventListener("click", () => {
    previousCarouselItem();
  });

  document.querySelector(".next").addEventListener("click", () => {
    nextCarouselItem();
  }),
    fetch("/ernest/drinks.json")
      .then((r) => {
        return r.json();
      })
      .then((jsonData) => {
        drinks = jsonData.drinks;
        updateCarousel();
        displayCategory(currentCarouselItem.name);
      });
});
