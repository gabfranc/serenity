
const apiBaseUrl = 'http://127.0.0.1:5000/api/blog_posts';

  document.addEventListener('DOMContentLoaded', () => {
    fetchBlogPosts();

    document.getElementById('blog-form').addEventListener('submit', (e) => {
      e.preventDefault();
      createBlogPost();
      });
    });

   function fetchBlogPosts() {
    fetch(apiBaseUrl)
     .then(response => response.json())
     .then(posts => {

      const blogPostsDiv = document.getElementById('blog-posts');
      blogPostsDiv.innerHTML = '';
      posts.forEach(post => {

        const postDiv = document.createElement('div');
            postDiv.className = 'blog-post';
            postDiv.innerHTML = `
                            <h2>${post.title}</h2>
                            <p>${post.content}</p>
                            <p class="author">By ${post.author} on ${post.date}</p>
                        `;
            blogPostsDiv.appendChild(postDiv);
          });
        })
        .catch(error => console.error('Error fetching blog posts:', error));
    }

    function createBlogPost() {
      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;
      const author = document.getElementById('author').value;

      fetch(apiBaseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, content, author})
      })
        .then(response => response.json())
        .then(post => {
          document.getElementById('blog-form').reset();
          fetchBlogPosts();
        })
        .catch(error => console.error('Error creating blog post:', error));
    }
