import { useReducer } from 'react';

interface CounterAction {
  type: 'increment' | 'decrement' | 'reset' | 'updateCountFromDraft';
}

interface UpdateDraftCounterAction {
  type: 'updateDraftCount';
  payload: number | string;
}

type InitialState = {
  count: number;
  draftCount: string | number;
};

const initialState: InitialState = {
  count: 0,
  draftCount: 0,
};

const reducer = (
  state = initialState,
  action: CounterAction | UpdateDraftCounterAction,
) => {
  let { count, draftCount } = state;

  switch (action.type) {
    case 'increment':
      count = count + 1;
      return { count: count, draftCount: count };
    case 'decrement':
      count = count - 1;
      return { count: count, draftCount: count };
    case 'reset':
      return { count: 0, draftCount: 0 };
    case 'updateDraftCount':
      return { count, draftCount: action.payload };
    case 'updateCountFromDraft':
      return { count: Number(draftCount), draftCount };
  }
};

const Counter = () => {
  const [{ count, draftCount }, dispatch] = useReducer(reducer, initialState);

  return (
    <section className="flex w-2/3 flex-col items-center gap-8 border-4 border-primary-500 bg-white p-8 shadow-lg">
      <h1>Days Since the Last Accident</h1>
      <p className="text-6xl">{count}</p>
      <div className="flex gap-2">
        <button onClick={() => dispatch({ type: 'decrement' })}>
          ➖ Decrement
        </button>
        <button onClick={() => dispatch({ type: 'reset' })}>🔁 Reset</button>
        <button onClick={() => dispatch({ type: 'increment' })}>
          ➕ Increment
        </button>
      </div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch({ type: 'updateCountFromDraft' });
          }}
        >
          <input
            type="number"
            value={draftCount}
            onChange={(e) =>
              dispatch({ type: 'updateDraftCount', payload: e.target.value })
            }
          />
          <button type="submit">Update Counter</button>
        </form>
      </div>
    </section>
  );
};

export default Counter;
