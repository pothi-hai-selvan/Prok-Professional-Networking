const mockRecommendations = [
  {
    from: 'Jane Smith',
    text: 'John is a fantastic engineer and a great team player. Highly recommended!'
  },
  {
    from: 'Mike Brown',
    text: 'Delivered high-quality work on time and always willing to help others.'
  }
];

export default function RecommendationsSection() {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Recommendations</h2>
      <ul>
        {mockRecommendations.map((rec, idx) => (
          <li key={idx} className="mb-4">
            <blockquote className="italic text-black dark:text-white">"{rec.text}"</blockquote>
            <span className="block text-sm text-black dark:text-white mt-1">- {rec.from}</span>
          </li>
        ))}
      </ul>
    </section>
  );
} 