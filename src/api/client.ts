// Простой клиент для вызова backend API
export async function fetchPlan(userId: string) {
  const res = await fetch(`https://your-backend-url.ru/user/${userId}/plan`);
  return res.json();
}
