const Sidebar = () => {
  return (
    <aside className="w-60 bg-slate-900 border-r border-slate-700 p-4">
      <nav className="space-y-4">
        <div className="text-xs uppercase tracking-widest text-slate-500">Menú</div>

        <ul className="space-y-2 text-slate-300">
          <li className="hover:text-blue-400 cursor-pointer">Dashboard</li>
          <li className="hover:text-blue-400 cursor-pointer">Calificaciones</li>
          <li className="hover:text-blue-400 cursor-pointer">Reportes</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
