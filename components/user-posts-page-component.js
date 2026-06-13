import { renderHeaderComponent } from "./header-component.js";
import {
  attachPostsEventListeners,
  renderPostsListHtml,
} from "./post-list-component.js";

export function renderUserPostsPageComponent({
  appEl,
  posts,
  onUserClick,
  onLikeClick,
}) {
  const user = posts.length > 0 ? posts[0].user : null;

  const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      ${
        user
          ? `
        <div class="posts-user-header">
          <img src="${user.imageUrl}" class="posts-user-header__user-image">
          <p class="posts-user-header__user-name">${user.name}</p>
        </div>
      `
          : ""
      }
      <ul class="posts">
        ${renderPostsListHtml(posts)}
      </ul>
    </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  attachPostsEventListeners({ onUserClick, onLikeClick });
}
