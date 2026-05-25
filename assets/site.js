(function () {
  const waBase = "https://wa.me/529982053527?text=";
  const html = document.documentElement;
  const language = html.lang === "es-MX" || html.lang === "es" ? "es" : "en";

  document.querySelectorAll(".js-wa").forEach((link) => {
    const message = link.dataset[language === "es" ? "messageEs" : "messageEn"] || link.dataset.message || "";
    link.href = waBase + encodeURIComponent(message);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  const filterButtons = document.querySelectorAll("[data-filter]");
  const packageCards = document.querySelectorAll("[data-route]");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      packageCards.forEach((card) => {
        card.classList.toggle("is-hidden", filter !== "all" && card.dataset.route !== filter);
      });
    });
  });

  const mapCard = document.getElementById("map-card");
  const mapSrc = "https://www.google.com/maps?q=Kin-Ha%20Cenote%2C%20Ruta%20de%20los%20Cenotes%2C%20Puerto%20Morelos&output=embed";
  const loadMap = () => {
    if (!mapCard || mapCard.dataset.mapLoaded === "true") return;
    const iframe = document.createElement("iframe");
    iframe.className = "map-frame";
    iframe.title = language === "es" ? "Mapa de la Ruta Kin-Ha en Puerto Morelos" : "Map of the Kin-Ha Route in Puerto Morelos";
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.src = mapSrc;
    mapCard.replaceChildren(iframe);
    mapCard.dataset.mapLoaded = "true";
  };

  document.querySelectorAll("#load-map, [data-map-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", loadMap);
  });

  if ("IntersectionObserver" in window && mapCard) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        loadMap();
        observer.disconnect();
      }
    }, { rootMargin: "260px" });
    observer.observe(mapCard);
  }
})();
