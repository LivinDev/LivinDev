import type {   ProjectData } from "@/config/data.interface";
import RestaurantData from "@/data/project.json";

export const getLandingData = async (): Promise<ProjectData> => {
  const data: ProjectData = RestaurantData;
  return data;
};
