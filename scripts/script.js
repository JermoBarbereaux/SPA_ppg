function fetchData() {
   fetch('https://api.tvmaze.com/shows/1955/episodes').then (response => {
       return response.json()
   }).then(data => {
    console.log(data);
   })
}

fetchData();