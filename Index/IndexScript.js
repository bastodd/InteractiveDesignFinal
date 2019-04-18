// JavaScript source code

//Carousel code from vuetify 
new Vue({
    el: '#app',
    data() {
        return {
            items: [
                {
                    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
                },
                {
                    src: 'https://media-cdn.tripadvisor.com/media/photo-s/11/a2/4a/45/matt-s-rustic-industrial.jpg'
                },
                {
                    src: 'https://www.instock.nl/app/uploads/2016/07/RubendeRuijter_InstockDH-51_klein.jpg'
                },
                {
                    src: 'https://media.istockphoto.com/photos/modern-room-with-tables-and-chairs-picture-id639067562?k=6&m=639067562&s=612x612&w=0&h=ZgAdRwxOaBmex_bSviYnxbs9siOKwy0mD32GkeElswE='
                }
            ]
        }
    }
})

//gallery from vuetify
new Vue({
    el: '#app',

})

//Search Bar from vue.js
    (() => {
        const data = [];
        const allowed = ['label', 'author'];
        const regex = /\w+:\w+$/g;

        Vue.component('search-token', {
            props: [
                'obj'
            ],
            data() {
                return {
                    data: data,
                }
            },
            template: `
      <li
        class="search-token"
        :class="'search-token-' + obj.token">
        <span class="token">
          {{ obj.token }}
        </span>
        <span class="value">
          {{ obj.value }}
        </span>
      </li>
    `,
        });

        new Vue({
            el: '#app',
            data() {
                return {
                    search: '',
                    data: data,
                };
            },
            methods: {
                getTokens() {
                    const matches = this.search.match(regex);

                    if (matches) {
                        const split = matches[0].split(':');

                        if (allowed.indexOf(split[0]) !== -1) {
                            this.data.push({
                                token: split[0],
                                value: split[1],
                            });

                            this.search = '';
                        }
                    }
                },
            },
            template: `
      <div class="search-holder">
        <ul
          class="search-list">
          <search-token
            v-for="obj in data"
            :obj="obj"></search-token>
        </ul>
        <input
          type="search"
          class="search-box"
          placeholder="Search..."
          v-model="search"
          @keyup.enter="getTokens" />
      </div>
    `,
        });
    })();


//---------SEARCH FUNCTIONALITY
var searchLocation;
var searchTerm;

function startSearch() {
    $('#results').html("");
    searchLocation = '28223';
    searchTerm = document.getElementById("search-term").value;
    var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + searchLocation + "&term=" + searchTerm;

    if (searchLocation == null || searchLocation == "") {
        $('#results').append('<h5 style="color:red;">* Please specify a location! * </h5>');
    } else {
        $.ajax({
            url: myurl,
            headers: {
                'Authorization': 'Bearer o-RQ82YyXSV_0vi4Ku0SBdxLA2Ff4w0HaNGCTuHaNXIJ6a1TRK3MVF9srnF3119vbWEXZENglkvdO7Q6DNDB46stRfZE2hCjzOjrogVm4hmWBgY3LaowAb4KS8ezXHYx',
            },
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                // Grab the results from the API JSON return
                var totalresults = data.total;
                // If our results are greater than 0, continue
                if (totalresults > 0) {
                    // Display a header on the page with the number of results
                    $('#results').append('<h5>We discovered ' + totalresults + ' results!</h5>');
                    // Itirate through the JSON array of 'businesses' which was returned by the API
                    $.each(data.businesses, function (i, item) {
                        // Store each business's object in a variable
                        var id = item.id;
                        var alias = item.alias;
                        var phone = item.display_phone;
                        var image = item.image_url;
                        var name = item.name;
                        var rating = item.rating;
                        var reviewcount = item.review_count;
                        var address = item.location.address1;
                        var city = item.location.city;
                        var state = item.location.state;
                        var zipcode = item.location.zip_code;
                        // Append our result into our page
                        $('#results').append('<div id="' + id + '" style="margin-top:50px;margin-bottom:50px;"><img src="' + image + '" style="width:200px;height:150px;"><br>We found <b>' + name + '</b> (' + alias + ')<br>Business ID: ' + id + '<br> Located at: ' + address + ' ' + city + ', ' + state + ' ' + zipcode + '<br>The phone number for this business is: ' + phone + '<br>This business has a rating of ' + rating + ' with ' + reviewcount + ' reviews.</div>');
                    });
                } else {
                    // If our results are 0; no businesses were returned by the JSON therefor we display on the page no results were found
                    $('#results').append('<h5>We discovered no results!</h5>');
                }
            }
        });
    }
}