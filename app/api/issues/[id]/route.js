import { 
  getIssueById, 
  updateIssue, 
  deleteIssue 
} from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id, 10);
    const issue = await getIssueById(id);
    
    if (!issue) {
      return NextResponse.json(
        { error: 'ไม่พบรายงานปัญหา' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(issue, { status: 200 });
  } catch (error) {
    console.error('Error fetching issue:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id, 10);
    const issue = await getIssueById(id);
    
    if (!issue) {
      return NextResponse.json(
        { error: 'ไม่พบรายงานปัญหา' },
        { status: 404 }
      );
    }
    
    const body = await request.json();
    const updatedIssue = await updateIssue(id, body);
    
    return NextResponse.json(updatedIssue, { status: 200 });
  } catch (error) {
    console.error('Error updating issue:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id, 10);
    const issue = await getIssueById(id);
    
    if (!issue) {
      return NextResponse.json(
        { error: 'ไม่พบรายงานปัญหา' },
        { status: 404 }
      );
    }
    
    const deletedIssue = await deleteIssue(id);
    
    return NextResponse.json(deletedIssue, { status: 200 });
  } catch (error) {
    console.error('Error deleting issue:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
