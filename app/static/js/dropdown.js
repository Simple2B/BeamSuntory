const dropdown = document.querySelectorAll(".dropdown-btn");
const dropdownContents = document.querySelectorAll(".dropdown-container");

dropdown.forEach(btn => {
  btn.addEventListener("click", () => {
    const dropdownContent = btn.nextElementSibling;
    const dropdownArrow = btn.lastElementChild;
    const isClose = dropdownContent.classList.contains('dropdown-close');

    btn.classList.toggle("bg-red-600");

    dropdown.forEach(otherBtn => {
      if (otherBtn !== btn) {
        const otherContent = otherBtn.nextElementSibling;
        const otherArrow = otherBtn.lastElementChild;

        otherContent.classList.remove('dropdown-open');
        otherContent.classList.add('dropdown-close');
        otherBtn.classList.add("dark:hover:bg-gray-700");
        otherBtn.classList.add("hover:bg-gray-100");
        otherBtn.classList.remove("bg-red-600");
        otherArrow.style.transform = 'rotate(0)';
      }
    });

    if (isClose) {
      dropdownContent.classList.remove('dropdown-close')
      dropdownContent.classList.add('dropdown-open')
      btn.classList.remove("dark:hover:bg-gray-700");
      btn.classList.remove("hover:bg-gray-100");
      dropdownArrow.style.transition = 'all 0.5s'
      dropdownArrow.style.transform = 'rotate(90deg)'
    } else {
      dropdownContent.classList.remove('dropdown-open')
      dropdownContent.classList.add('dropdown-close')
      btn.classList.add("dark:hover:bg-gray-700");
      btn.classList.add("hover:bg-gray-100");
      dropdownArrow.style.transform = 'rotate(0)'
    }
  })
})
