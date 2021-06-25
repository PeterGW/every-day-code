class Publisher {
  constructor() {
    this.observers = [];
  }

  add(observer) {
    this.observers.push(observer);
  }

  remove(observer) {
    this.observers.forEach((item, i) => {
      if (item == observer) {
        this.observers.splice(i, 1);
      }
    });
  }

  notify() {
    this.observers.forEach((item) => item.update(this.state));
  }
}

class Observe {
  constructor() {
    console.log("create observer");
  }

  update(data) {
    console.log("observe state update", data);
  }
}

class PrdPublisher extends Publisher {
  constructor() {
    super();
    this.state = "";
  }

  getState() {
    return this.state;
  }

  setState(state) {
    this.state = state;
    this.notify();
  }
}

class DeveloperObserver extends Observe {
  constructor() {
    super();
  }

  work() {
    console.log(this.state);
  }
}

const liLei = new DeveloperObserver();

const A = new DeveloperObserver();

const hanMeiMei = new PrdPublisher();

hanMeiMei.add(liLei);
hanMeiMei.add(A);

hanMeiMei.setState("hello");
