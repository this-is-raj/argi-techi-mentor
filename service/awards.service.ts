import { AwardItem, Certification, Compliance } from "@/types/award";

export interface AwardsResponse {
  awards: AwardItem[];
  certifications: Certification[];
  compliances: Compliance[];
}

class AwardService {
  private baseUrl = "/api/awards";

  async fetchAwardsData(): Promise<AwardsResponse> {
    try {
      const response = await fetch(this.baseUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: AwardsResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching awards data:", error);
      throw error;
    }
  }

  getFeaturedAwards(awards: AwardItem[], limit: number = 4): AwardItem[] {
    return awards.filter((award: AwardItem) => award.featured).slice(0, limit);
  }

  getFeaturedCertifications(certifications: Certification[]): Certification[] {
    return certifications.filter((cert: Certification) => cert.featured);
  }
}

export const awardService = new AwardService();
