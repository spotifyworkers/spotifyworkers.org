document.addEventListener("DOMContentLoaded", () => {
  const headerButton = document.querySelector(".header-button")
  const burgerMenu = document.querySelector(".burger-menu")

  headerButton.addEventListener("click", () => {
    const oldValue = headerButton.getAttribute("aria-expanded")
    const newValue = oldValue == "true" ? "false" : "true"
    let trap

    function escapeToClose(event) {
      if (event.key === "Escape") {
        closeBurgerMenu()
      }
    }

    function openBurgerMenu() {
      window.scrollTo({ top: 0 })
      burgerMenu.classList.add("burger-menu--open")
      window.untrapFocus = trapFocus(burgerMenu)
      document.body.style.overflow = "hidden"
      document.addEventListener("keydown", escapeToClose)
      headerButton.setAttribute("aria-expanded", "true")
    }

    function closeBurgerMenu() {
      burgerMenu.classList.remove("burger-menu--open")
      window.untrapFocus()
      document.body.style.overflow = "auto"
      document.removeEventListener("keydown", escapeToClose)
      headerButton.setAttribute("aria-expanded", "false")
    }

    if (newValue === "true") {
      openBurgerMenu()
    } else {
      closeBurgerMenu()
    }
  })
})

function trapFocus(element, prev = document.activeElement) {
  const focusableElements = getKeyboardFocusableElements(element)
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]
  let currentFocus = null

  firstElement.focus();
  currentFocus = firstElement;

  const handleFocus = e => {
    e.preventDefault();
    if (focusableElements.includes(e.target)) {
      currentFocus = e.target;
    } else {
      if (currentFocus === firstElement) {
        lastElement.focus();
      } else {
        firstElement.focus();
      }
      currentFocus = document.activeElement;
    }
  };

  document.addEventListener("focus", handleFocus, true)

  return () => {
    document.removeEventListener("focus", handleFocus, true);
    prev.focus();
  }
};

function getKeyboardFocusableElements (element = document) {
  return [
    ...element.querySelectorAll(
      'a[href], button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])'
    )
  ].filter(
    el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
  )
}