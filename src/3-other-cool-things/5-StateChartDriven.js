import { LitElement, html, css } from "lit-element";
import { interpret, Machine, assign } from "xstate/dist/xstate.web";

const ETLMachine = Machine({
  id: "etl",
  initial: "idle",
  context: {
    runTimestamp: null,
    completedRuns: [],
    failedRuns: []
  },
  states: {
    idle: {
      on: {
        'start': 'extracting'
      }  
    },
    extracting: {
      entry: ['setRunTimestamp'],
      on: {
        'complete_extraction': 'loading',
        'error': 'errored',
      },
    },
    loading: {
      on: {
        'complete_load': {
          target: "idle",
          actions: ['logCompletedRun']
        },
        'error': 'errored',
      }
    },
    errored: {
      on: {
        'quit': {
          target: 'idle',
          actions: ['logFailedRun']
        }
      }
    }
  }
},
{
  actions: {
    setRunTimestamp: assign((ctx) => {
      return {
        ...ctx,
        runTimestamp: new Date().toISOString()
      }
    }),
    logCompletedRun: assign((ctx) => {
      const { runTimestamp } = ctx;
      return {
        ...ctx,
        runTimestamp: null,
        completedRuns: [...ctx.completedRuns, runTimestamp]
      }
    }),
    logFailedRun: assign((ctx) => {
      const { runTimestamp } = ctx;
      return {
        ...ctx,
        runTimestamp: null,
        failedRuns: [...ctx.failedRuns, runTimestamp]
      }
    })
  }
});

class StateChartDriven extends LitElement {
  static get styles() {
    return css`
      .container {
        display: grid;
        grid-template-columns: 4fr 2fr;
      }
    `
  }
  static get properties() {
    return {
      runTimestamp: { type: String },
      failedRuns: { type: Array },
      completedRuns: { type: Array },
      currentState: { type: String },
      nextEvents: { type: Array },
      state: { type: Object }
    }
  };

  constructor() {
    super();
    this.service = interpret(ETLMachine)
      .onTransition(state => {
        const { context, value } = state;

        this.runTimestamp = context.runTimestamp;
        this.completedRuns = context.completedRuns
        this.failedRuns = context.failedRuns;
        this.currentState = value;
        this.nextEvents = state.nextEvents;
        
        // This is just so we can look at it
        this.state = state;
      })
      .start();
  }

  handleSend(e) {
    const event = e.target.getAttribute("transition");
    this.service.send(event)
  }

  render() {
    return html`
      <div class="container">
        <div>
          <p>Completed Runs: ${JSON.stringify(this.completedRuns)} </p>         
          <p>Failed Runs: ${JSON.stringify(this.failedRuns)} </p>         

          <p>Current state: ${this.currentState}</p>
          <p>Run Timestamp: ${this.runTimestamp || "None"}</p>
          
          ${this.nextEvents.map(name => html`
            <button @click="${this.handleSend}" transition="${name}">${name}</button>
          `)}

        </div>
        
        <div>
          <b>State:</b>
          <pre>
${JSON.stringify(this.state, false, 2)}
          </pre>

        </div>
      </div>
    `
  }
}

customElements.define('state-chart-driven', StateChartDriven);
