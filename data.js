//Function used to search and display the data
function search(){
    const getData = async ()=>
    {
        //Gets the search element
        payload = document.getElementById('searchTag').value
        //Makes the POST request and stores the response in rawData
        const rawData = await fetch('/data', {
        method:"POST",
        mode:"cors",
        cache:"no-cache",
        credentials:"same-origin",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            data:payload
        })
        }
        )
        
        //rawData.json() is a promise that seems to return a promise
        const data = await rawData.json()
        return data
    }
    //Gets the list object
    const list = document.getElementById("list")
    //Gets the data which is a promise and then use it in the result
    const data = getData().then((res)=>{
        //clears the list
        list.innerHTML = ""
        //If there is a result it clears the disclaimer
        //Otherwise it says that no songs are found
        if(res.length > 0)
        {
            document.getElementById("disclaimer").innerHTML = ""
        }
        else
            document.getElementById("disclaimer").innerHTML = "No songs found from that artist"
        //For each object in the response
        res.forEach(element => {
            //Creates an element 
            let html = document.createElement('li')
            html.id = 'item'
            //This is a template string that will be the interior of the list item 
            //It places the song and the artist of the element into the HTML
            html.innerHTML = `<h2 id=\"songName\">${element.song}</h2><h3 id=\"artist\">${element.artist}</h3>`
            //This puts the list element into the list
            list.insertAdjacentElement('beforeend', html)
        });
    })}