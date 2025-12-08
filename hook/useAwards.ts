import { useState, useEffect } from "react";

import { AwardItem, Certification, Compliance } from "@/types/award";

import { awardService } from "@/service/awards.service";
export const useAwards = () => {
  const [data, setData] = useState<{
    awards: AwardItem[];
    certifications: Certification[];
    compliances: Compliance[];
  }>({
    awards: [],
    certifications: [],
    compliances: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await awardService.fetchAwardsData();

      const featuredAwards = awardService.getFeaturedAwards(
        response.awards || []
      );
      const featuredCerts = awardService.getFeaturedCertifications(
        response.certifications || []
      );

      setData({
        awards: featuredAwards,
        certifications: featuredCerts,
        compliances: response.compliances || [],
      });
    } catch (err: any) {
      setError(err.message || "Failed to fetch awards data");
      console.error("Error in useAwards hook:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};
