enum KycStatus {
  New = "new",
  Verified = "verified",
  VerificationFailed = "verificationFailed",
}

export interface User {
  name: string;
  email: string;
  authMethod: string;
  isActive: boolean;
  kycStatus: KycStatus;
  rootPortfolioId: string;
  createdAt: Date;
  updatedAt: Date;
  autoInvest?: Object;
}

// Fields we'd like to exclude from the response
export const UserShape = {
  _id: 0,
  createdAt: 0,
  updatedAt: 0,
}