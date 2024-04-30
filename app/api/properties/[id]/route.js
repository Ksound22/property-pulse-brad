import connecDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';

// GET /api/properties/:id
export const GET = async (request, { params }) => {
  try {
    await connecDB();

    const property = await Property.findById(params.id);

    if (!property) {
      return new Response('Property not found!', { status: 404 });
    }

    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
};

// GET /api/properties/:id
export const DELETE = async (request, { params }) => {
  try {
    const propertyId = params.id;
    const sessionUser = await getSessionUser();

    // Check for session
    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;

    await connecDB();

    const property = await Property.findById(propertyId);

    if (!property) {
      return new Response('Property not found!', { status: 404 });
    }

    // Verify ownership
    if (property.owner.toString() !== userId) {
      return new Response('Unauthorised', { status: 401 });
    }

    await property.deleteOne();

    return new Response('Property Deleted', { status: 200 });
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
};
