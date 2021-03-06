import * as PIXI from 'pixi.js'
import '../scss/style.scss';

const app = new PIXI.Application(window.innerWidth, window.innerHeight, { backgroundColor: 0xffffff });
document.body.appendChild(app.view);

const sprites = new PIXI.particles.ParticleContainer(10000, {
  scale: true,
  position: true,
  rotation: true,
  uvs: true,
  alpha: true
});
app.stage.addChild(sprites);

const maggots = [];
const totalSprites = 2000;
// const totalSprites = (app.renderer instanceof PIXI.WebGLRenderer)
// ? 10000
// : 100;

for (let i = 0; i < totalSprites; i += 1) {
  const image = Math.floor(Math.random() * (4 - 1) + 1);
  console.log(Math.floor(Math.random() * (4 - 1) + 1));
  const dude = PIXI.Sprite.fromImage(`/public/imgaes/bubble-${image}.png`);

  // dude.tint = Math.random() * 0xE8D4CD;

  // set the anchor point so the texture is centerd on the sprite
  dude.anchor.set(0.5);

  // different maggots, different sizes
  dude.scale.set(0.8 + Math.random() * 0.1);

  // scatter them all
  dude.x = Math.random() * app.screen.width;
  dude.y = Math.random() * app.screen.height;

  // dude.tint = Math.random() * 0x808080;

  // create a random direction in radians
  dude.direction = Math.random() * Math.PI * 2;

  // this number will be used to modify the direction of the sprite over time
  dude.turningSpeed = Math.random() - 0.8;

  // create a random speed between 0 - 2, and these maggots are slooww
  dude.speed = (2 + Math.random() * 2);

  dude.offset = Math.random() * 100;

  // finally we push the dude into the maggots array so it it can be easily accessed later
  maggots.push(dude);

  sprites.addChild(dude);
}

// create a bounding box box for the little maggots
const dudeBoundsPadding = 100;
const dudeBounds = new PIXI.Rectangle(
  -dudeBoundsPadding,
  -dudeBoundsPadding,
  app.screen.width + dudeBoundsPadding * 2,
  app.screen.height + dudeBoundsPadding * 2
);

let tick = 0;

app.ticker.add(function () {

  // iterate through the sprites and update their position
  for (let i = 0; i < maggots.length; i++) {

    let dude = maggots[i];
    dude.scale.y = 0.95 + Math.sin(tick + dude.offset) * 0.05;
    dude.direction += dude.turningSpeed * 0.01;
    dude.x += Math.sin(dude.direction) * (dude.speed * dude.scale.y);
    dude.y += Math.cos(dude.direction) * (dude.speed * dude.scale.y) - 15;
    dude.rotation = -dude.direction + Math.PI;

    // wrap the maggots
    if (dude.x < dudeBounds.x) {
      dude.x += dudeBounds.width;
    }
    else if (dude.x > dudeBounds.x + dudeBounds.width) {
      dude.x -= dudeBounds.width;
    }

    if (dude.y < dudeBounds.y) {
      dude.y += dudeBounds.height;
    }
    else if (dude.y > dudeBounds.y + dudeBounds.height) {
      dude.y -= dudeBounds.height;
    }
  }

  // increment the ticker
  tick += 0.1;
});
