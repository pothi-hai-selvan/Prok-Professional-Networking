const mockConnections = [
  { name: 'Jane Smith', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', mutuals: 12 },
  { name: 'Mike Brown', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', mutuals: 8 },
  { name: 'Sara Lee', avatar: 'https://randomuser.me/api/portraits/women/46.jpg', mutuals: 5 },
];

export default function ConnectionsSidebar() {
  return (
    <aside className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Connections</h2>
      <ul>
        {mockConnections.map((conn, idx) => (
          <li key={idx} className="flex items-center mb-4">
            <img src={conn.avatar} alt={conn.name} className="w-10 h-10 rounded-full mr-3" />
            <div>
              <span className="font-semibold text-black dark:text-white">{conn.name}</span>
              <span className="block text-xs text-black dark:text-white">{conn.mutuals} mutual connections</span>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
} 