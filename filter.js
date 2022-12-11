const data = [
  {
    id: 1,
    name: "Invicta Men's Pro Diver",
    img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
    price: 74,
    cat: "Dress",
  },
  {
    id: 11,
    name: "Invicta Men's Pro Diver 2",
    img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
    price: 74,
    cat: "Dress",
  },
  {
    id: 2,
    name: "Timex Men's Expedition Scout ",
    img: "https://m.media-amazon.com/images/I/91WvnZ1g40L._AC_UY879_.jpg",
    price: 40,
    cat: "Sport",
  },
  {
    id: 3,
    name: "Breitling Superocean Heritage",
    img: "https://m.media-amazon.com/images/I/61hGDiWBU8L._AC_UY879_.jpg",
    price: 200,
    cat: "Luxury",
  },
  {
    id: 4,
    name: "Casio Classic Resin Strap ",
    img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
    price: 16,
    cat: "Sport",
  },
  {
    id: 5,
    name: "Garmin Venu Smartwatch ",
    img: "https://m.media-amazon.com/images/I/51kyjYuOZhL._AC_SL1000_.jpg",
    price: 74,
    cat: "Casual",
  },
];

const searchInput = document.querySelector(".search");
const categoriesContainer = document.querySelector(".categories");
const priceSlider = document.querySelector(".priceSlider");
const priceText = document.querySelector(".priceText");
const productsContainer = document.querySelector(".products");

const priceList = data.map((item) => item.price);

const minPrice = Math.min(...priceList);
const maxPrice = Math.max(...priceList);

const displayProducts = (filteredData) => {
  productsContainer.innerHTML = filteredData
    .map(
      (item, i) =>
        `
    <div class="product">
            <img
              src="${item.img}"
              alt=""
            />
            <span class="productName">${item.name}</span>
            <span class="productPrice">$${item.price}</span>
          </div>
    `
    )
    .join("");
};

displayProducts(data);

searchInput.addEventListener("keyup", (event) => {
  const search = event.target.value.toLowerCase();
  search
    ? displayProducts(
        data.filter((item) => item.name.toLowerCase().indexOf(search) !== -1)
      )
    : displayProducts(data);
});

const setCategories = (data) => {
  const allCategories = ["All", ...new Set(data.map((item) => item.cat))];
  categoriesContainer.innerHTML = allCategories
    .map(
      (cat) =>
        `
  <span class="category">${cat}</span>
  `
    )
    .join("");
};

categoriesContainer.addEventListener("click", (event) => {
  const selectedCategory = event.target.textContent;
  selectedCategory === "All"
    ? displayProducts(data)
    : displayProducts(data.filter((item) => item.cat === selectedCategory));
});

const setPriceSlideText = (value) => {
  priceText.textContent = `$${value}`;
};

const setPriceSlider = () => {
  priceSlider.min = minPrice;
  priceSlider.max = maxPrice;
  priceSlider.value = maxPrice;
  setPriceSlideText(maxPrice);
  priceSlider.addEventListener("input", (event) => {
    const value = event.target.value;
    setPriceSlideText(value);
    displayProducts(data.filter((item) => item.price <= value));
  });
};

setPriceSlider();
setCategories(data);
