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