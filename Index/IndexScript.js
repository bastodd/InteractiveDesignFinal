// JavaScript source code



//Carousel code

var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 2000); // Change image every 2 seconds
}

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



