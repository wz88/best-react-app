export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  privileges: Privilege[];
};

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  VIEWER = 'viewer',
}

export enum Privilege {
  CREATE_FORM = 'create_form',
  EDIT_FORM = 'edit_form',
  DELETE_FORM = 'delete_form',
  VIEW_DRAFTS = 'view_drafts',
  SUBMIT_FORM = 'submit_form',
}

export type UserState = {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};
