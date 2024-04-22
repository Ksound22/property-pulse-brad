import connecDB from '@/config/database';
import Property from '@/models/Property';

// GET /api/properties
export const GET = async (request) => {
  try {
    await connecDB();

    const properties = await Property.find({});
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
};
