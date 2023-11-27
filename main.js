const d = document,
  $menuBtn = d.querySelector(".menu-btn"),
  $menuNav = d.querySelector(".menu-mobile_nav"),
  $iconsMenu = d.querySelectorAll(".menu-mobile_nav a"),
  $mobile = d.querySelector(".menu-mobile"),
  $header = d.querySelector(".header"),
  $sections = d.querySelectorAll("section"),
  $navLinks = d.querySelectorAll(".desk a"),
  $form = d.querySelector(".form");

window.addEventListener("scroll", () => {
  let scrollY = window.scrollY;
  if (scrollY < 100) {
    $mobile.style.display = "none";
    $menuNav.classList.remove("open-menu");
    $menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    $menuBtn.style.backgroundColor = "#f15906";
  } else {
    $mobile.style.display = "block";
  }

  if (scrollY > 80) {
    $header.classList.add("sticky");
  } else {
    $header.classList.remove("sticky");
  }

  // scroll sections
  $sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      $navLinks.forEach((link) => {
        link.classList.remove("active");
        d.querySelector(`.desk a[href*="${id}"]`).classList.add("active");
      });
    }
  });
});

// funcionamiento del menú versión movil
$menuBtn.addEventListener("click", (e) => {
  $menuNav.classList.toggle("open-menu");
  if ($menuNav.classList.contains("open-menu")) {
    $menuBtn.innerHTML = '<i class="fa-solid fa-x"></i>';
    $menuBtn.style.backgroundColor = "red";
  } else {
    $menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    $menuBtn.style.backgroundColor = "#f15906";
  }
});

$iconsMenu.forEach(($icon) => {
  $icon.addEventListener("click", (e) => {
    $menuNav.classList.remove("open-menu");
    $menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    $menuBtn.style.backgroundColor = "#f15906";
  });
});

// Envío de formulario
const $inputs = d.querySelectorAll(".form [required]");
$inputs.forEach((input) => {
  const $span = d.createElement("span");
  $span.id = input.name;
  $span.textContent = input.title;
  $span.classList.add("form-error", "none");

  input.insertAdjacentElement("afterend", $span);
});

d.addEventListener("keyup", (e) => {
  if (e.target.matches(".form [required]")) {
    let $input = e.target,
      pattern = $input.pattern || $input.dataset.pattern;

    if (pattern) {
      let regex = new RegExp(pattern);

      return !regex.test($input.value)
        ? d.getElementById($input.name).classList.add("is-active")
        : d.getElementById($input.name).classList.remove("is-active");
    }
  }
});

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  const $loader = d.querySelector(".form-loader");
  const $response = d.querySelector(".form-response");
  $loader.classList.remove("none");

  fetch("https://formsubmit.co/ajax/portfolio@jhonnycubillos.online", {
    method: "POST",
    body: new FormData(e.target),
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      console.log(json);
      $loader.classList.add("none");
      $response.classList.remove("none");
      $form.reset();
    })
    .catch((err) => {
      console.log(err);
      let message =
        err.statusText ||
        "Ocurrió un error al enviar el mensaje, intenta nuevamente";
      $response.innerHTML = `<p>Error ${err.status} : ${message}</p>`;
    })
    .finally(() =>
      setTimeout(() => {
        $response.classList.add("none");
        $response.innerHTML = "";
      }, 3000)
    );
});
