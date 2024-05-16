//  # Recupero gli elementi

const container = document.getElementById('container');


// #FUNZIONI

// genero le card con i post
const createCard = post => {

  const formatDate = date => {
    const realDate = new Date(date);
    return realDate.toLocaleDateString();
  }

  const renderProfilePicture = author => {
    const { name, image } = author;
    if (image) return `<img class="profile-pic" src="${image}" alt="${name}" />`
    return `<div class="profile-pic-default"><span>${name.charAt(0).toUpperCase()}</span></div>`
  }


  const { author, content, media, id, likes, created } = post;
  return `
    <div class="post" id="post-${id}">
      <div class="post__header">
        <div class="post-meta">
          <div class="post-meta__icon">
            ${renderProfilePicture(author)}
          </div>
          <div class="post-meta__data">
            <div class="post-meta__author">${author.name}</div>
            <div class="post-meta__time">${formatDate(created)}</div>
          </div>
        </div>
      </div>
      <div class="post__text">${content}</div>
      <div class="post__image">
        <img src="${media}" alt="post-image-${id}" />
      </div>
      <div class="post__footer">
        <div class="likes js-likes">
          <div class="likes__cta">
            <button class="like-button js-like-button" data-id="${id}">
              <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
              <span class="like-button__label">Mi Piace</span>
            </button>
          </div>
          <div class="likes__counter">Piace a <b  class="js-likes-counter">${likes}</b> persone</div>
        </div>
      </div>
    </div>

    `;
}

//setto il bottone del like
const onButtonClick = event => {

  const button = event.currentTarget;
  console.log(button);

  // Recupero l'id del post
  const postId = button.dataset.id;


  // Recupero  il post
  const post = document.getElementById(`post-${postId}`);

  // Recupero  tutti gli elementi che mi servono (DA DENTRO IL POST)
  const likeCounter = post.querySelector('.js-likes-counter');
  const likeIcon = post.querySelector('.like-button__icon');
  const buttonLabel = post.querySelector('.like-button__label');


  // Recupero il numero di likes 
  let likes = parseInt(likeCounter.innerText);

  // Inverto le classi 
  button.classList.toggle('like-button--liked');
  likeIcon.classList.toggle('d-none');


  // Cerco di capire se il post mi piace o no
  const isLiked = button.classList.contains('like-button--liked');

  // Determino il valore dei like e del testo del bottone
  likeCounter.innerText = isLiked ? ++likes : --likes;
  buttonLabel.innerText = isLiked ? 'Non mi piace più' : 'Mi piace'


  const originalPost = posts.find(({ id }) => id === parseInt(postId));
  originalPost.likes = likes;

  console.log(posts);

}

// # Genero dinamicamente i post
container.innerHTML = posts.reduce((result, post) => result + createCard(post), '');



// # Reagisco al click sui bottoni

// Recupero i bottoni
const likeButtons = document.querySelectorAll('.js-like-button');


for (let button of likeButtons) {
  button.addEventListener('click', onButtonClick)
}

