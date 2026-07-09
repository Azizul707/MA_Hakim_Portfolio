import { getLeads, getIndustries } from "@/lib/actions/leads";
import type { LeadListParams } from "@/types/portfolio-lead";
import { LeadsTableClient } from "./LeadsTableClient";

interface LeadsPageProps {
  searchParams: Promise<LeadListParams>;
}

export default async function LeadsPage({ searchParams }: LeadsPageProps) {
  const params = await searchParams;
  const { page, pageSize, search, status, priority, industry, sortBy, sortOrder } = params;

  const [leadsResult, industries] = await Promise.all([
    getLeads({
      page: page || 1,
      pageSize: pageSize || 10,
      search: search || "",
      status: status || "ALL",
      priority: priority || "ALL",
      industry: industry || "ALL",
      sortBy: sortBy || "created_at",
      sortOrder: sortOrder || "desc",
    }),
    getIndustries(),
  ]);

  const searchParamsForClient: LeadListParams = {
    page: page || 1,
    pageSize: pageSize || 10,
    search: search || "",
    status: status || "ALL",
    priority: priority || "ALL",
    industry: industry || "ALL",
    sortBy: sortBy || "created_at",
    sortOrder: sortOrder || "desc",
  };

  return (
    <LeadsTableClient
      initialLeads={leadsResult.leads}
      initialParams={searchParamsForClient}
      total={leadsResult.total}
      totalPages={leadsResult.totalPages}
      industries={industries}
    />
  );
}