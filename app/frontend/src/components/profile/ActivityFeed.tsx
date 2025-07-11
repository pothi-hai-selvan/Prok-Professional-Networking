import React from 'react';

const mockActivity = [
  { type: 'post', content: 'Shared a post: "10 Tips for Clean Code"', date: '2d ago' },
  { type: 'like', content: 'Liked Jane Smith’s post', date: '3d ago' },
  { type: 'comment', content: 'Commented on Mike’s post: "Great insights!"', date: '5d ago' },
];

const typeIcons: Record<string, JSX.Element> = {
  post: (
    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h7l2 2h5a2 2 0 012 2v12a2 2 0 01-2 2z" /></svg>
  ),
  like: (
    <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
  ),
  comment: (
    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2h2" /></svg>
  ),
};

export default function ActivityFeed() {
  return (
    <section className="bg-white rounded-lg shadow p-6 mb-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9" /></svg>
        <h2 className="text-xl font-bold">Activity</h2>
      </div>
      <ul>
        {mockActivity.map((act, idx) => (
          <li key={idx} className="mb-3 flex items-center gap-2">
            {typeIcons[act.type] || null}
            <span className="font-semibold capitalize">{act.type}:</span> {act.content}
            <span className="text-gray-400 text-xs ml-2">{act.date}</span>
          </li>
        ))}
      </ul>
    </section>
  );
} 