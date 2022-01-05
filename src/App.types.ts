export type Repo = {
    id: number;
    name: string;
    private: boolean;
    html_url: string;
    description: string;
  }
  
  export type UserItem = {
    login: string;
    score: string;
    avatar_url: string;
    html_url: string;
    repos_url: string;
  }
  
  export type User = {
    total_count: number,
    items: UserItem[],
    repos: Repo[]
  }
  
  export type UserState = {
    user: User | null;
    error: string;
    loading: boolean;
  }
  