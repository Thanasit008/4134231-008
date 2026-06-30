import { 
  getAllIssues, 
  createIssue 
} from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const skip = parseInt(url.searchParams.get('skip') || '0', 10);
    const limit = parseInt(url.searchParams.get('limit') || '100', 10);
    
    const issues = await getAllIssues(skip, limit);
    
    return NextResponse.json(issues, { status: 200 });
  } catch (error) {
    console.error('Error fetching issues:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // ตรวจสอบข้อมูลที่จำเป็น
    if (!body.title || !body.description || !body.location || !body.reported_by) {
      return NextResponse.json(
        { error: 'ข้อมูลไม่ครบถ้วน: ต้องมี title, description, location, reported_by' },
        { status: 400 }
      );
    }
    
    const newIssue = await createIssue(body);
    
    return NextResponse.json(newIssue, { status: 201 });
  } catch (error) {
    console.error('Error creating issue:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
