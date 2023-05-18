import { useState } from "react";
import "./App.css";
import Task from "./task.js";

function App() {
  const [counterChain, setCounterChain] = useState(0);
  const [counterRandom, setCounterRandom] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const calculate = () => {
    let counterChainTemp = 0;
    let counterRandomTemp = 0;
    for (let i = 0; i < 1000; i++) {
      const myTask = new Task();
      myTask.setStrategy("random");
      myTask.generate();
      if (myTask.play()) {
        counterRandomTemp += 1;
      }
    }
    for (let i = 0; i < 1000; i++) {
      const myTask = new Task();
      myTask.setStrategy("chain");
      myTask.generate();
      if (myTask.play()) {
        counterChainTemp += 1;
      }
    }

    setShowResult(true);
    setCounterChain(counterChainTemp);
    setCounterRandom(counterRandomTemp);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ marginLeft: "15%", marginRight: "15%" }}>
          <p>
            <span style={{ fontSize: 24, fontWeight: "bold" }}>Problem:</span>
            <div style={{ fontStyle: "italic", marginTop: 20 }}>
              The director of a prison offers 100 death row prisoners, who are
              numbered from 1 to 100, a last chance. A room contains a cupboard
              with 100 drawers. The director randomly puts one prisoner's number
              in each closed drawer. The prisoners enter the room, one after
              another. Each prisoner may open and look into 50 drawers in any
              order. The drawers are closed again afterwards. If, during this
              search, every prisoner finds their number in one of the drawers,
              all prisoners are pardoned. If even one prisoner does not find
              their number, all prisoners die. Before the first prisoner enters
              the room, the prisoners may discuss strategy — but may not
              communicate once the first prisoner enters to look in the drawers.
              What is the prisoners' best strategy ?
            </div>
            <div
              style={{
                color: "orange",
                fontSize: 16,
                fontStyle: "italic",
                marginTop: 20,
              }}
            >
              You might think that chance of success is very low, and for random
              selection it is. But what if i say that there is other strategy
              that will give ~31% of success results ? Good examplanation can be
              found here:
              <div style={{ marginTop: 10 }}>
                <a
                  style={{ color: "lightblue" }}
                  href="https://www.youtube.com/watch?v=iSNsgj1OCLA&ab_channel=Veritasium"
                >
                  English version video
                </a>
              </div>
              <div style={{ marginTop: 10 }}>
                <a
                  style={{ color: "lightblue" }}
                  href="https://www.youtube.com/watch?v=wWQ9YdreY9c&ab_channel=VertDider"
                >
                  Russian version video
                </a>
              </div>
            </div>
          </p>
          <button style={{ padding: 5, fontSize: 16 }} onClick={calculate}>
            {showResult
              ? "Recalculate"
              : "Verify chances for both strategies on 1000 experiments"}
          </button>
          {showResult && (
            <div style={{ marginTop: 20 }}>
              <p>
                Random selection strategy: {counterRandom} successes out of 1000
                experiments
              </p>
              <p>
                Chain selection strategy: {counterChain} successes out of 1000
                experiments
              </p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
