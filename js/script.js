document.addEventListener("contextmenu", (event) => event.preventDefault());

var canvas = document.getElementById("imageCanvas");
var ctx = canvas.getContext("2d");
var name_x = 0;
var name_y = 870;
var invitee = "Invitee Name Here";

// image obj
var img = new Image();
img.crossOrigin = "anonymous";
img.src = "img/template.jpg";

window.addEventListener("load", DrawPlaceholder);


function DrawPlaceholder() {
  img.src = "img/template.jpg";
  canvas.width = img.width;
  canvas.height = img.height;
  img.onload = function () {
    DrawOverlay(img);
    DrawText(invitee);
    DynamicText(img);
    DynamicDownload();
  };
  authenticate();
}

function DrawOverlay(img) {
  ctx.drawImage(img, 0, 0);
  ctx.fillStyle = "rgba(0, 0, 0, 0)";
  ctx.fillRect(0, 0, img.width, img.height);
}
function DrawText() {
  ctx.fillStyle = "#3d6a39";
  ctx.textBaseline = "middle";
  ctx.font = "30px 'Montserrat'";
  ctx.textAlign = "center";
  name_x = img.width / 2;
  ctx.fillText(invitee, name_x, name_y);
}

function DynamicText(img) {
  document.getElementById("name").addEventListener("keyup", function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    DrawOverlay(img);
    if (this.value) {
      invitee = this.value;
    } else {
      invitee = "Invitee Name Here";
    }
    DrawText(invitee);
    DynamicDownload();
  });
}

function DynamicDownload() {
  let downloadBtn = document.getElementById("download");
  downloadBtn.setAttribute(
    "href",
    canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
  );
  downloadBtn.setAttribute("download", invitee + ".png");
}



document.getElementById("password").addEventListener("keyup", function () {
  authenticate(this.value);
});

function authenticate(password) {
  if (sessionStorage.getItem("auth") || password === "invite") {
    sessionStorage.setItem("auth", true);
    document.getElementById("password-wrap").style.display = "none";
    document.getElementById("protected-wrap").style.display = "inline-block";
  }
}