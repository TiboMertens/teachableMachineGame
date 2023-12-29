// player class
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  display() {
    // Draw the player as a bike
    fill(255, 0, 0);

    // Body
    rect(this.x, this.y - 20, 10, 40);

    // Seat
    rect(this.x + 10, this.y - 30, 5, 10);

    // Wheels
    fill(50);
    ellipse(this.x + 5, this.y + 10, 20, 20);
    ellipse(this.x + 15, this.y + 10, 20, 20);

    // Handlebars
    line(this.x, this.y - 20, this.x - 5, this.y - 30);
    line(this.x + 20, this.y - 20, this.x + 25, this.y - 30);
  }

  move() {
    //move player based on mouse position
    this.x = mouseX;
    this.y = mouseY;
  }
}