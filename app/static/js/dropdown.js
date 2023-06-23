const dropdown = document.querySelectorAll(".dropdown-btn");

dropdown.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("bg-red-600");
    const dropdownContent = btn.nextElementSibling;
    const dropdownArrow = btn.lastElementChild;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.transition = 'all 0.3s'
      dropdownArrow.style.transform = 'rotate(0)'
      dropdownArrow.style.transition = 'all 0.3s'
      dropdownContent.style.display = "none";
      btn.classList.add("dark:hover:bg-gray-700");
      btn.classList.add("hover:bg-gray-100");
    } else {
      dropdownContent.style.display = "block";
      dropdownArrow.style.transform = 'rotate(90deg)'
      btn.classList.remove("dark:hover:bg-gray-700");
      btn.classList.remove("hover:bg-gray-100");
      }
  })
})
