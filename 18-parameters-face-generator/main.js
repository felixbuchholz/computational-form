// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.min.js
// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/addons/p5.dom.min.js

const w = 1386;
const h = 780;

function setModes() {
  // colorMode(HSB, 1, 1, 1, 1);
  angleMode(DEGREES);
  rectMode(CENTER);
  noStroke();
  // pixelDensity(1);
}

function preload() {
  dodo_mask = loadImage("_0000_dodo-mask.png");
  dodo_hair = loadImage("_0001_dodo-hair.png");
  dodo_mouth = loadImage("_0002_Dodo-mouth.png");
  dodo_nose = loadImage("_0003_dodo-nose.png");
  dodo_eye = loadImage("_0004_dodo-eye.png");
  dodo_base = loadImage("_0005_dodo-base.png");
  fish_mask = loadImage("_0006_fish-mask.png");
  fish_hair = loadImage("_0007_fish-hair.png");
  fish_special = loadImage("_0008_fish-special.png");
  fish_ear = loadImage("_0009_fish-ear.png");
  fish_mouth = loadImage("_0010_fish-mouth.png");
  fish_eye = loadImage("_0011_fish-eye.png");
  fish_base = loadImage("_0012_fish-base.png");
  monkey_mask = loadImage("_0013_monkey-mask.png");
  monkey_eye = loadImage("_0014_monkey-eyes.png");
  monkey_nose = loadImage("_0015_monkey-nose.png");
  monkey_mouth = loadImage("_0016_monkey-mouth.png");
  monkey_ear = loadImage("_0017_monkey-ear.png");
  monkey_hair = loadImage("_0018_monkey-hair.png");
  monkey_base = loadImage("_0019_monkey-base.png");
}

function setup() {
  createCanvas(w, h);
  setModes();
  createP("Choose base");
  selBase = createSelect();
  // selBase.option("select option");
  // selBase.option("dodo");
  selBase.option("fish");
  selBase.option("monkey");
  createP("Choose shape");
  selMask = createSelect();
  selMask.option("select option");
  selMask.option("dodo");
  selMask.option("fish");
  selMask.option("monkey");
  createP("Choose mouth");
  selMouth = createSelect();
  selMouth.option("select option");
  selMouth.option("dodo");
  selMouth.option("fish");
  selMouth.option("monkey");
  createP("Choose nose");
  selNose = createSelect();
  // selNose.option("select option");
  // selNose.option("dodo");
  selNose.option("monkey");
  createP("Choose ear");
  selEar = createSelect();
  selEar.option("select option");
  selEar.option("fish");
  selEar.option("monkey");
  createP("Choose eye");
  selEye = createSelect();
  selEye.option("select option");
  selEye.option("dodo");
  selEye.option("fish");
  selEye.option("monkey");
  createP("Choose hair");
  selHair = createSelect();
  selHair.option("select option");
  selHair.option("dodo");
  selHair.option("fish");
  selHair.option("monkey");
  createP("Choose special");
  selSpecial = createSelect();
  selSpecial.option("select option");
  selSpecial.option("fish");

  // selBase.changed(createSelector);
}

function draw() {
  background(246, 243, 228);

  if (selBase.value() == "dodo") {
    image(dodo_base, 158, 130);
    if (selMask.value() == "dodo") {
      image(dodo_mask, 0, 0);
      if (selMouth.value() == "dodo") {
      } else if (selMouth.value() == "fish") {
        push();
        translate(443, 290);
        rotate(31);
        scale(1.8);
        image(fish_mouth, 0, 0);
        pop();
        image(dodo_nose, 520, 320);
      } else if (selMouth.value() == "monkey") {
        push();
        translate(450, 370);
        noStroke();
        fill(246, 243, 228);
        circle(180, 220, 100);
        rotate(15);
        scale(1.8);
        image(monkey_mouth, 0, 0);
        pop();
        image(dodo_nose, 520, 320);
      }
      if (selNose.value() == "dodo") {
      } else if (selNose.value() == "monkey") {
        fill(246, 243, 228);
        circle(700, 490, 140);
        if (selMouth.value() == "dodo") {
          image(dodo_mouth, 353, 320);
        } else if (selMouth.value() == "fish") {
          push();
          translate(443, 290);
          rotate(31);
          scale(1.8);
          image(fish_mouth, 0, 0);
          pop();
        } else if (selMouth.value() == "monkey") {
          push();
          translate(450, 370);
          noStroke();
          fill(246, 243, 228);
          circle(180, 220, 100);
          rotate(15);
          scale(1.8);
          image(monkey_mouth, 0, 0);
          pop();
        }

        push();
        translate(506, 280);
        scale(2);
        rotate(-20);
        image(monkey_nose, 0, 0);
        pop();
      }
      if (selEar.value() == "fish") {
        image(fish_ear, 270, 200);
      } else if (selEar.value() == "monkey") {
        image(monkey_ear, 270, 250);
      }

      if (selEye.value() == "dodo") {
      } else if (selEye.value() == "fish") {
        image(fish_eye, 468, 268);
      } else if (selEye.value() == "monkey") {
        image(monkey_eye, 468, 268);
      }
      if (selHair.value() == "dodo") {
      } else if (selHair.value() == "fish") {
        image(fish_hair, 250, 75);
      } else if (selHair.value() == "monkey") {
        image(monkey_hair, 240, 25);
      }

      if (selSpecial.value() == "fish") {
        image(fish_special, 135, 403);
        if (selMouth.value() == "dodo") {
          image(dodo_mouth, 353, 320);
        } else if (selMouth.value() == "fish") {
          push();
          translate(443, 290);
          rotate(31);
          scale(1.8);
          image(fish_mouth, 0, 0);
          pop();
          if (selNose.value() == "dodo") {
            image(dodo_nose, 520, 320);
          } else if (selNose.value() == "monkey") {
            push();
            translate(450, 370);
            noStroke();
            fill(246, 243, 228);
            circle(180, 220, 100);
            rotate(15);
            scale(1.8);
            image(monkey_mouth, 0, 0);
            pop();
          }
        } else if (selMouth.value() == "monkey") {
          push();
          translate(450, 370);
          noStroke();
          fill(246, 243, 228);
          circle(180, 220, 100);
          rotate(15);
          scale(1.8);
          image(monkey_mouth, 0, 0);
          pop();
        }
      }
    } else if (selMask.value() == "fish") {
      image(fish_mask, -85, -70);
    } else if (selMask.value() == "monkey") {
      image(monkey_mask, -45, 30);
      if (selMouth.value() == "dodo") {
        image(dodo_mouth, 353, 320);
      } else if (selMouth.value() == "fish") {
        image(fish_mouth, 478, 378);
      } else if (selMouth.value() == "monkey") {
        image(monkey_mouth, 478, 378);
      }

      if (selNose.value() == "dodo") {
        image(dodo_nose, 520, 320);
      } else if (selNose.value() == "monkey") {
        image(monkey_nose, 532, 280);
      }

      if (selEar.value() == "fish") {
        image(fish_ear, 270, 200);
      } else if (selEar.value() == "monkey") {
        image(monkey_ear, 270, 250);
      }

      if (selEye.value() == "dodo") {
      } else if (selEye.value() == "fish") {
        image(fish_eye, 468, 268);
      } else if (selEye.value() == "monkey") {
        image(monkey_eye, 468, 268);
      }
      if (selHair.value() == "dodo") {
      } else if (selHair.value() == "fish") {
        image(fish_hair, 250, 75);
      } else if (selHair.value() == "monkey") {
        image(monkey_hair, 240, 25);
      }

      if (selSpecial.value() == "fish") {
        image(fish_special, 135, 403);
        if (selMouth.value() == "dodo") {
          image(dodo_mouth, 353, 320);
        } else if (selMouth.value() == "fish") {
          image(fish_mouth, 478, 378);
        } else if (selMouth.value() == "monkey") {
          image(monkey_mouth, 478, 378);
        }
      }
    }
  } else if (selBase.value() == "fish") {
    image(fish_base, 158, 140);
    if (selNose.value() == "dodo") {
      push();
      translate(580, 400);
      rotate(-60);
      image(dodo_nose, 0, 0);
      pop();
    } else if (selNose.value() == "monkey") {
      push();
      translate(650, 320);
      scale(1.2);
      rotate(-15);
      image(monkey_nose, 0, 0);
      pop();
    }
    if (selMouth.value() == "dodo") {
      push();
      translate(380, 466);
      rotate(-40);
      image(dodo_mouth, 0, 0);
      pop();
    } else if (selMouth.value() == "monkey") {
      push();
      translate(500, 380);
      scale(1.9);
      image(monkey_mouth, 0, 0);
      pop();
    }
    if (selEar.value() == "monkey") {
      image(monkey_ear, 350, 250);
    }
    if (selEye.value() == "dodo") {
      image(dodo_eye, 565, 305);
    }
    if (selHair.value() == "dodo") {
      push();
      translate(300, 80);
      rotate(20);
      image(dodo_hair, 0, 00);
      pop();
    } else if (selHair.value() == "monkey") {
      image(monkey_hair, 300, 80);
    }
    if (selSpecial.value() == "fish") {
      image(fish_special, 150, 450);
    }
  } else if (selBase.value() == "monkey") {
    image(monkey_base, 0, 0);
  }
}
