/** @format */

import Link from 'next/link';

/** @format */
const practice = {
  hooks: [
    {
      name: 'useState',
      description:
        'State Hook, allows you to add state to functional components.',
      features: [
        'Adds state to functional components.',
        'Triggers a re-render when state is updated.',
      ],
      usage: 'const [state, setState] = useState(initialValue);',
      example: 'const [count, setCount] = useState(0);',
      returnType:
        'Returns an array, the first element is the current state, and the second element is a function to update it.',
    },
    {
      name: 'useEffect',
      description:
        'Effect Hook, used to perform side effects like data fetching, subscriptions, or manual DOM manipulation after render.',
      features: [
        'Executes after every render or based on specific dependency changes.',
        'Can be used for async operations and lifecycle-like behavior in functional components.',
      ],
      usage: 'useEffect(() => { /* side effect code */ }, [dependencies]);',
      example: "useEffect(() => { console.log('Component mounted'); }, []);",
      returnType:
        'Does not return anything. It accepts a cleanup function to run on component unmount.',
    },
    {
      name: 'useContext',
      description:
        'Context Hook, used to access the value of a context in functional components.',
      features: [
        'Allows components to access global data.',
        'Avoids prop drilling, making state available deep in the component tree.',
      ],
      usage: 'const value = useContext(MyContext);',
      example: 'const theme = useContext(ThemeContext);',
      returnType: 'Returns the current value of the context.',
    },
    {
      name: 'useReducer',
      description:
        'Reducer Hook, an alternative to `useState` for handling more complex state logic.',
      features: [
        'Useful for handling complex state with multiple sub-values or when the next state depends on the previous state.',
        'Uses a reducer function to handle state updates.',
      ],
      usage: 'const [state, dispatch] = useReducer(reducer, initialState);',
      example: 'const [state, dispatch] = useReducer(reducer, { count: 0 });',
      returnType:
        'Returns an array, the first element is the state, and the second is a dispatch function to dispatch actions.',
    },
    {
      name: 'useMemo',
      description:
        'Memoization Hook, helps optimize performance by memoizing values that depend on expensive calculations.',
      features: [
        'Memoizes a value to avoid recalculating it on every render unless its dependencies change.',
        'Optimizes performance for computationally expensive functions.',
      ],
      usage:
        'const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);',
      example: 'const sortedData = useMemo(() => sortData(data), [data]);',
      returnType: 'Returns the memoized value.',
    },
    {
      name: 'useCallback',
      description:
        'Callback Hook, returns a memoized version of a function that only changes if one of the dependencies changes.',
      features: [
        'Optimizes performance by memoizing functions.',
        'Useful for passing functions to child components to prevent unnecessary re-renders.',
      ],
      usage:
        'const memoizedCallback = useCallback(() => { /* callback logic */ }, [dependencies]);',
      example:
        "const handleClick = useCallback(() => { console.log('clicked'); }, []);",
      returnType: 'Returns the memoized function.',
    },
    {
      name: 'useRef',
      description:
        'Ref Hook, provides a way to access and persist a reference to a DOM element or a mutable object.',
      features: [
        'Returns a mutable object that persists for the lifetime of the component.',
        'Can be used to reference DOM elements directly.',
      ],
      usage: 'const myRef = useRef(initialValue);',
      example: 'const inputRef = useRef(null);',
      returnType: 'Returns a mutable object with a `current` property.',
    },
    {
      name: 'useLayoutEffect',
      description:
        'Layout Effect Hook, similar to `useEffect`, but it fires synchronously after all DOM mutations, useful for DOM measurement.',
      features: [
        'Executes synchronously after all DOM mutations.',
        'Useful for operations that need to read and modify the DOM before the browser paints.',
      ],
      usage: 'useLayoutEffect(() => { /* side effect */ }, [dependencies]);',
      example: "useLayoutEffect(() => { console.log('Layout effect'); }, []);",
      returnType: 'Does not return anything.',
    },
    {
      name: 'useImperativeHandle',
      description:
        'Imperative Handle Hook, customizes the instance value that is exposed when using `ref` in parent components.',
      features: [
        'Used to define which values are exposed to parent components when using `ref`.',
        'Allows you to hide or expose specific methods or values to parent components.',
      ],
      usage: 'useImperativeHandle(ref, () => ({ customMethod }));',
      example:
        'useImperativeHandle(myRef, () => ({ scrollToTop: () => window.scrollTo(0, 0) }));',
      returnType:
        'Returns the object or methods you want to expose to the parent component.',
    },
    {
      name: 'useDebugValue',
      description:
        'Debugging Hook, displays a label in React DevTools for custom hooks.',
      features: [
        'Helps improve debugging by showing additional custom hook information in React DevTools.',
      ],
      usage: 'useDebugValue(value);',
      example: 'useDebugValue(count);',
      returnType: 'Does not return anything.',
    },
  ],
};
export default function Home() {
  return (
    <div className='col space-x-3 p-8 lg:col-span-3 md:col-span-4 col-span-12'>
      {practice.hooks.map((hook) => (
        <div key={hook.name} className=''>
          <h2>{hook.name}</h2>
          <h5>{hook.description}</h5>
          <p>{hook.usage}</p>
          <p>{hook.example}</p>
          <p>{hook.returnType}</p>
          <Link href={`/${hook.name}`}>Learn more about {hook.name}</Link>
        </div>
      ))}
    </div>
  );
}
