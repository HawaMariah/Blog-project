const container = document.querySelector(".container");

const renderposts = async () => {
  const url = "http://localhost:3000/Blogs";
  const res = await fetch(url);
  const blogs = await res.json();
  console.log(blogs);
  let template = "";
  blogs.forEach((blog) => {
    template += `
      <div class="blog">
        <h2 class="blog-title">${blog.title}</h2>
        <p class="blog-body">${blog.body}</p>
        <p class="author">Author : ${blog.author}</p>
        <button class="delete" data-blog-id="${blog.id}">Delete</button>
      </div>   
    `;
  });

  container.innerHTML = template;
  handleBlogTitleClicks();
  function handleBlogTitleClicks() {
    const blogTitles = document.querySelectorAll(".blog-title");

    blogTitles.forEach((title) => {
      const blogBody = title.nextElementSibling;

      blogBody.style.display = "none";
      const blogAuthor = blogBody.nextElementSibling
      blogAuthor.style.display = "none"
      const deletebtn =blogAuthor.nextElementSibling
      deletebtn.style.display = "none"

      title.addEventListener("click", () => {
        const content = document.querySelector(".content");

        content.innerHTML = "";
      
        content.appendChild(title);
        content.appendChild(blogBody);
        content.appendChild(blogAuthor)
        content.appendChild(deletebtn)
        blogBody.style.display = "block";
        blogAuthor.style.display = "block"
        deletebtn.style.display ="block"
        blogTitles.forEach((t) => {
          t.style.display = t === title ? "block" : "none";
        });
      });
    });
  }

  function goToHomePage() {
    const homePage = document.querySelector("#home");
    homePage.addEventListener("click", () => {
      window.location.href = "j.html";
    });
  }
  goToHomePage();
  function handleBlogClick() {
    const section = document.querySelector(".section");
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
      <div class="form">
        <form id="blogForm">
          <label for="title">Blog Title:</label>
          <input type="text" id="blogTitle" name="title" required>
  
          <label for="author">Author's Name:</label>
          <input type="text" id="authorName" name="author" required>
          <br>
          <br>
          <label for="body">Blog Body:</label>
          <textarea id="blogBody" name="body" required></textarea>
          <br>
         <button type="submit" id="submit">submit</button>
        </form>
      </div>
    `;

    newDiv.classList.add("blog-form");
    section.innerHTML = "";
    section.appendChild(newDiv);
    handleSubmit();
  }
  const blog = document.querySelector("#blog");
  blog.addEventListener("click", handleBlogClick);

  function handleSubmit() {
    const submitBtn = document.querySelector("#submit");
    const form = document.querySelector("form");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const title = form.elements.title.value;
      const author = form.elements.author.value;
      const body = form.elements.body.value;

      fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          title,
          author,
          body,
        }),
      });
    });
  }

  function handleDeleteButtonClicks() {
    const deleteButtons = document.querySelectorAll(".delete");

    deleteButtons.forEach((deleteButton) => {
      deleteButton.addEventListener("click", () => {
        const blogId = deleteButton.dataset.blogId;
        deleteBlogPost(blogId);
      });
    });
  }
  handleDeleteButtonClicks();
  function deleteBlogPost(blogId) {
    const deleteUrl = `${url}/${blogId}`;

    fetch(deleteUrl, {
      method: "DELETE",
    });
  }
};
window.addEventListener("DOMContentLoaded", renderposts);
