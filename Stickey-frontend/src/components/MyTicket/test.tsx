var container = document.querySelector('.container')
var overlay = document.querySelector('.overlay')
container?.addEventListener('mousemove', function(e){
  var x = e.offsetX;
  var y = e.offsetY;
  console.log(x, y)
  var rotateY = -1/5 * x + 20
  var rotateX = 4/30 * y - 20

  overlay.style = `background-position: ${x/5 + y/5}`

  // 마우스 좌표에 따라 변할 수 있게 
  container.style = `transform : perspective(350px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
})

container?.addEventListener('mouseout', function() {
  overlay.style = 'filter : opacity(0)'
  container.style = 'transform: perspective(350px) rotateY(0deg) rotateX(0deg)'
})

<div class="container">
  <div class="overlay"></div>
  <div class="card"></div>
</div>

<style>
  .container {
    width: 220px;
    height: 310px;
    transition: all 0.1s;
    position: relative;
  }
  .overlay {
    position: absolute;
    width: 220px;
    height: 310px;
    filter: brightness(1.2) opacity(0.8);
    mix-blend-mode: color-dodge;
    background: linear-gradient(105deg, transparent: 40%, rgba(255, 219, 112, 0.8) 45%, rgba(132, 50, 255, 0.6) 50%, transparent 54%);
    background-size: 150% 150%;
    basckground-position: 100%;
    transition: all 0.1s;
  }
  .card {
    width: 220px;
    height: 310px;
    background-size: cover;
  }
</style>