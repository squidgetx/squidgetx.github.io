const axios = require("axios");

const SERVER_URL = "https://sylvan-fish.herokuapp.com";

let render_comment = (comment) => {
  let username = comment.username;
  if (username == "") {
    username = "Anonymous";
  }
  return `<div class='comment'>
            <div class='post-meta comment-meta'>
                <p class='comment_date'>${comment.createdat
                  .slice(0, 10)
                  .replaceAll("-", " ")}</p>
                <p class='comment_username'>${username}</p>
                <span class='comment_delete' hidden comment_id=${
                  comment.id
                }>(delete)</span>
            </div>
            <div class='comment_text'>
                <p>${comment.comment}</p>
            </div>
         </div>
    `;
};

let render_comments = (thread, comment_div) => {
  axios
    .get(SERVER_URL + "/comments/thread?thread=" + thread)
    .then((res) => {
      console.log("comments received");
      let innerHTML = "";
      for (const comment of res.data) {
        innerHTML += render_comment(comment);
      }
      comment_div.innerHTML = innerHTML;
      if (res.data.length == 0) {
        comment_div.innerHTML =
          "<p class='nocomments'>No comments yet for this post.</p>";
      }
    })
    .catch((err) => console.log(err.response.data.error));
};

window.onload = () => {
  let comment_div = document.getElementById("comments");
  let name = localStorage.getItem("username");
  if (name) {
    document.getElementById("comment_username").value = name;
  }
  let thread = comment_div.getAttribute("thread");
  render_comments(thread, comment_div);
  let form = document.getElementById("comment_form"),
    comment_text = document.getElementById("comment_text");

  comment_text.addEventListener("input", () => {
    document.getElementById("comment_submit").disabled = !(
      comment_text.value.length > 0
    );
  });

  form.addEventListener(
    "submit",
    (e) => {
      e.preventDefault();
      let formData = new FormData(form);
      console.log([...formData.entries()]);
      let username = formData.get("username");
      let actionPath = SERVER_URL + form.getAttribute("action");
      axios
        .post(actionPath, formData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          console.log(res);
          render_comments(thread, comment_div);
          // Clear the comments box
          localStorage.setItem("username", username);
          document.getElementById("comment_text").value = "";
        })
        .catch((err) => console.log(err.response.data.error));
    },
    false
  );

  document.getElementById("comment_secret").addEventListener("click", () => {
    for (const e of document.getElementsByClassName("comment_delete")) {
      e.hidden = false;
      e.addEventListener("click", () => {
        axios
          .post(
            SERVER_URL + "/comments/delete",
            {
              id: e.getAttribute("comment_id"),
            },
            {
              headers: {
                authorization: localStorage.getItem("passphrase"),
              },
            }
          )
          .then((res) => {
            console.log("comment deleted");
            e.innerHTML = "(deleted!)";
          })
          .catch((err) => console.log(err.response.data.error));
      });
    }
  });
};
