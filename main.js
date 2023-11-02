const d = document,
  $menuBtn = d.querySelector(".menu-btn"),
  $menuNav = d.querySelector(".menu-mobile_nav"),
  $iconsMenu = d.querySelectorAll(".menu-mobile_nav a"),
  $mobile = d.querySelector(".menu-mobile");

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
