import { formatDistanceToNow } from "../helpers.js";

export function renderPostsListHtml(posts) {
  return posts
    .map(
      (post) => `
    <li class="post">
      <div class="post-header" data-user-id="${post.user.id}">
        <img src="${post.user.imageUrl}" class="post-header__user-image">
        <p class="post-header__user-name">${post.user.name}</p>
      </div>
      <div class="post-image-container">
        <img class="post-image" src="${post.imageUrl}">
      </div>
      <div class="post-likes">
        <button data-post-id="${post.id}" class="like-button">
          <img src="./assets/images/${
            post.isLiked ? "like-active" : "like-not-active"
          }.svg">
        </button>
        <p class="post-likes-text">
          Нравится: <strong>${post.likes.length}</strong>
        </p>
      </div>
      <p class="post-text">
        <span class="user-name">${post.user.name}</span>
        ${post.description}
      </p>
      <p class="post-date">
        ${formatDistanceToNow(post.createdAt)}
      </p>
    </li>
  `
    )
    .join("");
}

export function attachPostsEventListeners({ onUserClick, onLikeClick }) {
  for (const userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      onUserClick(userEl.dataset.userId);
    });
  }

  for (const likeButton of document.querySelectorAll(".like-button")) {
    likeButton.addEventListener("click", () => {
      onLikeClick(likeButton.dataset.postId);
    });
  }
}
