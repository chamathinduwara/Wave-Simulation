const c = document.getElementById('wave');
const ctx = c.getContext('2d');
const pause_btn = document.getElementById('pause_btn');
const start_btn = document.getElementById('start_btn');
const reset_btn = document.getElementById('reset_btn');
const waves = document.getElementById('waves');
const particle = document.getElementById('particle');
const wave_speed = document.getElementById('points')



let x_an, y_an, xy_an;
let start_number = 0;



c.height = 400;
c.width = 1300;

let y_start, y_end, speed, wave_length, b_count;
wave_length = 10;
y_start = 60;
let x_start;
x_start = 10;
let s = 1;

function cycle(x, y, r, c) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;
    this.start = 0;


    this.draw = function () {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    }
    this.draw_box = function () {
        ctx.fillStyle = this.c;
        ctx.fillRect(this.x, this.y, 2 * r, 2 * r);

    }



    this.animate = function (t, y_con, b, s) {

        if ((t / 100000 - (b) * 16 / 100) > 0) {
            this.y = y_start + wave_length * (Math.sin(s * Math.PI * (t / 100000 - (b) * 16 / 100))) + y_con;
            if (particle.value === 'box') {
                this.draw_box()
            }
            else if (particle.value === 'cycle') {
                this.draw()
            }
        }
    }
    this.x_animate = function (t, b, b1) {

        if ((t / 100000 - (b) * 16 / 100) > 0) {
            this.x = x_start + wave_length * (Math.sin(s * (Math.PI * (t / 100000 - (b) * 16 / 100)))) + 16 * b;
            if (particle.value === 'box') {
                ;
                this.draw_box()
            }
            else if (particle.value === 'cycle') {
                this.draw()
            }
        }

    }
    this.notAnimate = function () {
        if (particle.value === 'box') {
            this.draw_box()
        }
        else if (particle.value === 'cycle') {
            this.draw()
        }
    }

    this.xy_animate = function (t, y_con, b, b1) {

        if ((t / 100000 - (b) * 16 / 100) > 0) {
            this.x = x_start + wave_length * (Math.sin(s * (Math.PI * (t / 100000 - (b) * 16 / 100))) - b1 / 10 * (Math.sin(s * (Math.PI * (t / 100000 - (b) * 16 / 100))))) + 16 * b;
            this.y = y_start + wave_length * (Math.sin(s * (Math.PI * (t / 100000 - (b) * 16 / 100) - Math.PI / 2)) - b1 / 10 * (Math.sin(s * (Math.PI * (t / 100000 - (b) * 16 / 100) - Math.PI / 2)))) + y_con;

            if (particle.value === 'box') {
                this.draw_box()
            }
            else if (particle.value === 'cycle') {
                this.draw()
            }
        }


    }
    this.palce_item = function (b, b1) {
        this.x = x_start + 16 * b;
        this.y = y_start + 16 * b1;
        if (particle.value === 'box') {
            this.draw_box()
        }
        else if (particle.value === 'cycle') {
            this.draw()
        }

    }


}

let ball_array = [];

function draw_balls(b_count) {
    ball_array = [];
    for (let j = 0; j < b_count; j++) {
        let balls = [];
        for (let i = 0; i < 80; i++) {
            let r = 4;
            let x = x_start + i * 16;
            let y = y_start + j * 16;

            let r_colour = Math.floor(Math.random() * 255);
            let g_colour = Math.floor(Math.random() * 255);
            let b_colour = Math.floor(Math.random() * 255);


            let c = `rgb(${r_colour},${g_colour},${b_colour})`
            balls.push(new cycle(x, y, r, c));
        }
        ball_array.push(balls)
    }

}

draw_balls(10);

function creat_balls() {
    for (let b1 = 0; b1 < ball_array.length; b1++) {
        const element1 = ball_array[b1];
        for (let b2 = 0; b2 < ball_array[b1].length; b2++) {
            const element2 = ball_array[b1][b2];
            element2.notAnimate();
        }
    }
}
creat_balls();


let start_time = 0;
speed = 1;
let time_diff, sent_time;


function trans_animate(timestamp) {
    start_number = 1;
    if (start_time === 0) {
        start_time = timestamp;
    }

    time_diff = Math.floor((timestamp - start_time) * 200);
    ctx.clearRect(0, 0, 1500, 800);
    sent_time = time_diff;
    for (let b1 = 0; b1 < ball_array.length; b1++) {

        for (let b = 0; b < ball_array[b1].length; b++) {
            ball_array[b1][b].notAnimate();
            s = wave_speed.value / 5;
            ball_array[b1][b].animate(sent_time, b1 * 16, b, s);
        }

    }
    y_an = requestAnimationFrame(trans_animate);
}

function longi_animate(timestamp) {
    start_number = 1;
    if (start_time === 0) {
        start_time = timestamp;
    }

    time_diff = Math.floor((timestamp - start_time) * 200);
    ctx.clearRect(0, 0, 1500, 800);
    sent_time = time_diff;
    for (let b1 = 0; b1 < ball_array.length; b1++) {

        for (let b = 0; b < ball_array[b1].length; b++) {
            ball_array[b1][b].notAnimate();
            s = wave_speed.value / 5;
            ball_array[b1][b].x_animate(sent_time, b, b1, s);
        }

    }


    x_an = requestAnimationFrame(longi_animate);
}

function surf_animate(timestamp) {
    start_number = 1;
    if (start_time === 0) {
        start_time = timestamp;
    }

    time_diff = Math.floor((timestamp - start_time) * 200);
    ctx.clearRect(0, 0, 1500, 800);
    sent_time = time_diff;
    for (let b1 = 0; b1 < ball_array.length; b1++) {

        for (let b = 0; b < ball_array[b1].length; b++) {
            ball_array[b1][b].notAnimate();
            s = wave_speed.value / 5;
            ball_array[b1][b].xy_animate(sent_time, b1 * 16, b, b1, s);
        }

    }


    xy_an = requestAnimationFrame(surf_animate);
}

function not_animate() {

    ctx.clearRect(0, 0, 1500, 800);
    for (let b1 = 0; b1 < ball_array.length; b1++) {

        for (let b = 0; b < ball_array[b1].length; b++) {
            ball_array[b1][b].palce_item(b, b1);

        }
    }

}


function wave_select() {
    var wave = waves.value;
    if (wave === 'Surface') {
        cancelAnimationFrame(x_an);
        cancelAnimationFrame(y_an);
        requestAnimationFrame(not_animate);
        xy_an = requestAnimationFrame(surf_animate);

    }
    else if (wave === 'Latitiude') {
        cancelAnimationFrame(x_an);
        cancelAnimationFrame(xy_an);
        requestAnimationFrame(not_animate);
        y_an = requestAnimationFrame(trans_animate);
    }
    else if (wave === 'Longitudanal') {
        cancelAnimationFrame(xy_an);
        cancelAnimationFrame(y_an);
        requestAnimationFrame(not_animate);
        x_an = requestAnimationFrame(longi_animate);
    }
    else if (wave === 'none') {
        cancelAnimationFrame(x_an);
        cancelAnimationFrame(y_an);
        cancelAnimationFrame(xy_an);
        requestAnimationFrame(not_animate);
    }
}


function pause_anime() {
    if (waves.value === 'Longitudanal') {
        start_number = 0;
        cancelAnimationFrame(x_an);
    }
    else if (waves.value === 'Latitiude') {
        start_number = 0;
        cancelAnimationFrame(y_an);
    }
    else if (waves.value === 'Surface') {
        start_number = 0;
        cancelAnimationFrame(xy_an);
    }
}

function start_anime() {
    if (waves.value === 'Longitudanal' && start_number === 0) {
        x_an = requestAnimationFrame(longi_animate);
    }
    else if (waves.value === 'Latitiude' && start_number === 0) {
        y_an = requestAnimationFrame(trans_animate);
    }
    else if (waves.value === 'Surface' && start_number === 0) {
        xy_an = requestAnimationFrame(surf_animate);
    }
}


let reset_anm;
function reset_anime() {
    reset_anm = requestAnimationFrame(not_animate);
    start_time = 0;
}
