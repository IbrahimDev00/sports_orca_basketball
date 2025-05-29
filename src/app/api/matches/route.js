import { NextResponse } from 'next/server';

export async function GET() {
  const host = process.env.API_HOST;
  const key = process.env.API_KEY;
  const date = process.env.API_DATE;
  const league = process.env.API_LEAGUE;
  const season = process.env.API_SEASON;

  const url = `https://${host}/games?date=${date}`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'x-apisports-key': key,
      },
    });

    const data = await res.json();

    return NextResponse.json(data.response);
  } catch (error) {
    console.error('API fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
