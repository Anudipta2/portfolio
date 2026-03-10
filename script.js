document.addEventListener("DOMContentLoaded", function(){

/* ========================= */
/* INDEX PAGE BACKGROUND */
/* ========================= */

const bgImage = document.getElementById("bgImage")

if(bgImage){

const images = [

"f1.jpg",
"f2.jpg",
"f3.jpg",
"f4.jpg",
"f5.jpg",
"f6.jpg",
"f7.jpg",
"f8.jpg",
"f9.jpg",
"f10.jpg",
"f11.jpg",
"f12.jpg",
"f13.jpg",
"f14.jpg",
"f15.jpg",
"f16.jpg",
"f17.jpg"

]

let currentImage = 0

function changeBackground(){

bgImage.style.opacity = 0

setTimeout(()=>{

currentImage++

if(currentImage >= images.length){
currentImage = 0
}

bgImage.src = images[currentImage]
bgImage.style.opacity = 1

},800)

}

bgImage.src = images[0]

setInterval(changeBackground,5000)

}


/* ========================= */
/* LOAD GALLERY IMAGES */
/* ========================= */

const galleryContainer = document.getElementById("galleryContainer")

if(galleryContainer){

for(let i=1;i<=96;i++){

let img = document.createElement("img")

img.src = `g${i}.jpg`
img.loading = "lazy"

galleryContainer.appendChild(img)

}

}


/* ========================= */
/* FULLSCREEN VIEWER */
/* ========================= */

const viewer = document.getElementById("fullscreenViewer")
const viewerImg = document.getElementById("fullscreenImage")
const closeBtn = document.getElementById("closeBtn")
const photoInfo = document.getElementById("photoInfo")

if(viewer){

galleryContainer.addEventListener("click", function(e){

if(e.target.tagName === "IMG"){

viewer.style.display = "flex"
viewerImg.src = e.target.src

/* EXIF METADATA */

if(typeof EXIF !== "undefined"){

EXIF.getData(e.target, function(){

let camera = EXIF.getTag(this,"Model")
let lens = EXIF.getTag(this,"LensModel")
let aperture = EXIF.getTag(this,"FNumber")
let shutter = EXIF.getTag(this,"ExposureTime")
let iso = EXIF.getTag(this,"ISOSpeedRatings")

photoInfo.innerHTML =

`
${camera || "Camera Unknown"}<br>
${lens || "Lens Unknown"}<br>
f/${aperture || "-"} • ${shutter || "-"}s • ISO ${iso || "-"}
`

})

}else{

photoInfo.innerHTML = "Metadata unavailable"

}

}

})

}


/* CLOSE FULLSCREEN */

if(closeBtn){

closeBtn.onclick = function(){
viewer.style.display = "none"
}

}


/* ========================= */
/* MOBILE PARALLAX */
/* ========================= */

if(window.DeviceOrientationEvent && bgImage){

window.addEventListener("deviceorientation",(event)=>{

let x = event.gamma
let y = event.beta

bgImage.style.transform =
`translate(${x*0.5}px, ${y*0.5}px) scale(1.05)`

})

}


})
