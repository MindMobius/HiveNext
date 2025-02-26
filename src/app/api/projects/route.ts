import { NextResponse } from 'next/server';
import { projectService } from '@/services/projectService';

export async function GET() {
  const projects = await projectService.getAllProjects();
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const project = await request.json();
  const newProject = await projectService.addProject(project);
  
  if (!newProject) {
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
  
  return NextResponse.json(newProject);
}

export async function PUT(request: Request) {
  const project = await request.json();
  const success = await projectService.updateProject(project);
  
  if (!success) {
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
  
  return NextResponse.json({ success: true });
} 