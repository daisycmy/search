const eventCRUD = () => {
    function handleSubmit(event){
        const { id } = event.nativeEvent.submitter;
        if(id === "create"){
            // shitty code please dont do this
            let username = document.getElementById("username").value
            if(!username){
                alert('You must enter the username!');
                return
            }
            let password = document.getElementById("lopasswordcId").value
            if(!password){
                alert('You must enter the password!');
                return
            }
            let isAdmin = document.getElementById("isAdmin").checked

            fetch("http://localhost:3000/newUser", {
                method: "POST",
                body: JSON.stringify({
                    "username": username,
                    "password": password,
                    "isAdmin": isAdmin
                })
            }).then((response) => {
                if(!response.ok){
                    alert(response.statusText)
                }else{
                    alert('ok!')
                }
            })
        }else if(id === "update"){
            // shitty code please dont do this
            let username = document.getElementById("username").value
            if(!username){
                alert('You must enter the username');
                return
            }
            let oldusername = document.getElementById("oldUsername").value
            if(!oldUsername){
                alert('You must enter the old Username!');
                return
            }
            let password = document.getElementById("lopasswordcId").value || ""
            let isAdmin = document.getElementById("isAdmin").checked

            fetch("http://localhost:3000/updateUser", {
                method: "POST",
                body: JSON.stringify({
                    "oldUsername": oldusername,
                    "username": username,
                    "password": password,
                    "isAdmin": isAdmin
                })
            }).then((response) => {
                if(!response.ok){
                    alert(response.statusText)
                }else{
                    alert('ok!')
                }
            })
        }else if(id === "delete"){
            // shitty code please dont do this
            let username = document.getElementById("username").value
            if(!username){
                alert('You must enter the username!');
                return
            }
            fetch("http://localhost:3000/deleteUSer", {
                method: "POST",
                body: JSON.stringify({
                    "username": username
                })
            }).then((response) => {
                if(!response.ok){
                    alert(response.statusText)
                }else{
                    alert('ok!')
                }
            })
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label for="username">username</label>
            <input name="username" id="username" type="text"/>

            <label for="oldUsername">old username (fill this in if you need to change the username of the user)</label>
            <input name="oldUsername" id="oldUsername" type="text"/>


            <label for="password">Password of the user</label>
            <input name="password" id="password" type="text"/>
            

            <label for="isAdmin">Is the user a admin</label>
            <input name="isAdmin" id="isAdmin" type="checkbox"/>
            
            
            <input type="submit" id="create">New User</input>
            <input type="submit" id="update">Update User</input>
            <input type="submit" id="delete">Delete User</input>

        </form>
    )
}
