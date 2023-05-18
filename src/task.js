import { shuffle } from "underscore";

class Task {
  strategy: "random";
  hiddenNumbers: {};

  constructor(strategy) {
    this.setStrategy(strategy);
    this.hiddenNumbers = {};
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  generate() {
    shuffle(Array.from(Array(100 + 1).keys()).slice(1)).forEach(
      (number, index) => {
        this.hiddenNumbers[index + 1] = number;
      }
    );
  }

  prisonerSearch(prisonerNumber) {
    if (this.strategy === "random") {
      const closedBoxes = shuffle(Array.from(Array(100 + 1).keys()).slice(1));
      for (let i = 0; i < 50; i++) {
        const randomBoxNumber = closedBoxes[i];
        if (this.hiddenNumbers[randomBoxNumber] === prisonerNumber) {
          return true;
        }
      }
      return false;
    }
    if (this.strategy === "chain") {
      let nextIndex = prisonerNumber;
      for (let i = 0; i < 50; i++) {
        if (this.hiddenNumbers[nextIndex] === prisonerNumber) {
          return true;
        }
        nextIndex = this.hiddenNumbers[nextIndex];
      }
      return false;
    }
  }

  play() {
    let counter = 0;
    for (let i = 0; i < 100; i++) {
      if (!this.prisonerSearch(i + 1)) {
        return false;
      } else {
        counter++;
      }
    }
    if (counter === 100) {
      return true;
    }
  }
}

export default Task;
