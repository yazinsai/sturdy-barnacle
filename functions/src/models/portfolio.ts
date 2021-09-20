enum PortfolioType {
  Standard = "standard",
  Model = "model",
  Tracking = "tracking",
}

export interface Portfolio {
  id: string;
  title: string;
  userId: string;
  type: PortfolioType;
  createdAt: Date;
  updatedAt: Date;
}

// Fields we'd like to exclude from the response
export const PortfolioShape = {
  _id: 0,
  createdAt: 0,
  updatedAt: 0,
}