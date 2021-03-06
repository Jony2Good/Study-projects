// serch buttons

function setSearch(params) {
  const openBtn = document.querySelector(`.${params.openBtnClass}`);
  const search = document.querySelector(`.${params.searchClass}`);
  const closeBtn = search.querySelector(`.${params.closeBtnClass}`);

  search.addEventListener("animationend", function (evt) {
    if (this._isOpened) {
      this.classList.remove(params.activeClass);
      this.classList.remove(params.hiddenClass);
      this._isOpened = false;
    } else {
      this._isOpened = true;
    }
  });

  search.addEventListener("click", function (evt) {
    evt._isSearch = true;
  });

  openBtn.addEventListener("click", function (evt) {
    this.disabled = true;
    this.style.opacity = 0;

    if (
      !search.classList.contains(params.activeClass) &&
      !search.classList.contains(params.hiddenClass)
    ) {
      search.classList.add(params.activeClass);
    }
  });

  closeBtn.addEventListener("click", function () {
    openBtn.disabled = false;
    openBtn.style.opacity = "";
    search.classList.add(params.hiddenClass);
  });

  document.body.addEventListener("click", function (evt) {
    if (!evt._isSearch && search._isOpened) {
      openBtn.disabled = false;
      openBtn.style.opacity = "";
      search.classList.add(params.hiddenClass);
    }
  });
}

setSearch({
  openBtnClass: "js-open-search", // класс кнопки открытия
  closeBtnClass: "js-close", // класс кнопки закрытия
  searchClass: "js-form", // класс формы поиска
  activeClass: "is-opened", // класс открытого состояния
  hiddenClass: "is-closed", // класс закрывающегося состояния (удаляется сразу после закрытия)
});

// burger and scroll common code

// burger menu

function setBurger(params) {
  const btn = document.querySelector(`.${params.btnClass}`);
  const menu = document.querySelector(`.${params.menuClass}`);
  const links = menu.querySelectorAll(`.${params.linksClass}`);

  function onBtnClick() {
    if (window.getWindowWidth() <= window.TABLET_WIDTH) {
      btn.classList.toggle(params.activeClass);

      if (
        !menu.classList.contains(params.activeClass) &&
        !menu.classList.contains(params.hiddenClass)
      ) {
        menu.classList.add(params.activeClass);
        document.body.style.overflow = "hidden";
      } else {
        menu.classList.add(params.hiddenClass);
        document.body.removeAttribute("style");
        btn.classList.toggle(params.hiddenClass);
      }
    }
  }

  menu.addEventListener("animationend", function () {
    if (this.classList.contains(params.hiddenClass)) {
      this.classList.remove(params.activeClass);
      this.classList.remove(params.hiddenClass);
      btn.classList.remove(params.hiddenClass);
    }
  });

  btn.addEventListener("click", window.debounce(onBtnClick, 500));
  links.forEach((link) => {
    link.addEventListener("click", window.debounce(onBtnClick, 500));
  });
}

// здесь мы вызываем функцию и передаем в нее классы наших элементов
setBurger({
  btnClass: "js-burger", // класс бургера
  menuClass: "js-menu", // класс меню
  activeClass: "is-opened", // класс открытого состояния
  hiddenClass: "is-closed", // класс закрывающегося состояния (удаляется сразу после закрытия)
  linksClass: "js-menu-link",
});

function debounce(f, ms) {
  let isCooldown = false;

  return function () {
    if (isCooldown) return;

    f.apply(this, arguments);

    isCooldown = true;

    setTimeout(() => (isCooldown = false), ms);
  };
}

window.debounce = debounce;

// smooth scroll

const MOBILE_WIDTH = 580;
const TABLET_WIDTH = 1280;

function scrollToContent(link, isMobile) {
  if (isMobile && window.getWindowWidth() > window.MOBILE_WIDTH) {
    return;
  }

  const href = link.getAttribute("href").substring(1);
  const scrollTarget = document.getElementById(href);
  const elementPosition = scrollTarget.getBoundingClientRect().top;

  window.scrollBy({
    top: elementPosition,
    behavior: "smooth",
  });
}

document.querySelectorAll(".js-scroll-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    scrollToContent(this, false);
  });
});

function getWindowWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.body.clientWidth,
    document.documentElement.clientWidth
  );
}

window.getWindowWidth = getWindowWidth;
window.MOBILE_WIDTH = MOBILE_WIDTH;
window.TABLET_WIDTH = TABLET_WIDTH;

// dropdown

const params = {
  btnClassName: "js-header-dropdown-btn",
  dropClassName: "js-header-drop",
  activeClassName: "is-active",
  disabledClassName: "is-disabled",
};

function onDisable(evt) {
  if (evt.target.classList.contains(params.disabledClassName)) {
    evt.target.classList.remove(
      params.disabledClassName,
      params.activeClassName
    );
    evt.target.removeEventListener("animationend", onDisable);
  }
}

function setMenuListener() {
  document.body.addEventListener("click", (evt) => {
    const activeElements = document.querySelectorAll(
      `.${params.btnClassName}.${params.activeClassName}, .${params.dropClassName}.${params.activeClassName}`
    );

    if (
      activeElements.length &&
      !evt.target.closest(`.${params.activeClassName}`)
    ) {
      activeElements.forEach((current) => {
        if (current.classList.contains(params.btnClassName)) {
          current.classList.remove(params.activeClassName);
        } else {
          current.classList.add(params.disabledClassName);
        }
      });
    }

    if (evt.target.closest(`.${params.btnClassName}`)) {
      const btn = evt.target.closest(`.${params.btnClassName}`);
      const path = btn.dataset.path;
      const drop = document.querySelector(
        `.${params.dropClassName}[data-target="${path}"]`
      );

      btn.classList.toggle(params.activeClassName);

      if (!drop.classList.contains(params.activeClassName)) {
        drop.classList.add(params.activeClassName);
        drop.addEventListener("animationend", onDisable);
      } else {
        drop.classList.add(params.disabledClassName);
      }
    }
  });
}

setMenuListener();

// swiper hero

const swiper = new Swiper(".swiper-container", {
  allowTouchMove: false,
  loop: true,
  effect: "fade",
  speed: 10000,
  autoplay: {
    delay: 10000,
  },
});

// gallery select

const element = document.querySelector("#select");
const choices = new Choices(element, {
  searchEnabled: false,
  itemSelectText: "",
  sorter: () => {},
  resetScrollPosition: false,
  placeholder: true,
});

// gallery

const gallerySlider = new Swiper(".gallery__swiper-container", {
  pagination: {
    el: ".gallery__pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".gallery__btn-next",
    prevEl: ".gallery__btn-prev",
  },
  a11y: {
    prevSlideMessage: "Предыдущие слайды",
    nextSlideMessage: "Следующие слайды",
  },
  slidesPerView: 1,
  grid: {
    rows: 1,
    fill: "row",
  },

  spaceBetween: 10,
  speed: 800,

  breakpoints: {
    440: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      grid: {
        rows: 1,
      },
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      grid: {
        rows: 1,
      },
      spaceBetween: 38,
    },
    1024: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      grid: {
        rows: 1,
      },
      spaceBetween: 34,
    },
    1440: {
      loop: false,
      slidesPerView: 3,
      slidesPerGroup: 3,
      grid: {
        rows: 1,
      },
      spaceBetween: 50,
      speed: 600,
    },
  },
});

// accordion section

(() => {
  new Accordion(".js-accordion-container", {
    openOnInit: [0],
    collapsible: true,
    active: 0,
    icons: false,
    heightStyle: "content",
  });
})();

(() => {
  function setTabs(dataPath, dataTarget) {
    const btns = document.querySelectorAll(`.js-tab-btn[${dataPath}]`);
    const contents = document.querySelectorAll(
      `.js-tab-content[${dataTarget}]`
    );

    btns.forEach((btn) => {
      btn.addEventListener("click", function (evt) {
        evt.preventDefault();
        const path = this.getAttribute(dataPath);
        console.log(path);
        const target = document.querySelector(
          `.js-tab-content[${dataTarget}="${path}"]`
        );

        btns.forEach((currentBtn) => {
          currentBtn.classList.remove("tab-active");
        });

        this.classList.add("tab-active");

        contents.forEach((content) => {
          content.classList.remove("tab-active");
        });

        target.classList.add("tab-active");
      });
    });
  }

  setTabs("data-painter-btn", "data-painter-content");
})();

// events section

const eventsSlider = new Swiper(".js-events-slider", {
  pagination: {
    el: ".js-events-pagination",
  },
  navigation: {
    nextEl: ".js-events-next",
    prevEl: ".js-events-prev",
    disabledClass: "nav-btn--disabled",
  },
  a11y: {
    prevSlideMessage: "Предыдущие слайды",
    nextSlideMessage: "Следующие слайды",
  },
  slidesPerView: 1,
  spaceBetween: 20,
  speed: 800,

  grid: {
    rows: 1,
    fill: "row",
  },

  breakpoints: {
    610: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      grid: {
        rows: 1,
      },
      spaceBetween: 34,
    },
    970: {
      slidesPerView: 3,
      slidesPerGroup: 2,
      grid: {
        rows: 1,
      },
      spaceBetween: 27,
    },
    1280: {
      loop: false,
      slidesPerView: 3,
      slidesPerGroup: 2,
      grid: {
        rows: 1,
      },
      spaceBetween: 50,
      speed: 600,
    },
  },
});

// tooltip

tippy(".js-tooltip-btn", {
  theme: "toltip-content",
  allowHTML: true,
  maxWidth: 280,
  arrow: true,
  duration: 50,
});

const projectsSwiper = new Swiper(".js-projects-slider", {
  navigation: {
    nextEl: ".js-projects-next",
    prevEl: ".js-projects-prev",
  },
  a11y: {
    prevSlideMessage: "Предыдущие слайды",
    nextSlideMessage: "Следующие слайды",
  },

  slidesPerView: 1,
  grid: {
    rows: 1,
    fill: "row",
  },

  slidesPerGroup: 1,
  spaceBetween: 15,
  speed: 800,

  breakpoints: {
    441: {
      slidesPerView: 1,
      spaceBetween: 14,
    },
    611: {
      slidesPerView: 2,
      spaceBetween: 34,
    },
    971: {
      slidesPerView: 2,
      spaceBetween: 50,
    },
    1281: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },
});

// MAP

ymaps.ready(init);

function init() {
  var myMap = new ymaps.Map(
    "map",
    {
      center: [55.758468, 37.601088],
      zoom: 14,
      controls: ["geolocationControl", "zoomControl"],
    },
    {
      suppressMapOpenBlock: true,
      geolocationControlSize: "large",
      geolocationControlFloat: "none",
      geolocationControlPosition: { top: "350px", right: "10px" },
      zoomControlSize: "small",
      zoomControlFloat: "none",
      zoomControlPosition: { top: "260px", right: "10px" },
    }
  );

  // Создание геообъекта с типом точка (метка).
  var myGeoObject = new ymaps.GeoObject({
    geometry: {
      type: "Point", // тип геометрии - точка
      coordinates: [55.75846806898367, 37.60108849999989], // координаты точки
    },
  });

  var myPlacemark = new ymaps.Placemark(
    [55.75846806898367, 37.60108849999989],
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "img/map-icon.svg",
      iconImageSize: [20, 20],
      iconImageOffset: [-10, -20],
    }
  );

  // Размещение геообъекта на карте.
  // myMap.geoObjects.add(myGeoObject);
  myMap.geoObjects.add(myPlacemark);
  myMap.behaviors.disable("scrollZoom");
  myMap.behaviors.disable("drag");
}

// validation form

var inputTel = document.querySelectorAll("input[type='tel']");
var im = new Inputmask("+7 (999) 999-99-99");
im.mask(inputTel);

const validation = new JustValidate("#form");

validation
  .addField("#name", [
    {
      rule: "minLength",
      value: 3,
      errorMessage: "Имя должно содержать минимум 3 символа",
    },
    {
      rule: "maxLength",
      value: 30,
    },
    {
      rule: "required",
      errorMessage: "Укажите ваше имя",
    },
  ])
  .addField("#tel", [
    {
      rule: "required",
      errorMessage: "Укажите ваш телефон",
    },
    {
      rule: "minLength",
      value: 10,
      errorMessage: "Недопустимый формат",
    },
  ]);

  const modal = new GraphModal();
