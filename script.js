const form = document.getElementById("form");
console.log(form.elements["submit"]);
form.elements["submit"].addEventListener("click", function () {
    var currentdate = new Date();
    var datetime =
        "Date & Time: " +
        currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear() +
        " @ " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();
    console.log(datetime);
    download(
        datetime,
        form.elements["Name"].value.replace(/\s+/g, "") +
            form.elements["ID"].value.replace(/\s+/g, "") +
            ".txt",
        "text/plain"
    );
});

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
class GradientAnimation {
    constructor() {
        this.cnv = document.querySelector(`canvas`);
        this.ctx = this.cnv.getContext(`2d`);

        this.circlesNum = 15;
        this.minRadius = 400;
        this.maxRadius = 400;
        this.speed = 0.005;

        (window.onresize = () => {
            this.setCanvasSize();
            this.createCircles();
        })();
        this.drawAnimation();
    }
    setCanvasSize() {
        this.w = this.cnv.width = innerWidth * devicePixelRatio;
        this.h = this.cnv.height = innerHeight * devicePixelRatio;
        this.ctx.scale(devicePixelRatio, devicePixelRatio);
    }
    createCircles() {
        this.circles = [];
        for (let i = 0; i < this.circlesNum; ++i) {
            this.circles.push(new Circle(this.w, this.h, this.minRadius, this.maxRadius));
        }
    }
    drawCircles() {
        this.circles.forEach((circle) => circle.draw(this.ctx, this.speed));
    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.w, this.h);
    }
    drawAnimation() {
        this.clearCanvas();
        this.drawCircles();
        window.requestAnimationFrame(() => this.drawAnimation());
    }
}

class Circle {
    constructor(w, h, minR, maxR) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.angle = Math.random() * Math.PI * 2;
        this.radius = Math.random() * (maxR - minR) + minR;
        this.firstColor = `hsla(${Math.random() * 360}, 95%, 80%, 1)`;
        this.secondColor = `hsla(${Math.random() * 360}, 95%, 80%, 0)`;
    }
    draw(ctx, speed) {
        this.angle += speed;
        const x = this.x + Math.cos(this.angle) * 200;
        const y = this.y + Math.sin(this.angle) * 200;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.radius);
        gradient.addColorStop(0, this.firstColor);
        gradient.addColorStop(1, this.secondColor);

        ctx.globalCompositeOperation = `overlay`;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

window.onload = () => {
    new GradientAnimation();
};
