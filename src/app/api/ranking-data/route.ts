import { promises as fs } from 'fs';
import path from 'path';

export async function GET(req: Request) {
  try {
    const data = await fs.readFile(path.join(process.cwd(), 'public', 'data.json'), 'utf8');
    const jsonData = JSON.parse(data);
    console.log("jsonData = ", jsonData);
    return new Response(JSON.stringify(jsonData), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Could not fetch data", { status: 500 });
  }
}