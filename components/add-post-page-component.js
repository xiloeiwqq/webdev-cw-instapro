import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let imageUrl = "";
  let isLoading = false;

  const render = () => {
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <div class="form">
        <h3 class="form-title">Новый пост</h3>
        <div class="form-inputs">
          <div class="upload-image-container"></div>
          <textarea
            id="description-input"
            class="input textarea"
            placeholder="Описание фотографии"
          ></textarea>
          <div class="form-error"></div>
          <button class="button" id="add-button" ${
            isLoading ? 'disabled="true"' : ""
          }>${isLoading ? "Добавляю..." : "Добавить"}</button>
        </div>
      </div>
    </div>
  `;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    renderUploadImageComponent({
      element: document.querySelector(".upload-image-container"),
      onImageUrlChange(newImageUrl) {
        imageUrl = newImageUrl;
      },
    });

    const setError = (message) => {
      appEl.querySelector(".form-error").textContent = message;
    };

    document.getElementById("add-button").addEventListener("click", () => {
      setError("");

      const description = document.getElementById("description-input").value;

      if (!imageUrl) {
        alert("Выберите фото");
        return;
      }

      if (!description.trim()) {
        alert("Введите описание");
        return;
      }

      isLoading = true;
      render();

      onAddPostClick({ description, imageUrl })
        .catch((error) => {
          console.warn(error);
          isLoading = false;
          render();
          setError(error.message);
        });
    });
  };

  render();
}
