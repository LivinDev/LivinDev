import type {   ProjectData } from "@/config/data.interface";
import RestaurantData from "@/data/project.json";

export const getLandingData = async (): Promise<ProjectDat> => {
  const data: RestaurantPageData = RestaurantData;
  return data;
};
