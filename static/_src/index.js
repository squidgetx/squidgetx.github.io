const axios = require("axios");

const SERVER_URL = "http://localhost:8000";

let render_comment = (comment) => {
  let username = comment.username;
  if (username == "") {
    username = "Anonymous";
  }
  return `<div class='comment'>
            <div class='post-meta comment-meta'>
                <span class='comment_username'>${username}</span>,
                on
                <span class='comment_date'>${comment.createdat.slice(
                  0,
                  10
                )}</span>:
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

let render_comments = (thread, comment_div, admin = false) => {
  axios
    .get(SERVER_URL + "/comments/thread?thread=" + thread)
    .then((res) => {
      console.log("comments received");
      let innerHTML = "";
      for (const comment of res.data) {
        innerHTML += render_comment(comment);
      }
      comment_div.innerHTML = innerHTML;
    })
    .catch((err) => console.log(err.response.data.error));
};

window.onload = () => {
  let comment_div = document.getElementById("comments");
  let thread = comment_div.getAttribute("thread");
  render_comments(thread, comment_div);
  let form = document.getElementById("comment_form"),
    actionPath = "",
    formData = null;

  form.addEventListener(
    "submit",
    (e) => {
      e.preventDefault();
      formData = new FormData(form);
      console.log([...formData.entries()]);
      actionPath = SERVER_URL + form.getAttribute("action");
      axios
        .post(actionPath, formData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          console.log(res);
          render_comments(thread, comment_div);
          /*
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          */
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
