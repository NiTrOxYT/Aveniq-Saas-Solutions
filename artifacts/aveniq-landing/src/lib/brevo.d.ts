export function sendLeadNotification(leadData: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  budget?: string;
  message?: string;
}): Promise<{ success: boolean; error?: string }>;
