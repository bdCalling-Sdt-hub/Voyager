export interface personalizedPicksTypes {
    id: number;
    name: string;
    type: string;
    description: string;
    short_description_about_fun_fact: string;
    short_description_about_secret_tips: string;
    location: string;
    address: string;
    city: string;
    country: string;
    latitude: string;
    longitude: string;
    attraction_id: string;
    activity_levels: string[];
    best_visit_times: string[];
    must_visit_spots: string[];
    category: {
      id: number;
      name: string;
    };
    subcategories: string[];
    top_activities: string[];
    unique_features: string[];
    prices: string[];
    visit_hours: string[];
    keywords: string[];
    images: string[];
    coins: number;
    xp: number;
    created_at: string;
    updated_at: string;
  }
  

  //  visited types
  interface Category {
    id: number;
    name: string;
}

export interface visitedTypes {
    id: number;
    type: string;
    name: string;
    latitude: string;
    longitude: string;
    location: string;
    description: string;
    attraction_id: number;
    must_visit_spots: string[];
    category: Category;
    subcategories: string[];
    address: string;
    country: string;
    city: string;
    age: string;
    prices: string[];
    visit_hours: string[];
    top_activities: string[];
    short_description_about_fun_fact: string;
    short_description_about_secret_tips: string;
    unique_features: string[];
    best_visit_times: string[];
    activity_levels: string[];
    keywords: string[];
    xp: number;
    coins: number;
    images: string[];
    status: null | string;
    visited: number;
    visit_status: string;
    bucketlist_status: null | string;
    created_at: string;
    updated_at: string;
}

// avatar types
export type AvatarData = {
  id: number;
  name: string;
  cost: number;
  avatar_types: string;
  level: number;
  country: string | null;
  subscription_plan: string;
  avatar: string;
  status: "unlocked" | "locked";
  purchase_status: boolean;
  equip_status: boolean;
};
