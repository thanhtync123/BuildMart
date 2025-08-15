import { buttonVariants } from '@/components/ui/button';

function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-20">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
        Vite, React, Shadcn-ui minimal starter
      </h1>
      <a
        href="https://github.com/moinulmoin/vite-react-tailwind-starter"
        target="_blank"
        rel="noreferrer"
        className={buttonVariants()}
      >
        ⭐️ on GitHub
      </a>
      <div className="flex items-center justify-between bg-red-500 p-4 text-center">
        Hello
      </div>
    </main>
  );
}

export default App;
