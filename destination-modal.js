document.addEventListener('DOMContentLoaded', () => {
  const modal = document.createElement('div');
  modal.className = 'destination-modal';
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <div class="destination-modal-backdrop" data-modal-close></div>
    <section class="destination-modal-panel" role="dialog" aria-modal="true" aria-labelledby="destination-modal-title">
      <button class="destination-modal-close" type="button" aria-label="Close destination details" data-modal-close>&times;</button>
      <h2 id="destination-modal-title"></h2>
      <div class="destination-modal-gallery">
        <div class="destination-modal-main-image" aria-label="Destination image placeholder"></div>
        <div class="destination-modal-thumbnails" aria-label="Destination image thumbnails">
          <button type="button" aria-label="Select image 1"></button>
          <button type="button" aria-label="Select image 2"></button>
          <button type="button" aria-label="Select image 3"></button>
        </div>
      </div>
      <p class="destination-modal-description"></p>
    </section>
  `;
  document.body.append(modal);

  const title = modal.querySelector('#destination-modal-title');
  const description = modal.querySelector('.destination-modal-description');
  const close = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  };

  document.querySelectorAll('.day-block li').forEach((card) => {
    const optional = card.querySelector('em');
    const destinationTitle = Array.from(card.childNodes)
      .filter((node) => node.nodeType === Node.TEXT_NODE)
      .map((node) => node.textContent.trim())
      .join(' ')
      .trim();

    card.textContent = '';
    const cardContent = document.createElement('div');
    cardContent.className = 'destination-card-content';
    cardContent.innerHTML = `
      <h4>${destinationTitle}</h4>
      <p>Explore Cebu and Bohol with our curated adventure tours and local experiences.</p>
    `;
    const more = document.createElement('button');
    more.className = 'destination-more';
    more.type = 'button';
    more.textContent = 'See more';
    cardContent.append(more);
    card.append(cardContent);

    if (optional) card.classList.add('has-optional');

    more.addEventListener('click', () => {
      title.textContent = destinationTitle;
      description.textContent = `Explore ${destinationTitle} with our curated adventure tour. Discover local attractions, scenic views, and memorable experiences during your Cebu and Bohol journey.`;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      modal.querySelector('.destination-modal-close').focus();
    });
  });

  modal.addEventListener('click', (event) => {
    if (event.target.matches('[data-modal-close]')) close();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });
});
