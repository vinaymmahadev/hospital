

document.addEventListener('DOMContentLoaded', function () {
  const dropdownTriggers = document.querySelectorAll('.toggle-dropdown');

  dropdownTriggers.forEach(trigger => {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();  

      const dropdown = this.nextElementSibling;

    
      document.querySelectorAll('.dropdown-content.show, .sub-dropdown-content.show').forEach(openDropdown => {
        if (openDropdown !== dropdown) {
          openDropdown.classList.remove('show');
        }
      });

    
      if (dropdown) {
        dropdown.classList.toggle('show');
      }
    });
  });

 
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.dropdown') && !e.target.closest('.sub-dropdown')) {
      document.querySelectorAll('.dropdown-content.show, .sub-dropdown-content.show').forEach(dropdown => {
        dropdown.classList.remove('show');
      });
    }
  });
});
