import { getProjectById, getSolutionByProjectId } from "@/lib/actions/projects";
import { notFound } from "next/navigation";
import { SolutionForm } from "./SolutionForm";

interface SolutionPageProps {
  params: Promise<{ id: string }>;
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { id } = await params;

  const project = await getProjectById(id);
  if (!project) {
    notFound();
  }

  const solution = await getSolutionByProjectId(id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Solution Breakdown
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Editing breakdown for{" "}
          <span className="font-medium text-foreground">{project.title}</span>
        </p>
      </div>

      <SolutionForm project={project} solution={solution} />
    </div>
  );
}
