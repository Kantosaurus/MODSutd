interface PlannedModule {
  id: string;
  code: string;
  name: string;
  credits: number;
  isCompulsory?: boolean;
}

interface TermPlan {
  modules: PlannedModule[];
}

export interface PlanConfig {
  name: string;
  pillar: string;
  specialisation: string;
  minors: string[];
}

export interface SavedPlan {
  id: string;
  name: string;
  pillar: string;
  specialisation: string;
  minors: string[];
  createdAt: string;
  updatedAt: string;
  termPlans: Record<string, TermPlan>;
  moduleCount: number;
  totalCredits: number;
}

const STORAGE_KEY = 'modsutd_plans';

export const planStorage = {
  // Get all saved plans
  getAllPlans(): SavedPlan[] {
    if (typeof window === 'undefined') return [];

    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading plans:', error);
      return [];
    }
  },

  // Get a specific plan by ID
  getPlan(id: string): SavedPlan | null {
    const plans = this.getAllPlans();
    return plans.find(p => p.id === id) || null;
  },

  // Save a new plan
  savePlan(
    config: PlanConfig,
    termPlans: Record<string, TermPlan>,
    name?: string,
    existingId?: string
  ): SavedPlan {
    const plans = this.getAllPlans();

    // Calculate stats
    const moduleCount = Object.values(termPlans).reduce(
      (sum, term) => sum + term.modules.length,
      0
    );
    const totalCredits = Object.values(termPlans).reduce(
      (sum, term) => sum + term.modules.reduce((s, m) => s + m.credits, 0),
      0
    );

    // Generate plan name if not provided
    const planName = name || config.name || `${config.pillar} Plan - ${new Date().toLocaleDateString()}`;

    if (existingId) {
      // Update existing plan
      const index = plans.findIndex(p => p.id === existingId);
      if (index !== -1) {
        plans[index] = {
          ...plans[index],
          name: planName,
          pillar: config.pillar,
          specialisation: config.specialisation,
          minors: config.minors,
          updatedAt: new Date().toISOString(),
          termPlans,
          moduleCount,
          totalCredits,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
        return plans[index];
      }
    }

    // Create new plan
    const newPlan: SavedPlan = {
      id: Date.now().toString(),
      name: planName,
      pillar: config.pillar,
      specialisation: config.specialisation,
      minors: config.minors,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      termPlans,
      moduleCount,
      totalCredits,
    };

    plans.push(newPlan);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
    return newPlan;
  },

  // Delete a plan
  deletePlan(id: string): boolean {
    try {
      const plans = this.getAllPlans();
      const filtered = plans.filter(p => p.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Error deleting plan:', error);
      return false;
    }
  },

  // Update plan name
  updatePlanName(id: string, name: string): boolean {
    try {
      const plans = this.getAllPlans();
      const index = plans.findIndex(p => p.id === id);
      if (index !== -1) {
        plans[index].name = name;
        plans[index].updatedAt = new Date().toISOString();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating plan name:', error);
      return false;
    }
  },
};
