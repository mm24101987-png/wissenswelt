const response = await fetch('https://api.opentrivia.de/?amount=50');
if (!response.ok) throw new Error(`Quiz API returned ${response.status}`);
const data = await response.json();
if (data.response_code !== 0 || !Array.isArray(data.results) || data.results.length < 10) {
  throw new Error('Quiz API returned an invalid or incomplete question set');
}
const clean = data.results.filter((q) => q.question && q.correct_answer && Array.isArray(q.incorrect_answers) && q.incorrect_answers.length === 3);
await import('node:fs/promises').then(({ writeFile }) => writeFile('random-questions.json', `${JSON.stringify(clean, null, 2)}\n`));
console.log(`Updated ${clean.length} questions`);
