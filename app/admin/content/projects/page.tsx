import { getProjects } from "@/lib/actions/projects";
import { ProjectsListClient } from "./ProjectsListClient";

export default async function AdminProjectsPage() {
  const { projects, total } = await getProjects();

  return (
    <div className="space-y-6">
      <ProjectsListClient initialProjects={projects} total={total} />
    </div>
  );
}
