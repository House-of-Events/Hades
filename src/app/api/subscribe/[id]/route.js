import {
  validateChannelId,
  getChannelName,
  validateIfAlreadySubscribed,
} from '@mananshah998/zeus-api';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const channelsModel = db('channels');
  const { id } = await params;
  try {
    // await validateChannelId(params.id, channelsModel);
    const channel = await getChannelName(id, channelsModel);
    const output = {
      channel,
    };
    return NextResponse.json(output, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode || 500 }
    );
  }
}
