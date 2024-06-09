export interface Chores {
    amount: number,
    name: string
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
  
  interface Wallet {
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
      img: string,
      parent_id: number,
      role: string,
      username: string,
      wallet: Wallet
  }