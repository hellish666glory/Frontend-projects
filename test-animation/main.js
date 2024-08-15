document.addEventListener("DOMContentLoaded", function() {
    const flags = document.querySelectorAll(".flag");
    flags.forEach((flag, index) => {
      setTimeout(() => {
        flag.style.transform = `translate(${Math.cos(2 * Math.PI * index / flags.length) * 150}px, ${Math.sin(2 * Math.PI * index / flags.length) * 150}px) rotate(${index * (360 / flags.length)}deg)`;
      }, index * 200); // Stagger the appearance
    });
  });
  