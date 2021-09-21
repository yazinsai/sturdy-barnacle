enum PortfolioType {
  Standard = "standard",
  Model = "model",
  Tracking = "tracking",
}

export interface Portfolio {
  _id: string;
  title: string;
  userId: string;
  type: PortfolioType;
  createdAt: Date;
  updatedAt: Date;
}

// Fields we'd like to exclude from the response
export const PortfolioShape = {
  createdAt: 0,
  updatedAt: 0,
}