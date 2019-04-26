Vue.component('reservation', {
    template: `
    <section id="mu-reservation">
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="mu-reservation-area" id="content-container">
                <div class="mu-title">
                    <span class="mu-subtitle"></span>
                    <h2>Make A Reservation</h2>
                    <i class="fa fa-spoon"></i>
                    <span class="mu-title-bar"></span>
                </div>
                <div class="mu-reservation-content">
                    <p>Please enter full name of restaurant </p>
                    <form class="mu-reservation-form" @submit.prevent="onSubmit">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input v-model="name" type="text" class="form-control" id="name" placeholder="Full Name">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input v-model="phone" type="number" class="form-control" id="phone" placeholder="Phone Number">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input v-model="restaurant_name" type="text" class="form-control" id="restaurantname" placeholder="Restaurant Name">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <select v-model="people" class="form-control" id="people">
                                        <option selected>1 Person</option>
                                        <option>2 People</option>
                                        <option>3 People</option>
                                        <option>4 People</option>
                                        <option>5 People</option>
                                        <option>6 People</option>
                                        <option>7 People</option>
                                        <option>8 People</option>
                                        <option>9 People</option>
                                        <option>10 People</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input v-model="date" type="text" class="form-control" id="datepicker" placeholder="Date">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input v-model="time" type="text" class="form-control" id="time" placeholder="Time">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <textarea v-model="text" class="form-control" id="info" cols="30" rows="10" placeholder="Additional Information"></textarea>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary" id="submit-btn">Make Reservation</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</section>
    `,
    data() {
        return {
            name: null,
            phone: null,
            people: null,
            date: null,
            time: null,
            restaurant_name: null,
            text: null
        }
    },
    methods: {
        onSubmit() {
            let restReservation = {
                name: this.name,
                phone: this.phone,
                people: this.people,
                date: this.date,
                time: this.time,
                restaurant_name: this.restaurant_name,
                text: this.text
            }
            this.$emit('reservation-submitted', restReservation)
            this.name = null
            this.phone = null
            this.people = null
            this.date = null
            this.time = null
            this.restaurant_name = null
            this.text = null
        }
    }
})

Vue.component('page', {
    template: `
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                
                    <div v-for="reservation in reservations">
                        <div id="results-container"> 
                            <h2>Thank you, {{ reservation.name }}!</h2><br>
                            <h4>Your reservation has been made.</h4><br>

                            <h4>Receipt:</h4>
                            <div id="receipt-container">
                                <p><b>Restaurant:  </b>{{ reservation.restaurant_name }}</p><br> 
                                <p><b>Guest name:  </b>{{ reservation.name }}</p>
                                <p><b>Phone Number:  </b>{{ reservation.phone }}</p><br> 
                                <p><b>Party size:  </b>{{ reservation.people }}</p>
                                <p><b>Arrival date:  </b>{{ reservation.date }}</p>
                                <p><b>Arrival time:  </b>{{ reservation.time }}</p><br>
                                <p><b>Notes/Accommodations specified:  </b><br>{{ reservation.text }}</p>
                            </div>
                        </div>
                    </div>
                    <reservation @reservation-submitted="addReservation"></reservation>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            reservations: []
        }
    },
    methods: {
        addReservation(reservation) {
            this.reservations.push(reservation)
            document.getElementById("content-container").innerHTML = "";
        }
    }
})

new Vue({
    el: '#app'
})