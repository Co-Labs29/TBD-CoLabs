export interface Chores {
    amount: number,
    name: string,
    id: number,
    status: string
  }
  
  interface Goals {
    amount: number,
    description: string,
    id: number,
    img: string,
    link: string | null,
    name: string,
    paid: number
  }
  
  export interface Wallet {
    amount: number
  }

  export type Goal = {
    amount: number;
    paid: number
  };
  
 export interface ChildInfo {
      id: number,
      child_id: number,
      chores: Chores[],
      goals: Goals[],
      img: string | null,
      parent_id: number,
      role: string,
      username: string | null,
      wallet: Wallet
  }