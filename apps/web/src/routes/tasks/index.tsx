import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

import type { Task, TaskStatusFilter } from '@/lib/types';

import { useTasksQuery, useCreateTaskMutation } from '@/lib/queries';

type TasksSearch = {
  status?: TaskStatusFilter;
  search?: string;
};

export const Route = createFileRoute('/tasks/')({
  validateSearch: (search: Record<string, unknown>): TasksSearch => ({
    status: (search.status as TaskStatusFilter) || 'all',
    search: (search.search as string) || '',
  }),
  component: TasksPage,
});

function TasksPage() {
  const { status, search } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const [isCreating, setIsCreating] = useState(false);

  // TanStack Query for data fetching with caching
  const { data: tasks, isLoading, error } = useTasksQuery({ status, search });

  const statusColors: Record<Task['status'], string> = {
    todo: 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    done: 'bg-green-100 text-green-800',
  };

  const handleStatusFilter = (newStatus: TaskStatusFilter) => {
    navigate({
      search: (prev) => ({ ...prev, status: newStatus }),
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    navigate({
      search: (prev) => ({ ...prev, search: e.target.value }),
    });
  };

  if (isLoading) return <TasksLoading />;
  if (error) return <TasksError error={error} />;
  return (
    <div className="mx-auto max-w-4xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          + New Task
        </button>
      </div>

      {/* Search & Filter - Demonstrates search params */}
      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={handleSearch}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-2">
          {(['all', 'todo', 'in-progress', 'done'] as const).map((s) => (
            <button
              key={s}
              onClick={() => handleStatusFilter(s)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                status === s
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {s === 'all'
                ? 'All'
                : s === 'in-progress'
                  ? 'In Progress'
                  : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {!tasks || tasks.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            No tasks found. Create one to get started!
          </div>
        ) : (
          tasks.map((task) => (
            <Link
              key={task.id}
              to="/tasks/$taskId"
              params={{ taskId: task.id }}
              className="block rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                  <p className="mt-1 text-gray-600">{task.description}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${statusColors[task.status]}`}
                >
                  {task.status}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Create Task Modal */}
      {isCreating && <CreateTaskModal onClose={() => setIsCreating(false)} />}
    </div>
  );
}

function TasksLoading() {
  return (
    <div className="mx-auto max-w-4xl p-8">
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-1/4 rounded bg-gray-200"></div>
        <div className="h-12 rounded bg-gray-200"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded bg-gray-200"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TasksError({ error }: { error: Error }) {
  return (
    <div className="mx-auto max-w-4xl p-8">
      <div className="rounded-lg border border-red-200 bg-red-50 p-6">
        <h2 className="text-lg font-semibold text-red-800">Error loading tasks</h2>
        <p className="mt-2 text-red-600">{error.message}</p>
        <p className="mt-4 text-sm text-red-500">Make sure the API is running on localhost:3001</p>
      </div>
    </div>
  );
}

function CreateTaskModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const createMutation = useCreateTaskMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({ title, description }, { onSuccess: () => onClose() });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">Create New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {createMutation.isPending ? 'Creating...' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
