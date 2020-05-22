// TODO: Your code goes here

function Vehicle(color, engine) {
  this.color = color;
  this.engine = engine;
  this.maxSpeed = 70;
  this.isDriving = false;
  this.interval;
  this.maxSpeedPerDrive = 0;

  this.upgradeEngine = function (newEngine, maxSpeed) {
    if (!this.isDriving) {
      this.engine = newEngine;
      this.maxSpeed = maxSpeed;
    }
  };

  this.getInfo = function () {
    return this;
  };

  this.drive = function () {
    if (!this.isDriving) {
      this.isDriving = true;
      this.speed = 0;
      this.interval = setInterval(() => {
        this.speed += 20;
        this.maxSpeedPerDrive = this.speed;
        console.log(this.speed);
        if (this.speed > this.maxSpeed) {
          console.log('speed is too high, SLOW DOWN');
        }
      }, 2000);
    } else {
      console.log('Already driving');
    }
  };

  this.stop = function () {
    if (this.isDriving) {
      this.isDriving = false;
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.speed -= 20;
        console.log(this.speed, 'slowing down');
        if (this.speed === 0) {
          clearInterval(this.interval);
          console.log(
            `Vehicle is stopped. Maximum speed during the drive was ${this.maxSpeedPerDrive}`
          );
        }
      }, 1500);
    } else {
      console.log('Already slows down');
    }
  };
}

function Car(model, color, engine) {
  this.model = model;
  this.maxSpeed = 80;
  Vehicle.call(this, color, engine);

  this.changeColor = function (clr) {
    if (clr === this.color) {
      return 'The selected color is the same as the previous,please choose another one';
    } else {
      this.color = clr;
      return this.color;
    }
  };

  this.stop = function () {
    if (this.isDriving) {
      this.isDriving = false;
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.speed -= 20;
        console.log(this.speed);
        if (this.speed === 0) {
          clearInterval(this.interval);
          console.log(
            `Car ${this.model} is stopped. Maximum speed during the drive ${this.maxSpeedPerDrive}`
          );
        }
      }, 1500);
    } else {
      console.log('Already slows down');
    }
  };
}

function Motorcycle(model, color, engine, drive) {
  this.model = model;
  this.maxSpeed = 90;
  Vehicle.call(this, color, engine, drive);

  this.drive = function () {
    if (!this.isDriving) {
      console.log('Lets drive');
      this.isDriving = true;
      this.speed = 0;
      this.interval = setInterval(() => {
        this.speed += 20;
        console.log(this.speed);
        if (this.speed > this.maxSpeed) {
          console.log('speed is too high, SLOW DOWN');
          if (this.speed - this.maxSpeed >= 30) {
            console.log('Engine overheating');
          }
        }
      }, 2000);
    } else {
      console.log('Already driving');
    }
  };

  this.stop = function () {
    if (this.isDriving) {
      this.isDriving = false;
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.speed -= 20;
        console.log(this.speed);
        if (this.speed === 0) {
          clearInterval(this.interval);
          console.log(`Motorcycle ${this.model} is stopped. Good drive`);
        }
      }, 1500);
    } else {
      console.log('Already slows down');
    }
  };
}

const vehicle = new Vehicle('red', 'v7');
const car = new Car('audi', 'black', 'v228');
const motobyke = new Motorcycle('AMG', 'white', 'v18');

vehicle.upgradeEngine('v19', 200);
