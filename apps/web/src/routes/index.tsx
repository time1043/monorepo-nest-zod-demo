import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="mx-auto max-w-4xl px-8 py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-gray-900">TanStack Start + NestJS</h1>
          <p className="text-xl text-gray-600">A fullstack demo showcasing modern React patterns</p>
        </div>

        <div className="mb-12 grid gap-6 md:grid-cols-2">
          <FeatureCard
            title="Route Loaders"
            description="Data fetching that happens before rendering, with automatic loading states"
            icon="⚡"
          />
          <FeatureCard
            title="Search Params"
            description="Type-safe URL search params for filtering and pagination"
            icon="🔍"
          />
          <FeatureCard
            title="Pending UI"
            description="Built-in pending states during navigation and mutations"
            icon="⏳"
          />
          <FeatureCard
            title="NestJS Backend"
            description="Scalable Node.js backend with decorators and dependency injection"
            icon="🚀"
          />
        </div>

        <div className="text-center">
          <Link
            to="/tasks"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-blue-700 hover:shadow-xl"
          >
            View Tasks Demo
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="mt-16 text-center text-sm text-gray-500">
          <p>Frontend: localhost:3000 | API: localhost:3001</p>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md">
      <div className="mb-3 text-3xl">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
