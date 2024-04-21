import connecDB from '@/config/database';

export const GET = async (request) => {
  try {
    await connecDB();
    return new Response(JSON.stringify({ message: 'Hello world' }), {
      status: 200,
    });
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
};
