const mockActivity = [
  { type: 'post', content: 'Shared a post: "10 Tips for Clean Code"', date: '2d ago' },
  { type: 'like', content: 'Liked Jane Smith\'s post', date: '3d ago' },
  { type: 'comment', content: 'Commented on Mike\'s post: "Great insights!"', date: '5d ago' },
];

export default function ActivityFeed() {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Activity</h2>
      <ul>
        {mockActivity.map((act, idx) => (
          <li key={idx} className="mb-2">
            <span className="font-semibold capitalize text-black dark:text-white">{act.type}:</span> <span className="text-black dark:text-white">{act.content}</span>
            <span className="text-black dark:text-white text-xs ml-2">{act.date}</span>
          </li>
        ))}
      </ul>
    </section>
  );
} 