import { getProjectById } from "@/lib/actions/projects";
import { notFound } from "next/navigation";
import { ProjectForm } from "./ProjectForm";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;

  if (id === "new") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            New Project
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create a new project entry.
          </p>
        </div>

        <ProjectForm isNew />
      </div>
    );
  }

  const project = await getProjectById(id);
  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Edit Project
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Update project details and settings.
        </p>
      </div>

      <ProjectForm project={project} />
    </div>
  );
}
