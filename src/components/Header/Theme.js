const Theme = function () {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
      return true;
    } else {
      document.documentElement.classList.remove("dark");
      return false;
    }
  };
  
  const ThemeToggle = function () {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      return false;
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      return true;
    }
  };
  
  const ToggleCheck = function () {
    const toggle = document.getElementById("toggle");
    if (toggle.checked) {
      ThemeToggle();
    } else {
      ThemeToggle();
    }
  };
  
  window.addEventListener("click", function (e) {
    const setting = document.getElementById("settings");
    if (document.getElementById("gear").contains(e.target)) {
      if (setting.style.display === "block") {
        setting.style.display = "none";
      } else {
        setting.style.display = "block";
      }
      // Clicked in box
    } else if (document.getElementById("settings").contains(e.target)) {
    } else {
      setting.style.display = "none";
      // Clicked outside the box
    }
  });
  // eslint-disable-next-line import/no-anonymous-default-export
  export default { Theme, ThemeToggle, ToggleCheck };
  