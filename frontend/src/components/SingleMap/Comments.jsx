import React, {useState, useEffect} from "react";


const Comments = () => {

    const [userInput, setUserInput] = useState("");
    const [userName, setUserName] = useState("");


    const [name, setName] = useState("");
    const [decodedCookie, setDecodedCookie] = useState("");

    const getUserName = () => {
/*            let name = cname + "=";
            setDecodedCookie(decodeURIComponent(document.cookie));
            let ca = decodedCookie.split(';');
            for(let i = 0; i <ca.length; i++) {
              let c = ca[i];
              while (c.charAt(0) == ' ') {
                c = c.substring(1);
              }
              if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
              }
            }
            return "";*/
    }

    const addComment = () => {
        setUserInput(document.getElementById("new-comments"));
        setUserName(document.cookie.username)
        fetch("http://localhost:3000")
        
        appendComment();
    }

    const clearComment = () => {
        document.getElementById("comments").innerHTML = "";
    }

    const fetchAllComments = () => {

    }

    const appendComment = () => {
        document.getElementById("comments").appendChild(
    `
        <div id="com" class="d-flex">
            <div class="flex-shrink-0">
                <svg height="100" width="100">
                    <circle cx="50" cy="50" r="40" fill="green" />
                </svg>
            </div>
            <div class="flex-grow-1">
                <h5>${username}</h5>
                <p>${comment}</p>
            </div>
        </div>
    `
    )
    }


    return (
        <div class="container m-5">
            <div id="comments">

            </div>
            <hr />
            <h6>Add your comment:</h6>
            <form>
                <div class="mb-3">
                    <label for="new-email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="new-email" placeholder="name@example.com" />
                </div>
                <div class="mb-3">
                    <label for="new-comment" class="form-label">Comment</label>
                    <textarea class="form-control" id="new-comment" rows="3"></textarea>
                </div>
                <button type="button" class="btn btn-primary" onclick={processform()}>Add comment</button>
            </form>
        </div>

    )
}

export default Comments;