// Fetch data from tvmaze API
function fetchData() {
    // Fetch episode list & details
    fetch('https://api.tvmaze.com/shows/1955/episodes')
        .then (response => {
            //check if response is true, if not throw error.
            if (!response.ok) {
                throw Error("ERROR, Failed to fetch API");
            }
            return response.json()
        })
        .then(data => {
            //Loop through array to obtain values.
            const html = data.map(episode => {
                //prepare values and HTML
               return `
               <div class='container'>
                   <h3>${episode.name}</h3>
                   <div class='details'>
                        <img src='${episode.image.medium}'/>
                        ${episode.summary}
                   </div>
               </div>
            `;
            // Get rid of kommas with .join('').
            }).join('')

            // inject HTML into respective element.
            document.querySelector('#app').innerHTML = html;
        })
        .catch(error => {
            console.log(error);
        })
    
    //fetch show information
    fetch('https://api.tvmaze.com/shows/1955')
        .then(response => {
            //check if response is true, if not throw error.
            if (!response.ok) {
                throw Error("ERROR, Failed to fetch API");
            }
            return response.json()
            .then(data => {
                //obtain data
                const summary = data.summary;
                const showtitle = data.name;
                const image = data.image.original;
                
                //inject data into html elements
                document.querySelector('#summary').innerHTML = summary;
                document.querySelector('#showtitle').innerHTML = showtitle;
                //cover image gets added to the hero background.
                document.querySelector('#hero').style.backgroundImage = `url('${image}')`;
            })
            .catch(error => {
                console.log(error);
            })
        })
}

// call function
fetchData();

//Hero script
var hero = function() {
    var hero = $('.hero-nav'),
        heroHeight = $('.hero-nav').outerHeight(true);
        $(hero).parent().css('padding-top', heroHeight);
    $(window).scroll(function() {
        var scrollOffset = $(window).scrollTop();
        if (scrollOffset < heroHeight) {
            $(hero).css('height', (heroHeight - scrollOffset));
        }
        if (scrollOffset > (heroHeight - 215)) {
            hero.addClass('fixme');
        } else {
            hero.removeClass('fixme');
        };
    });
}
hero();


//on click toggle details of episodes.
$(document).ready(function() {
    $(document).on('click', '.container' ,function (e) {
        $(this).find('.details').slideToggle();
    });
});