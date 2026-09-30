export const TOPICS = ['React', 'JavaScript', 'HTML5', 'CSS3', 'Node.js', 'Next.js', 'Redux', 'TypeScript', 'REST APIs', 'GraphQL', 'HR & Behavioral']
export const LEVELS = ['Beginner', 'Intermediate', 'Advanced']
const q = (id, topic, level, question, answer) => ({ id, topic, level, question, answer })
export const QUESTIONS = [
  q(1,'React','Beginner','What is the virtual DOM?','A lightweight in-memory copy of the UI. React diffs it against the previous version and applies only the minimal real DOM changes.'),
  q(2,'React','Intermediate','When does useEffect run, and how do dependencies affect it?','After render. With [] once on mount; with deps whenever they change; with none after every render. Return a cleanup function to release resources.'),
  q(3,'React','Advanced','How would you prevent unnecessary re-renders in a large tree?','Colocate state, use React.memo, useMemo/useCallback for stable references, split contexts, virtualize long lists, and profile before optimizing.'),
  q(4,'JavaScript','Beginner','Difference between var, let and const?','var is function-scoped and hoisted; let/const are block-scoped with a temporal dead zone; const forbids reassignment.'),
  q(5,'JavaScript','Intermediate','Explain closures with an example.','A function retains access to its lexical scope after the outer function returns, e.g. a counter factory keeping a private count.'),
  q(6,'JavaScript','Advanced','How does the event loop order microtasks and macrotasks?','After each macrotask the engine drains the microtask queue (promises) fully before the next macrotask (timers, I/O).'),
  q(7,'HTML5','Beginner','Why use semantic elements?','They convey meaning to browsers, assistive tech and search engines, improving accessibility and SEO.'),
  q(8,'CSS3','Intermediate','Flexbox vs Grid: when to use each?','Flexbox for one-dimensional layout along a row or column; Grid for two-dimensional layouts with rows and columns together.'),
  q(9,'Node.js','Intermediate','How does Node handle concurrency on a single thread?','Non-blocking I/O via libuv and the event loop; CPU-heavy work goes to worker threads or child processes.'),
  q(10,'Next.js','Intermediate','SSR vs SSG vs ISR?','SSR renders per request; SSG at build time; ISR regenerates static pages in the background after a revalidate interval.'),
  q(11,'Redux','Intermediate','Why use Redux Toolkit over classic Redux?','Less boilerplate: createSlice, Immer-powered immutable updates, built-in thunks and sensible store defaults.'),
  q(12,'TypeScript','Intermediate','interface vs type?','Both describe shapes; interfaces merge and extend nicely, types also cover unions, intersections and mapped types.'),
  q(13,'REST APIs','Beginner','What makes an API RESTful?','Resource-based URLs, standard HTTP verbs and status codes, statelessness, and uniform representations.'),
  q(14,'GraphQL','Intermediate','What problem does GraphQL solve?','Over- and under-fetching: clients request exactly the fields they need from a single typed endpoint.'),
  q(15,'HR & Behavioral','Beginner','Tell me about yourself.','A concise present–past–future story: current role, relevant achievements, and why this role is next.'),
  q(16,'HR & Behavioral','Intermediate','Describe a conflict with a teammate and how you resolved it.','Use STAR: situation, task, your action (listen, align on goals, compromise), and a measurable result.'),
  q(17,'HR & Behavioral','Advanced','Tell me about a failure and what you learned.','Own it, explain impact briefly, focus on corrective actions and the process you changed afterwards.')
]
