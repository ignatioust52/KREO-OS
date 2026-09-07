import Link from 'next/link';
import { getTasks } from '@/actions/tasks';
import AddTaskButton from './AddTaskButton';

export default async function TasksPage() {
  const { tasks = [], projects = [] } = await getTasks();

  const todoTasks = tasks.filter((t: any) => t.status === 'TODO');
  const inProgressTasks = tasks.filter((t: any) => t.status === 'IN PROGRESS');
  const doneTasks = tasks.filter((t: any) => t.status === 'DONE');
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-kreo-ink/60 mt-1">Manage deliverables and what needs to get done today.</p>
        </div>
        <AddTaskButton projects={projects} />
      </header>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-kreo-ink/10 mb-6">
        <button className="py-3 font-medium border-b-2 border-kreo-ink">My Tasks</button>
        <button className="py-3 font-medium text-kreo-ink/50 hover:text-kreo-ink">Delegated</button>
        <button className="py-3 font-medium text-kreo-ink/50 hover:text-kreo-ink">By Project</button>
      </div>

      {/* Kanban Board style or List Style - using simple lists for now */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column: To Do */}
        <div className="bg-kreo-panel rounded-2xl p-4 shadow-sm border border-kreo-ink/10 flex flex-col h-[calc(100vh-250px)]">
          <div className="flex items-center justify-between mb-4 px-2">
            <h2 className="font-bold">To Do</h2>
            <span className="bg-kreo-ink/10 text-kreo-ink text-xs font-bold px-2 py-1 rounded-full">{todoTasks.length}</span>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3 px-2">
            {todoTasks.map((task: any) => (
              <div key={task.id} className="bg-kreo-surface border border-kreo-ink/10 p-3 rounded-xl shadow-sm hover:border-kreo-ink/30 cursor-pointer transition-colors group">
                <div className="flex items-start gap-2 mb-2">
                  <input type="checkbox" className="mt-1 w-4 h-4 rounded border-kreo-ink/30 text-kreo-amber focus:ring-kreo-amber" />
                  <p className="font-medium text-sm leading-tight group-hover:text-kreo-amber transition-colors">{task.title}</p>
                </div>
                <div className="ml-6 flex items-center justify-between text-xs text-kreo-ink/60">
                  <span className="bg-kreo-ink/5 px-2 py-1 rounded truncate max-w-[120px]">{task.projectName}</span>
                  {task.dueDate && <span className="font-medium">{new Date(task.dueDate).toLocaleDateString()}</span>}
                </div>
              </div>
            ))}
            
            <div className="pt-2 text-center text-xs text-kreo-ink/50">
               Click 'Add Task' to add more.
            </div>
          </div>
        </div>

        {/* Column: In Progress */}
        <div className="bg-kreo-panel rounded-2xl p-4 shadow-sm border border-kreo-ink/10 flex flex-col h-[calc(100vh-250px)]">
          <div className="flex items-center justify-between mb-4 px-2">
            <h2 className="font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-kreo-amber"></span>
              In Progress
            </h2>
            <span className="bg-kreo-ink/10 text-kreo-ink text-xs font-bold px-2 py-1 rounded-full">{inProgressTasks.length}</span>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3 px-2">
            {inProgressTasks.map((task: any) => (
              <div key={task.id} className="bg-kreo-surface border border-kreo-ink/10 p-3 rounded-xl shadow-sm hover:border-kreo-ink/30 cursor-pointer transition-colors group">
                <div className="flex items-start gap-2 mb-2">
                  <input type="checkbox" className="mt-1 w-4 h-4 rounded border-kreo-ink/30 text-kreo-amber focus:ring-kreo-amber" />
                  <p className="font-medium text-sm leading-tight group-hover:text-kreo-amber transition-colors">{task.title}</p>
                </div>
                <div className="ml-6 flex items-center justify-between text-xs text-kreo-ink/60">
                  <span className="bg-kreo-ink/5 px-2 py-1 rounded truncate max-w-[120px]">{task.projectName}</span>
                  {task.dueDate && <span className="font-medium">{new Date(task.dueDate).toLocaleDateString()}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column: Done */}
        <div className="bg-kreo-panel rounded-2xl p-4 shadow-sm border border-kreo-ink/10 flex flex-col h-[calc(100vh-250px)] opacity-70">
          <div className="flex items-center justify-between mb-4 px-2">
            <h2 className="font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-kreo-success"></span>
              Done
            </h2>
            <span className="bg-kreo-ink/10 text-kreo-ink text-xs font-bold px-2 py-1 rounded-full">{doneTasks.length}</span>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3 px-2">
             {doneTasks.map((task: any) => (
              <div key={task.id} className="bg-kreo-surface border border-kreo-ink/10 p-3 rounded-xl shadow-sm cursor-pointer transition-colors opacity-60">
                <div className="flex items-start gap-2 mb-2">
                  <input type="checkbox" checked readOnly className="mt-1 w-4 h-4 rounded border-kreo-success text-kreo-success focus:ring-kreo-success" />
                  <p className="font-medium text-sm leading-tight line-through">{task.title}</p>
                </div>
                <div className="ml-6 flex items-center justify-between text-xs text-kreo-ink/60">
                  <span className="bg-kreo-ink/5 px-2 py-1 rounded truncate max-w-[120px]">{task.projectName}</span>
                  {task.dueDate && <span className="font-medium">{new Date(task.dueDate).toLocaleDateString()}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
