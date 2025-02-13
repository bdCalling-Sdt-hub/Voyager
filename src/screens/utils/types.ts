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
  